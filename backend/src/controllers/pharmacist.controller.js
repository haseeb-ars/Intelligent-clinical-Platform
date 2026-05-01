const prisma = require('../lib/prisma');

const pharmacistController = {
  /**
   * GET /api/pharmacist/queue
   * Returns patient sessions sorted by newest first, with booking info.
   */
  async getQueue(req, res, next) {
    try {
      const queue = await prisma.patientSession.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: {
          booking: true
        }
      });

      res.json({ queue });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /api/pharmacist/sessions/:id/review
   * Marks a session as reviewed.
   */
  async reviewSession(req, res, next) {
    try {
      const { id } = req.params;

      const existing = await prisma.patientSession.findUnique({ where: { id } });
      if (!existing) {
        return res.status(404).json({ error: 'Session not found.' });
      }

      const session = await prisma.patientSession.update({
        where: { id },
        data: {
          status: 'reviewed',
          reviewedAt: new Date(),
          reviewedBy: req.user?.id || 'unknown'
        }
      });

      res.json({ success: true, session });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/pharmacist/stats
   * Returns real-time dashboard stats.
   */
  async getStats(req, res, next) {
    try {
      const todayStr = new Date().toISOString().split('T')[0];

      const [totalSessions, pending, reviewed, todayCount, susAgg] = await Promise.all([
        prisma.patientSession.count(),
        prisma.patientSession.count({ where: { status: 'pending' } }),
        prisma.patientSession.count({ where: { status: 'reviewed' } }),
        prisma.patientSession.count({
          where: {
            createdAt: {
              gte: new Date(`${todayStr}T00:00:00.000Z`)
            }
          }
        }),
        prisma.sUSResult.aggregate({
          _avg: { susScore: true },
          _count: { id: true }
        })
      ]);

      const averageSUSScore = susAgg._avg.susScore
        ? Math.round(susAgg._avg.susScore * 10) / 10
        : null;

      res.json({
        totalSessions,
        pending,
        reviewed,
        totalToday: todayCount,
        averageSUSScore,
        totalSUSResponses: susAgg._count.id
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/pharmacist/sessions/:id
   * Returns a single session by ID with full detail.
   */
  async getSession(req, res, next) {
    try {
      const { id } = req.params;

      const session = await prisma.patientSession.findUnique({
        where: { id },
        include: {
          booking: true,
          susResults: true
        }
      });

      if (!session) {
        return res.status(404).json({ error: 'Session not found.' });
      }

      res.json({ session });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = pharmacistController;
