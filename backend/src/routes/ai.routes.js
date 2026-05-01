const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// POST /api/ai/summary — Generate clinical summary from patient answers
router.post('/summary', aiController.generateSummary);

module.exports = router;
