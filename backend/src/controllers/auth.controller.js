const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');

const JWT_SECRET = process.env.JWT_SECRET || 'pharmacare-dev-secret-key';

const authController = {
  /**
   * POST /api/auth/login
   * Authenticates a pharmacist and returns a JWT token.
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const pharmacist = await prisma.pharmacist.findUnique({ where: { email } });
      if (!pharmacist) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, pharmacist.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: pharmacist.id, email: pharmacist.email, role: pharmacist.role },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({
        token,
        pharmacist: {
          id: pharmacist.id,
          name: pharmacist.name,
          email: pharmacist.email,
          role: pharmacist.role
        }
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/auth/queue
   * Returns the session queue for authenticated pharmacists.
   */
  async getQueue(req, res, next) {
    try {
      const sessions = await prisma.patientSession.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
      });

      const pending = sessions.filter(s => s.status === 'pending').length;
      const reviewed = sessions.filter(s => s.status === 'reviewed').length;
      const todayStr = new Date().toISOString().split('T')[0];
      const todayBookings = await prisma.booking.count({
        where: { date: todayStr }
      });

      res.json({
        queue: sessions,
        stats: { pending, reviewed, todayBookings, completed: reviewed }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;
