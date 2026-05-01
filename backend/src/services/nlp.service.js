/**
 * NLP Service — Extracts structured symptom data from patient answers
 * using regex and keyword matching, and classifies severity.
 */

// Red flag keywords and patterns
const RED_FLAG_PATTERNS = {
    fever: /(?:fever|temperature)\s*(?:of\s*)?(?:>|above|over|greater than)?\s*(\d+(?:\.\d+)?)\s*°?\s*[cC]?/i,
    feverKeyword: /\b(?:high\s+(?:temperature|fever)|fever)\b/i,
    bloodDischarge: /\b(?:blood|bloody|bleeding|blood[- ]stained|haemoptysis|haematuria)\b/i,
    visionChanges: /\b(?:vision\s+change|blurr(?:y|ed)\s*vision|loss\s+of\s+(?:sight|vision)|double\s+vision|visual\s+disturbance)\b/i,
    swallowingDifficulty: /\b(?:cannot\s+swallow|unable\s+to\s+swallow|difficulty\s+swallowing|can'?t\s+swallow|impossible\s+to\s+swallow)\b/i,
    severePain: /\b(?:severe|excruciating|unbearable|agonising|agonizing)\s*pain\b/i,
};

// Duration extraction pattern
const DURATION_PATTERN = /(\d+)\s*(day|days|week|weeks|month|months|hour|hours|year|years)/i;

// Pain score extraction
const PAIN_SCORE_PATTERN = /\b(?:pain\s*(?:score|level|rating)?[\s:]*)?(\d{1,2})\s*(?:\/\s*10|out\s+of\s+10)\b/i;
const NUMERIC_SEVERITY_PATTERN = /\b([89]|10)\b/;

// Body location keywords
const BODY_LOCATIONS = [
    'throat', 'ear', 'eye', 'eyes', 'head', 'chest', 'abdomen', 'stomach',
    'back', 'neck', 'leg', 'arm', 'foot', 'hand', 'nose', 'mouth', 'skin',
    'groin', 'pelvis', 'bladder', 'kidney', 'joint', 'knee', 'shoulder',
    'wrist', 'ankle', 'hip', 'elbow', 'forehead', 'temple', 'jaw',
    'left ear', 'right ear', 'both ears', 'left eye', 'right eye',
    'lower back', 'upper back', 'lower abdomen', 'upper abdomen',
    'scalp', 'face', 'genital'
];

// Severity keywords
const SEVERITY_KEYWORDS = {
    mild: /\b(?:mild|slight|minor|minimal|a\s+little|small)\b/i,
    moderate: /\b(?:moderate|noticeable|significant|considerable|quite)\b/i,
    severe: /\b(?:severe|intense|extreme|excruciating|unbearable|very\s+(?:bad|painful|strong)|terrible|awful|worst)\b/i,
};

// Quality descriptors
const QUALITY_DESCRIPTORS = [
    'sharp', 'dull', 'throbbing', 'burning', 'stabbing', 'aching',
    'cramping', 'constant', 'intermittent', 'radiating', 'pulsating',
    'tingling', 'numbness', 'swelling', 'swollen', 'inflamed',
    'red', 'itchy', 'itching', 'discharge', 'pus', 'weeping',
    'dry', 'crusty', 'flaky', 'scaly', 'warm', 'hot', 'tender',
    'stiff', 'clicking', 'popping', 'grinding', 'blocked', 'congested',
    'runny', 'sore', 'raw', 'painful', 'uncomfortable', 'pressure',
    'tight', 'tightness', 'difficulty breathing', 'wheezing',
    'nausea', 'vomiting', 'diarrhoea', 'diarrhea', 'frequent urination'
];

/**
 * Extract structured symptom data from raw patient answers.
 * @param {Array} answers - Array of { question, answer } objects
 * @param {string} conditionId - The condition identifier
 * @returns {Object} Extracted symptom entity
 */
function extractSymptoms(answers, conditionId) {
    const allText = answers.map(a => {
        const ansText = Array.isArray(a.answer) ? a.answer.join(', ') : String(a.answer);
        return `${a.question} ${ansText}`;
    }).join(' ');

    const allTextLower = allText.toLowerCase();

    // Extract main symptom from condition
    const symptom = conditionId
        ? conditionId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'Unknown';

    // Extract body location
    const bodyLocation = extractBodyLocation(allTextLower);

    // Extract duration
    const duration = extractDuration(allText);

    // Extract severity
    const severity = extractSeverityFromText(allText);

    // Extract quality descriptors
    const qualityDescriptors = extractQualityDescriptors(allTextLower);

    // Extract red flags
    const redFlags = extractRedFlags(allText, answers);

    // Extract pain score
    const painScore = extractPainScore(allText);

    return {
        symptom,
        bodyLocation,
        duration,
        severity,
        painScore,
        qualityDescriptors,
        redFlags,
        conditionId,
        rawAnswerCount: answers.length
    };
}

function extractBodyLocation(text) {
    const found = [];
    for (const loc of BODY_LOCATIONS) {
        if (text.includes(loc)) {
            // Prefer multi-word matches; avoid sub-matching (e.g., "ear" in "earache")
            if (!found.some(f => f.includes(loc) || loc.includes(f))) {
                found.push(loc);
            }
        }
    }
    return found.length > 0 ? found.join(', ') : null;
}

function extractDuration(text) {
    const match = text.match(DURATION_PATTERN);
    if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        // Normalise to days for comparison
        let days = value;
        if (unit.startsWith('week')) days = value * 7;
        else if (unit.startsWith('month')) days = value * 30;
        else if (unit.startsWith('year')) days = value * 365;
        else if (unit.startsWith('hour')) days = value / 24;
        return { value, unit: match[2].toLowerCase(), totalDays: days, raw: match[0] };
    }
    return null;
}

