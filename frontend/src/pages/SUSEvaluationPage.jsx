import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitSUSEvaluation } from '../api/client';

const SUS_QUESTIONS = [
    'I think that I would like to use this system frequently.',
    'I found the system unnecessarily complex.',
    'I thought the system was easy to use.',
    'I think that I would need the support of a technical person to be able to use this system.',
    'I found the various functions in this system were well integrated.',
    'I thought there was too much inconsistency in this system.',
    'I would imagine that most people would learn to use this system very quickly.',
    'I found the system very cumbersome to use.',
    'I felt very confident using the system.',
    'I needed to learn a lot of things before I could get going with this system.',
];

const LIKERT_LABELS = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree',
];

function getScoreInterpretation(score) {
    if (score >= 85) return { label: 'Excellent', color: '#0d9488', bg: '#ccfbf1' };
    if (score >= 75) return { label: 'Good', color: '#006633', bg: '#e7f5e7' };
    if (score >= 60) return { label: 'OK', color: '#b25900', bg: '#fff4e5' };
    return { label: 'Poor', color: '#b30000', bg: '#fce4e4' };
}

export default function SUSEvaluationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { sessionId, pharmacistId } = location.state || {};

    const [responses, setResponses] = useState(new Array(10).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [startTime] = useState(Date.now());

    const handleSelect = (questionIndex, value) => {
        const updated = [...responses];
        updated[questionIndex] = value;
        setResponses(updated);
    };

    const allAnswered = responses.every(r => r !== null);

    const handleSubmit = async () => {
        if (!allAnswered) return;

        setLoading(true);
        setError('');

        try {
            const taskCompletionTime = Math.round((Date.now() - startTime) / 1000);
            const data = await submitSUSEvaluation({
                sessionId,
                pharmacistId,
                responses,
                taskCompletionTime,
            });
            setResult(data);
            setSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to submit evaluation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted && result) {
        const interp = getScoreInterpretation(result.susScore);
        return (
            <div className="sus-page">
                <div className="sus-result-card">
                    <div className="sus-result-icon">
                        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                            <circle cx="28" cy="28" r="26" fill={interp.bg} stroke={interp.color} strokeWidth="2" />
                            <path d="M18 28l7 7 13-14" stroke={interp.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2>Thank You for Your Feedback!</h2>
                    <p className="sus-result-subtitle">Your evaluation helps us improve the system.</p>

                    <div className="sus-score-display" style={{ background: interp.bg, borderColor: interp.color }}>
                        <div className="sus-score-number" style={{ color: interp.color }}>
                            {result.susScore}
                        </div>
                        <div className="sus-score-label">SUS Score</div>
                        <div className="sus-score-interpretation" style={{ color: interp.color }}>
                            {interp.label}
                        </div>
                    </div>

                    <div className="sus-score-scale">
                        <div className="sus-scale-bar">
                            <div className="sus-scale-segment" style={{ background: '#fce4e4', flex: 60 }}>
                                <span>&lt;60 Poor</span>
                            </div>
                            <div className="sus-scale-segment" style={{ background: '#fff4e5', flex: 15 }}>
                                <span>60-74 OK</span>
                            </div>
                            <div className="sus-scale-segment" style={{ background: '#e7f5e7', flex: 10 }}>
                                <span>75-84 Good</span>
                            </div>
                            <div className="sus-scale-segment" style={{ background: '#ccfbf1', flex: 15 }}>
                                <span>85+ Excellent</span>
                            </div>
                        </div>
                        <div className="sus-scale-marker" style={{
                            left: `${Math.min(Math.max(result.susScore, 0), 100)}%`
                        }}>
                            <div className="sus-marker-dot" style={{ background: interp.color }}></div>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/pharmacist')}
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="sus-page">
            <div className="sus-header">
                <button className="btn-back" onClick={() => navigate('/pharmacist')}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Dashboard
                </button>
                <h1 className="page-title">Usability Evaluation</h1>
                <p className="page-subtitle">10 Quick Questions — System Usability Scale (SUS)</p>
            </div>

            <div className="sus-instructions">
                <p>Please rate each statement based on your experience using the PharmaCare AI system. Select the option that best describes your level of agreement.</p>
            </div>

            {error && <div className="sus-error">{error}</div>}

            <div className="sus-questions">
                {SUS_QUESTIONS.map((question, qIdx) => (
                    <div key={qIdx} className={`sus-question-card ${responses[qIdx] !== null ? 'sus-question-answered' : ''}`}>
                        <div className="sus-question-number">Q{qIdx + 1}</div>
                        <div className="sus-question-text">{question}</div>
                        <div className="sus-likert-scale">
                            {LIKERT_LABELS.map((label, lIdx) => {
                                const value = lIdx + 1;
                                const isSelected = responses[qIdx] === value;
                                return (
                                    <button
                                        key={lIdx}
                                        className={`sus-likert-btn ${isSelected ? 'sus-likert-selected' : ''}`}
                                        onClick={() => handleSelect(qIdx, value)}
                                        type="button"
                                    >
                                        <span className="sus-likert-value">{value}</span>
                                        <span className="sus-likert-label">{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="sus-submit-section">
                <div className="sus-progress">
                    {responses.filter(r => r !== null).length} of 10 questions answered
                </div>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={handleSubmit}
                    disabled={!allAnswered || loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner spinner-sm"></span>
                            Submitting...
                        </>
                    ) : (
                        'Complete Evaluation'
                    )}
                </button>
            </div>
        </div>
    );
}
