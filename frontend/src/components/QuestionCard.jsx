import React, { useState, useEffect } from 'react';

export default function QuestionCard({ question, currentAnswer, onAnswer, animationKey }) {
    const [selected, setSelected] = useState(currentAnswer || (question.type === 'multi' ? [] : null));
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(false);
        const timer = setTimeout(() => setAnimate(true), 50);
        return () => clearTimeout(timer);
    }, [animationKey]);

    useEffect(() => {
        if (currentAnswer !== undefined) {
            setSelected(currentAnswer);
        } else {
            setSelected(question.type === 'multi' ? [] : null);
        }
    }, [question.id, currentAnswer]);

    const handleSelect = (option) => {
        if (question.type === 'single') {
            setSelected(option);
            onAnswer(question.id, option);
        } else {
            setSelected(prev => {
                const arr = Array.isArray(prev) ? prev : [];
                const updated = arr.includes(option)
                    ? arr.filter(o => o !== option)
                    : [...arr, option];
                onAnswer(question.id, updated);
                return updated;
            });
        }
    };

    const isSelected = (option) => {
        if (question.type === 'single') return selected === option;
        return Array.isArray(selected) && selected.includes(option);
    };

    return (
        <div className={`question-card ${animate ? 'question-card-enter' : ''}`}>
            <div className="question-type-badge">
                {question.type === 'multi' ? 'Select all that apply' : 'Select one'}
            </div>
            <h2 className="question-text">{question.text}</h2>
            <div className="question-options">
                {question.options.map((option, idx) => (
                    <button
                        key={idx}
                        className={`question-option ${isSelected(option) ? 'question-option-selected' : ''}`}
                        onClick={() => handleSelect(option)}
                        style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                        <span className="question-option-indicator">
                            {question.type === 'single' ? (
                                <span className={`radio-dot ${isSelected(option) ? 'radio-dot-active' : ''}`} />
                            ) : (
                                <span className={`checkbox-dot ${isSelected(option) ? 'checkbox-dot-active' : ''}`}>
                                    {isSelected(option) && (
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </span>
                            )}
                        </span>
                        <span className="question-option-text">{option}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
