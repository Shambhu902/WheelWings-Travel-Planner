import express from 'express';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import { sendEmail } from '../utils/mailer.js';
import { emailTemplates } from '../utils/emailTemplates.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

// Create Razorpay Order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ status: 'error', message: 'Amount is required' });
    }
    
    // Amount should be in paise (multiply by 100)
    const cleanAmount = Number(amount.toString().replace(/[^0-9.-]+/g,""));
    
    if (isNaN(cleanAmount) || cleanAmount < 1) {
       return res.status(400).json({ status: 'error', message: `Invalid payment amount: ${amount}` });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    const options = {
      amount: Math.round(cleanAmount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    
    const order = await razorpay.orders.create(options);
    res.json({ status: 'success', order });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    
    // Razorpay nests its actual human-readable messages inside error.error.description
    const statusCode = error.statusCode || 500;
    const errorMessage = error.error?.description || error.message || 'Failed to create order';
    
    res.status(statusCode).json({ 
      status: 'error', 
      message: errorMessage, 
      details: error 
    });
  }
});

// Save booking
router.post('/save', async (req, res) => {
  try {
    const { destination, accommodation, totalCost, date, status, email, bookingId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Validate required fields
    if (!destination || !accommodation || !totalCost || !date || !status || !email || !bookingId) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required'
      });
    }

    // Get user's name from email
    const user = await User.findOne({ email: email.toLowerCase() }, { name: 1 });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    const bookedBy = user.name;

    // Verify Razorpay signature
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ status: 'error', message: 'Payment verification details are required' });
    }
    
    const bodyText = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(bodyText.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ status: 'error', message: 'Invalid payment signature' });
    }

    // Check if booking already exists
    const existingBooking = await Booking.findOne({ booking_id: bookingId });

    if (existingBooking) {
      // Update existing booking
      await Booking.updateOne(
        { booking_id: bookingId },
        {
          $set: {
            destination,
            accommodation,
            total_cost: totalCost,
            booking_date: date,
            status: status.toLowerCase(), // Convert to lowercase
            booked_by: bookedBy,
            email: email.toLowerCase()
          }
        }
      );

      return res.json({
        status: 'success',
        message: 'Booking updated successfully',
        bookingId
      });
    } else {
      // Insert new booking
      const newBooking = new Booking({
        booking_id: bookingId,
        destination,
        accommodation,
        total_cost: totalCost,
        booking_date: date,
        status: status.toLowerCase(), // Convert to lowercase
        booked_by: bookedBy,
        email: email.toLowerCase(),
        admin_status: 'pending'
      });

      await newBooking.save();

      // Send confirmation email with beautiful template
      try {
        const bookingData = {
          booking_id: bookingId,
          destination,
          accommodation,
          total_cost: totalCost,
          booking_date: date,
          booked_by: bookedBy,
          status: status.toLowerCase(),
          admin_status: 'pending'
        };
        
        const htmlContent = emailTemplates.bookingConfirmation(bookingData);
        await sendEmail(
          email,
          '✈️ Booking Confirmation - Travel Planner',
          `Dear ${bookedBy},\n\nYour booking has been confirmed!\n\nBooking ID: ${bookingId}\nDestination: ${destination}\nAccommodation: ${accommodation}\nTotal Cost: ₹${totalCost}\nDate: ${date}\n\nThank you for choosing our service!`,
          htmlContent
        );
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      res.status(201).json({
        status: 'success',
        message: 'Booking saved successfully',
        bookingId
      });
    }
  } catch (error) {
    console.error('Save booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to save booking',
      error: error.message
    });
  }
});

// Get user bookings
router.get('/user-bookings', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required'
      });
    }

    const bookings = await Booking.find({ email: email.toLowerCase() })
      .sort({ createdAt: -1 })
      .lean();

    // Convert MongoDB _id to id for compatibility
    const formattedBookings = bookings.map(booking => ({
      ...booking,
      id: booking._id,
      created_at: booking.createdAt
    }));

    res.json(formattedBookings);
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// Get user bookings for review (bookings without reviews)
router.get('/user-bookings-for-review', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const Review = (await import('../models/Review.js')).default;
    
    // Get all bookings for this user
    const bookings = await Booking.find({ email: email.toLowerCase() })
      .sort({ createdAt: -1 })
      .lean();

    // Get all reviewed booking IDs
    const reviews = await Review.find(
      { user_email: email.toLowerCase() },
      { booking_id: 1 }
    ).lean();

    const reviewedBookingIds = reviews.map(r => r.booking_id);

    // Filter bookings that haven't been reviewed
    const bookingsForReview = bookings.filter(
      booking => !reviewedBookingIds.includes(booking.booking_id)
    ).map(booking => ({
      ...booking,
      id: booking._id,
      created_at: booking.createdAt
    }));

    res.json({
      success: true,
      bookings: bookingsForReview
    });
  } catch (error) {
    console.error('Get bookings for review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// Get recent activities
router.get('/recent-activities', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const formattedBookings = bookings.map(booking => ({
      ...booking,
      id: booking._id,
      created_at: booking.createdAt
    }));

    res.json({
      success: true,
      activities: formattedBookings
    });
  } catch (error) {
    console.error('Get recent activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activities',
      error: error.message
    });
  }
});

export default router;
