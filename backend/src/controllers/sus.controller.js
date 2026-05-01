const prisma = require('../lib/prisma');

const susController = {
  /**
   * POST /api/sus/submit
   * Validates 10 SUS responses, calculates score, persists to DB.
   */
  async submitSUS(req, res, next) {
    try {
      const { sessionId, pharmacistId, responses, taskCompletionTime } = req.body;

      if (!responses || !Array.isArray(responses) || responses.length !== 10) {
        return res.status(400).json({
          error: 'Exactly 10 responses are required (standard SUS questionnaire).'
        });
      }

      const allValid = responses.every(r => Number.isInteger(r) && r >= 1 && r <= 5);
      if (!allValid) {
        return res.status(400).json({
          error: 'Each response must be an integer from 1 to 5.'
        });
      }

      // Calculate SUS score
      let total = 0;
      for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) {
          total += responses[i] - 1; // Odd questions: subtract 1
        } else {
          total += 5 - responses[i]; // Even questions: subtract from 5
        }
      }
      const susScore = total * 2.5;

      let interpretation;
      if (susScore >= 85) interpretation = 'Excellent';
      else if (susScore >= 75) interpretation = 'Good';
      else if (susScore >= 60) interpretation = 'OK';
      else interpretation = 'Poor';

      // Validate session & pharmacist references optionally
      const connectSession = sessionId
        ? { session: { connect: { id: sessionId } } }
        : {};
      const connectPharmacist = pharmacistId
        ? { pharmacist: { connect: { id: pharmacistId } } }
        : {};

      const result = await prisma.sUSResult.create({
        data: {
          ...connectSession,
          ...connectPharmacist,
          responses,
          susScore,
          interpretation,
          taskCompletionTime: taskCompletionTime || null
        }
      });

      res.json({
        success: true,
        susScore,
        interpretation,
        resultId: result.id
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/sus/results
   * Returns all SUS results with aggregate stats (auth required).
   */
  async getResults(req, res, next) {
    try {
      const [results, aggregate] = await Promise.all([
        prisma.sUSResult.findMany({
          orderBy: { submittedAt: 'desc' },
          include: {
            session: { select: { conditionId: true, conditionName: true } },
            pharmacist: { select: { name: true, email: true } }
          }
        }),
        prisma.sUSResult.aggregate({
          _avg: { susScore: true },
          _count: { id: true },
          _max: { susScore: true },
          _min: { susScore: true }
        })
      ]);

      res.json({
        results,
        total: aggregate._count.id,
        averageScore: aggregate._avg.susScore
          ? Math.round(aggregate._avg.susScore * 10) / 10
          : 0,
        maxScore: aggregate._max.susScore || 0,
        minScore: aggregate._min.susScore || 0
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = susController;
