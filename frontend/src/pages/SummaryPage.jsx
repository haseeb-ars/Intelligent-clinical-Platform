import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SummaryDisplay from '../components/SummaryDisplay';
import { useSummaryGeneration } from '../hooks/useSummaryGeneration';

const severityColors = {
    MILD: { bg: '#e7f5e7', color: '#006633', label: 'Mild' },
    MODERATE: { bg: '#fff4e5', color: '#b25900', label: 'Moderate' },
    SEVERE: { bg: '#fce4e4', color: '#b30000', label: 'Severe' },
};

export default function SummaryPage() {
    const { conditionId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { summary, sessionId, severityLevel, extractedSymptoms, redFlags, loading, error, generate } = useSummaryGeneration();

    const { conditionName, answers } = location.state || {};

    useEffect(() => {
        if (conditionId && answers && !summary && !loading) {
            generate(conditionId, conditionName, answers);
        }
    }, [conditionId]);

    if (!answers) {
        return (
            <div className="page-container">
                <div className="error-state">
                    <h2>No assessment data</h2>
                    <p>Please complete the questionnaire first.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Start Assessment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="summary-page">
            <div className="summary-page-header">
                <button className="btn-back" onClick={() => navigate('/')}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    New Assessment
                </button>
                <h1 className="page-title">Clinical Summary</h1>
                <p className="page-subtitle">AI-generated summary for pharmacist review — {conditionName}</p>
            </div>

            {loading && (
                <div className="loading-state">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                    <h3>Generating clinical summary...</h3>
                    <p>Our AI is analysing your responses to create a comprehensive summary for your pharmacist.</p>
                    <div className="loading-steps">
                        <div className="loading-step loading-step-active">
                            <div className="loading-step-dot"></div>
                            <span>Processing symptom data</span>
                        </div>
                        <div className="loading-step">
                            <div className="loading-step-dot"></div>
                            <span>Running NLP extraction</span>
                        </div>
                        <div className="loading-step">
                            <div className="loading-step-dot"></div>
                            <span>Generating summary report</span>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="error-state">
                    <h3>Unable to generate summary</h3>
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={() => generate(conditionId, conditionName, answers)}>
                        Try Again
                    </button>
                </div>
            )}

            {summary && (
                <>
                    {/* Severity & NLP Badge Section */}
                    {severityLevel && (
                        <div className="nlp-results-bar">
                            <div className="severity-badge-lg" style={{
                                background: severityColors[severityLevel]?.bg || '#f0f0f0',
                                color: severityColors[severityLevel]?.color || '#333',
                            }}>
                                <span className="severity-badge-dot" style={{
                                    background: severityColors[severityLevel]?.color || '#333'
                                }}></span>
                                {severityColors[severityLevel]?.label || severityLevel} Severity
                            </div>

                            {redFlags.length > 0 && (
                                <div className="red-flags-alert">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M9 1.5L1 16h16L9 1.5z" fill="#b30000" opacity="0.12" />
                                        <path d="M9 1.5L1 16h16L9 1.5z" stroke="#b30000" strokeWidth="1.5" strokeLinejoin="round" />
                                        <path d="M9 7v3.5M9 13h.007" stroke="#b30000" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <div>
                                        <strong>Red Flags Detected:</strong>
                                        <ul className="red-flags-list">
                                            {redFlags.map((flag, i) => (
                                                <li key={i}>{flag}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {extractedSymptoms && (
                                <div className="nlp-extracted-details">
                                    {extractedSymptoms.bodyLocation && (
                                        <span className="nlp-tag">📍 {extractedSymptoms.bodyLocation}</span>
                                    )}
                                    {extractedSymptoms.duration && (
                                        <span className="nlp-tag">⏱️ {extractedSymptoms.duration.raw}</span>
                                    )}
                                    {extractedSymptoms.painScore !== null && (
                                        <span className="nlp-tag">💊 Pain: {extractedSymptoms.painScore}/10</span>
                                    )}
                                    {extractedSymptoms.qualityDescriptors.length > 0 && (
                                        <span className="nlp-tag">🔍 {extractedSymptoms.qualityDescriptors.slice(0, 3).join(', ')}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <SummaryDisplay
                        summary={summary}
                        answers={answers}
                        conditionName={conditionName}
                    />
                    <div className="summary-next-steps">
                        <h3>Next Steps</h3>
                        <p>Book a consultation with a pharmacist to review your assessment and discuss your options.</p>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => navigate('/booking', { state: { sessionId, conditionName } })}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M6 2v3m6-3v3M3 7.5h12M4.5 3h9a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 013 15V4.5A1.5 1.5 0 014.5 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Book Pharmacist Consultation
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
