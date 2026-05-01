const express = require('express');
const router = express.Router();

const conditions = [
    // NHS Pharmacy First
    { id: 'earache', name: 'Earache', description: 'Pain or discomfort in one or both ears', icon: '👂', category: 'NHS Pharmacy First' },
    { id: 'sore-throat', name: 'Sore Throat', description: 'Pain, scratchiness or irritation of the throat', icon: '🗣️', category: 'NHS Pharmacy First' },
    { id: 'sinusitis', name: 'Sinusitis', description: 'Inflammation or swelling of the sinus lining', icon: '🤧', category: 'NHS Pharmacy First' },
    { id: 'conjunctivitis', name: 'Infected Eye', description: 'Redness, irritation or discharge from the eye', icon: '👁️', category: 'NHS Pharmacy First' },
    { id: 'uti', name: 'UTI', description: 'Pain or burning sensation when urinating', icon: '💧', category: 'NHS Pharmacy First' },
    { id: 'shingles', name: 'Shingles', description: 'Painful rash caused by varicella-zoster virus', icon: '🔴', category: 'NHS Pharmacy First' },
    { id: 'impetigo', name: 'Impetigo', description: 'Highly contagious bacterial skin infection', icon: '🩹', category: 'NHS Pharmacy First' },
    // Pharmacy Services
    { id: 'hair-loss', name: 'Hair Loss', description: 'Thinning, shedding or bald patches', icon: '💇', category: 'Pharmacy Services' },
    { id: 'erectile-dysfunction', name: 'Erectile Dysfunction', description: 'Difficulty getting or maintaining an erection', icon: '🩺', category: 'Pharmacy Services' },
    { id: 'acne', name: 'Acne', description: 'Spots, blackheads and cysts on face, back or chest', icon: '✨', category: 'Pharmacy Services' },
    { id: 'acid-reflux', name: 'Acid Reflux', description: 'Heartburn and stomach acid issues', icon: '🔥', category: 'Pharmacy Services' },
    { id: 'hay-fever', name: 'Hay Fever', description: 'Seasonal allergies with sneezing and itchy eyes', icon: '🌸', category: 'Pharmacy Services' },
    { id: 'period-pain', name: 'Period Pain', description: 'Menstrual cramps and discomfort', icon: '🌙', category: 'Pharmacy Services' }
];

// GET /api/conditions — List all conditions
router.get('/', (req, res) => {
    res.json({ conditions });
});

module.exports = router;
