const express = require('express');
const router = express.Router();
const pharmacistController = require('../controllers/pharmacist.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All pharmacist routes are auth-protected
router.use(authMiddleware);

// GET /api/pharmacist/queue — Get patient queue
router.get('/queue', pharmacistController.getQueue);

// PATCH /api/pharmacist/sessions/:id/review — Mark a session as reviewed
router.patch('/sessions/:id/review', pharmacistController.reviewSession);

// GET /api/pharmacist/stats — Get dashboard stats
router.get('/stats', pharmacistController.getStats);

// GET /api/pharmacist/sessions/:id — Get full session detail
router.get('/sessions/:id', pharmacistController.getSession);

module.exports = router;
