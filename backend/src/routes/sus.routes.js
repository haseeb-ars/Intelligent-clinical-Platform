const express = require('express');
const router = express.Router();
const susController = require('../controllers/sus.controller');
const authMiddleware = require('../middleware/auth.middleware');

// POST /api/sus/submit — Submit SUS evaluation responses
router.post('/submit', susController.submitSUS);

// GET /api/sus/results — Get all SUS results (pharmacist auth required)
router.get('/results', authMiddleware, susController.getResults);

module.exports = router;