function extractSeverityFromText(text) {
    if (SEVERITY_KEYWORDS.severe.test(text)) return 'severe';
    if (SEVERITY_KEYWORDS.moderate.test(text)) return 'moderate';
    if (SEVERITY_KEYWORDS.mild.test(text)) return 'mild';
    return 'unknown';
}

function extractQualityDescriptors(text) {
    return QUALITY_DESCRIPTORS.filter(desc => text.includes(desc));
}

function extractPainScore(text) {
    const match = text.match(PAIN_SCORE_PATTERN);
    if (match) return parseInt(match[1], 10);

    // Check answers for standalone numbers that look like pain scores (in context of severity questions)
    const severityContext = /(?:severity|pain|scale|score|bad|intense)/i;
    if (severityContext.test(text)) {
        const numMatch = text.match(/\b([0-9]|10)\b/g);
        if (numMatch) {
            const scores = numMatch.map(Number).filter(n => n >= 1 && n <= 10);
            if (scores.length > 0) return Math.max(...scores);
        }
    }
    return null;
}

function extractRedFlags(text, answers) {
    const flags = [];

    // Fever >38°C — check full text since temperature values are unambiguous
    const feverMatch = text.match(RED_FLAG_PATTERNS.fever);
    if (feverMatch) {
        const temp = parseFloat(feverMatch[1]);
        if (temp > 38) flags.push(`High fever (${temp}°C)`);
    }
    if (flags.length === 0 && RED_FLAG_PATTERNS.feverKeyword.test(text)) {
        flags.push('Fever reported');
    }

    // For context-sensitive red flags, check individual answers to avoid
    // false positives from question text (e.g., "Is there blood?" → "No")
    const NEGATIVE_ANSWER = /^(?:no|none|n\/a|nil|negative|0|nope|not really|neither)\b/i;

    if (answers && Array.isArray(answers)) {
        for (const a of answers) {
            const ansText = Array.isArray(a.answer) ? a.answer.join(', ') : String(a.answer);
            // Skip negative answers
            if (NEGATIVE_ANSWER.test(ansText.trim())) continue;

            if (RED_FLAG_PATTERNS.bloodDischarge.test(ansText)) {
                if (!flags.includes('Blood/bleeding reported')) {
                    flags.push('Blood/bleeding reported');
                }
            }
            if (RED_FLAG_PATTERNS.swallowingDifficulty.test(ansText)) {
                if (!flags.includes('Inability to swallow')) {
                    flags.push('Inability to swallow');
                }
            }
            if (RED_FLAG_PATTERNS.visionChanges.test(ansText)) {
                if (!flags.includes('Vision changes reported')) {
                    flags.push('Vision changes reported');
                }
            }
        }
    } else {
        // Fallback: check full text if no individual answers available
        if (RED_FLAG_PATTERNS.bloodDischarge.test(text)) {
            flags.push('Blood/bleeding reported');
        }
        if (RED_FLAG_PATTERNS.visionChanges.test(text)) {
            flags.push('Vision changes reported');
        }
        if (RED_FLAG_PATTERNS.swallowingDifficulty.test(text)) {
            flags.push('Inability to swallow');
        }
    }

    // Severe pain (score 8-10)
    const painScore = extractPainScore(text);
    if (painScore !== null && painScore >= 8) {
        flags.push(`Severe pain score (${painScore}/10)`);
    } else if (RED_FLAG_PATTERNS.severePain.test(text)) {
        flags.push('Severe pain reported');
    }

    return flags;
}

/**
 * Classify overall severity based on extracted symptom data.
 * @param {Object} extractedSymptoms - Output from extractSymptoms()
 * @returns {string} "MILD" | "MODERATE" | "SEVERE"
 */
function classifySeverity(extractedSymptoms) {
    // SEVERE if any red flag present
    if (extractedSymptoms.redFlags && extractedSymptoms.redFlags.length > 0) {
        return 'SEVERE';
    }

    // SEVERE if pain score 8-10
    if (extractedSymptoms.painScore !== null && extractedSymptoms.painScore >= 8) {
        return 'SEVERE';
    }

    // MODERATE if duration > 7 days
    if (extractedSymptoms.duration && extractedSymptoms.duration.totalDays > 7) {
        return 'MODERATE';
    }

    // MODERATE if pain score 4-7
    if (extractedSymptoms.painScore !== null && extractedSymptoms.painScore >= 4) {
        return 'MODERATE';
    }

    // MODERATE if severity text indicates moderate or severe
    if (extractedSymptoms.severity === 'moderate') {
        return 'MODERATE';
    }
    if (extractedSymptoms.severity === 'severe') {
        return 'SEVERE';
    }

    return 'MILD';
}

module.exports = { extractSymptoms, classifySeverity };
