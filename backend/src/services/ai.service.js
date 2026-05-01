const { GoogleGenerativeAI } = require('@google/generative-ai');
const { buildClinicalPrompt } = require('../utils/promptBuilder');

let model = null;

function getModel() {
    if (!model) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            return null;
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: 'You are an NHS community pharmacy clinical decision support assistant. A patient has completed a Pharmacy First symptom intake questionnaire. Generate a structured clinical summary for the reviewing pharmacist. Be professional, concise, and clinically accurate. Do not suggest specific diagnoses or recommend specific treatments — your role is to summarise the patient\'s reported symptoms and flag areas for pharmacist attention.'
        });
    }
    return model;
}

const aiService = {
    async generateClinicalSummary({ conditionId, conditionName, answers, nlpData }) {
        const gemini = getModel();

        // If no API key configured, return a realistic mock summary
        if (!gemini) {
            console.warn('⚠️  No GEMINI_API_KEY configured — returning mock summary');
            return generateMockSummary(conditionName, answers);
        }

        const prompt = buildClinicalPrompt({ conditionId, conditionName, answers, nlpData });

        try {
            const result = await gemini.generateContent(prompt);
            const response = result.response;
            return response.text();
        } catch (error) {
            console.error('Gemini API error:', error.message);
            throw new Error('Failed to generate clinical summary. Please try again.');
        }
    }
};

function generateMockSummary(conditionName, answers) {
    const answersText = answers
        .map(a => `- **${a.question}**: ${Array.isArray(a.answer) ? a.answer.join(', ') : a.answer}`)
        .join('\n');

    return `## PRESENTING COMPLAINT

Patient has completed the NHS Pharmacy First intake for **${conditionName}**. Below is a structured summary of reported symptoms for pharmacist review.

## SYMPTOM PROFILE

${answersText}

## RISK INDICATORS

- Review responses for any red flag symptoms requiring urgent referral
- Assess symptom duration and severity against NICE guidelines
- Consider patient demographics and comorbidity history

## SUGGESTED FOCUS AREAS

- Complete clinical assessment based on reported symptoms above
- Verify symptom timeline and progression
- Assess eligibility for Pharmacy First treatment pathway
- Consider if GP referral or escalation is indicated

---
*This summary was generated for pharmacist review. Clinical judgement should be applied to all treatment decisions. This is a mock summary — configure GEMINI_API_KEY for AI-generated summaries.*`;
}

module.exports = aiService;
