import React, { useState } from 'react';
import { formatSummary } from '../utils/formatSummary';

export default function SummaryDisplay({ summary, answers, conditionName }) {
    const [activeTab, setActiveTab] = useState('summary');
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = summary;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="summary-display">
            <div className="summary-tabs">
                <button
                    className={`summary-tab ${activeTab === 'summary' ? 'summary-tab-active' : ''}`}
                    onClick={() => setActiveTab('summary')}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M5 5h6M5 8h6M5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Clinical Summary
                </button>
                <button
                    className={`summary-tab ${activeTab === 'responses' ? 'summary-tab-active' : ''}`}
                    onClick={() => setActiveTab('responses')}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4h8M4 7h8M4 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Patient Responses
                </button>
            </div>

            <div className="summary-content">
                {activeTab === 'summary' ? (
                    <div className="summary-text">
                        {formatSummary(summary)}
                    </div>
                ) : (
                    <div className="summary-responses">
                        <h3 className="summary-section-title">Patient Responses — {conditionName}</h3>
                        {answers && answers.map((a, i) => (
                            <div key={i} className="response-item">
                                <div className="response-question">{a.question}</div>
                                <div className="response-answer">
                                    {Array.isArray(a.answer) ? a.answer.join(', ') : a.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="summary-actions">
                <button className="btn btn-secondary" onClick={handleCopy}>
                    {copied ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Copy Summary
                        </>
                    )}
                </button>
            </div>

            <div className="summary-disclaimer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p>This AI-generated summary is for pharmacist review only. It does not constitute a diagnosis or treatment recommendation. Clinical judgement must be applied.</p>
            </div>
        </div>
    );
}
