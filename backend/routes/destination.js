import express from 'express';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';

const router = express.Router();

// Get top destinations
router.get('/top', async (req, res) => {
  try {
    const destinations = await Booking.aggregate([
      {
        $group: {
          _id: '$destination',
          booking_count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          destination: '$_id',
          booking_count: 1
        }
      },
      {
        $sort: { booking_count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      success: true,
      destinations
    });
  } catch (error) {
    console.error('Get top destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top destinations',
      error: error.message
    });
  }
});

// Get top rated destinations
router.get('/top-rated', async (req, res) => {
  try {
    const destinations = await Review.aggregate([
      {
        $group: {
          _id: '$destination',
          avg_rating: { $avg: '$rating' },
          review_count: { $sum: 1 }
        }
      },
      {
        $match: {
          review_count: { $gt: 0 }
        }
      },
      {
        $project: {
          _id: 0,
          destination: '$_id',
          avg_rating: 1,
          review_count: 1
        }
      },
      {
        $sort: { avg_rating: -1, review_count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      success: true,
      destinations
    });
  } catch (error) {
    console.error('Get top rated destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top rated destinations',
      error: error.message
    });
  }
});

export default router;
