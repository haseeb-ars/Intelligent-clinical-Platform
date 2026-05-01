require('dotenv').config();
const express = require('express');
const cors = require('cors');
const aiRoutes = require('./src/routes/ai.routes');
const bookingRoutes = require('./src/routes/booking.routes');
const conditionsRoutes = require('./src/routes/conditions.routes');
const authRoutes = require('./src/routes/auth.routes');
const susRoutes = require('./src/routes/sus.routes');
const pharmacistRoutes = require('./src/routes/pharmacist.routes');
const errorMiddleware = require('./src/middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://intelligent-clinical-platform.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/conditions', conditionsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sus', susRoutes);
app.use('/api/pharmacist', pharmacistRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'PharmaCare AI API', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`✅ PharmaCare AI API running on http://localhost:${PORT}`);
});

module.exports = app;
