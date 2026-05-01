import React from 'react';

export default function ProgressBar({ progress, currentStep, totalSteps }) {
    return (
        <div className="progress-container">
            <div className="progress-info">
                <span className="progress-label">Question {currentStep} of {totalSteps}</span>
                <span className="progress-percent">{Math.round(progress)}%</span>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
