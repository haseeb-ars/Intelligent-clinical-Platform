/**
 * Builds the clinical summary prompt for the AI model.
 * Takes patient answers, condition info, and optional NLP data,
 * returns a formatted prompt string.
 */
function buildClinicalPrompt({ conditionId, conditionName, answers, nlpData }) {
    const formattedAnswers = answers
        .map((a, i) => `${i + 1}. ${a.question}\n   Answer: ${Array.isArray(a.answer) ? a.answer.join(', ') : a.answer}`)
        .join('\n\n');

    let nlpSection = '';
    if (nlpData) {
        const { extractedSymptoms, severityLevel, redFlags } = nlpData;
        nlpSection = `

--- NLP PRE-ANALYSIS ---

The following structured data was extracted automatically from the patient's responses:

**Extracted Symptom:** ${extractedSymptoms.symptom}
**Body Location:** ${extractedSymptoms.bodyLocation || 'Not specified'}
**Duration:** ${extractedSymptoms.duration ? extractedSymptoms.duration.raw : 'Not specified'}
**Reported Severity:** ${extractedSymptoms.severity || 'Not specified'}
**Pain Score:** ${extractedSymptoms.painScore !== null ? extractedSymptoms.painScore + '/10' : 'Not reported'}
**Quality Descriptors:** ${extractedSymptoms.qualityDescriptors.length > 0 ? extractedSymptoms.qualityDescriptors.join(', ') : 'None identified'}
**Automated Severity Classification:** ${severityLevel}
**Red Flags Detected:** ${redFlags.length > 0 ? redFlags.join('; ') : 'None'}

Please incorporate this structured data into your clinical summary. Pay special attention to any red flags detected.`;
    }

    return `A patient has completed the NHS Pharmacy First symptom intake questionnaire for the following condition:

**Condition:** ${conditionName}
**Condition ID:** ${conditionId}

**Patient Responses:**

${formattedAnswers}
${nlpSection}

---

Based on the patient's responses above, generate a structured clinical summary for the reviewing pharmacist. The summary must include the following sections:

1. **PRESENTING COMPLAINT** — A brief clinical description of why the patient is seeking pharmacy consultation.

2. **SYMPTOM PROFILE** — A bulleted list of all reported symptoms, including duration, severity, location, and any relevant characteristics.

3. **RISK INDICATORS** — Flag any responses that may indicate red flag symptoms, contraindications, or situations requiring urgent referral (e.g., to GP or A&E).

4. **SUGGESTED FOCUS AREAS** — Recommend specific areas the pharmacist should explore during the consultation, based on the patient's responses.

Important guidelines:
- Do NOT suggest specific diagnoses
- Do NOT recommend specific treatments or medications
- Use professional, clinical language appropriate for pharmacist review
- Be concise but thorough
- Format using markdown headers and bullet points`;
}

module.exports = { buildClinicalPrompt };
