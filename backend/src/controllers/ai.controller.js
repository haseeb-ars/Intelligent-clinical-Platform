const prisma = require('../lib/prisma');
const aiService = require('../services/ai.service');
const { extractSymptoms, classifySeverity } = require('../services/nlp.service');

const aiController = {
  async generateSummary(req, res, next) {
    try {
      const { conditionId, conditionName, answers } = req.body;

      if (!conditionId || !answers || !Array.isArray(answers)) {
        return res.status(400).json({
          error: 'Invalid request. Requires conditionId and answers array.'
        });
      }

      // Step 1: Run NLP extraction
      const extractedSymptoms = extractSymptoms(answers, conditionId);
      const severityLevel = classifySeverity(extractedSymptoms);
      const redFlags = extractedSymptoms.redFlags || [];

      // Step 2: Generate AI summary
      const summary = await aiService.generateClinicalSummary({
        conditionId,
        conditionName: conditionName || conditionId,
        answers,
        nlpData: { extractedSymptoms, severityLevel, redFlags }
      });

      // Step 3: Persist session to NeonDB via Prisma
      const session = await prisma.patientSession.create({
        data: {
          conditionId,
          conditionName: conditionName || conditionId,
          answers,
          summary,
          severityLevel,
          extractedSymptoms,
          redFlags,
          status: 'pending'
        }
      });

      res.json({
        summary,
        severityLevel,
        extractedSymptoms,
        redFlags,
        sessionId: session.id
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = aiController;
