import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User.js';
import PasswordReset from '../models/PasswordReset.js';
import { sendEmail } from '../utils/mailer.js';
import { emailTemplates } from '../utils/emailTemplates.js';

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, location, bio, gender, dob } = req.body;

    // Validate input
    if (!name || !email || !password || !phone || !location || !bio || !gender || !dob) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      hashed_password: hashedPassword,
      phone,
      location,
      bio,
      gender: gender.toLowerCase(), // Convert to lowercase to match enum
      dob
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Verify password
    let passwordVerified = false;
    
    // Try with hashed password first
    if (user.hashed_password) {
      passwordVerified = await bcrypt.compare(password, user.hashed_password);
    }
    
    // Fallback to plain text comparison (for compatibility)
    if (!passwordVerified && password === user.password) {
      passwordVerified = true;
    }

    if (!passwordVerified) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = crypto.createHash('md5').update(Date.now().toString()).digest('hex');

    res.json({
      status: 'success',
      message: 'Login successful',
      token,
      email: user.email,
      is_admin: user.is_admin || false,
      profile_photo: user.profile_photo || null
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Login failed',
      error: error.message
    });
  }
});

// Forgot Password - Send OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // Delete any existing OTPs for this user
    await PasswordReset.deleteMany({ user_email: email.toLowerCase() });

    // Store OTP in database
    const passwordReset = new PasswordReset({
      user_id: user._id,
      user_email: email.toLowerCase(),
      otp,
      expiry
    });

    await passwordReset.save();

    // Send OTP via email with beautiful template
    const htmlContent = emailTemplates.passwordResetOTP(otp, user.name);
    await sendEmail(
      email,
      '🔐 Password Reset OTP - Travel Planner',
      `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in 15 minutes.`,
      htmlContent
    );

    res.json({
      success: true,
      message: 'OTP sent to your email'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message
    });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Verify OTP
    const passwordReset = await PasswordReset.findOne({
      user_email: email.toLowerCase(),
      otp,
      expiry: { $gt: new Date() }
    });

    if (!passwordReset) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Get user's password to show
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'OTP verified successfully',
      password: user.password // Return the actual password
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verification failed',
      error: error.message
    });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and new password are required'
      });
    }

    // Verify OTP again
    const passwordReset = await PasswordReset.findOne({
      user_email: email.toLowerCase(),
      otp,
      expiry: { $gt: new Date() }
    });

    if (!passwordReset) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await User.updateOne(
      { email: email.toLowerCase() },
      { 
        password: newPassword,
        hashed_password: hashedPassword 
      }
    );

    // Delete used OTP
    await PasswordReset.deleteMany({ user_email: email.toLowerCase() });

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Password reset failed',
      error: error.message
    });
  }
});

export default router;
