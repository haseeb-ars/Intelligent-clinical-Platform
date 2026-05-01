const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET /api/bookings/slots — Get available pharmacist slots
router.get('/slots', bookingController.getSlots);

// POST /api/bookings — Create a booking
router.post('/', bookingController.createBooking);

// GET /api/bookings — List all bookings (pharmacist auth required)
router.get('/', authMiddleware, bookingController.getBookings);

module.exports = router;
