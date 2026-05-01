import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConditionCard({ condition }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/questionnaire/${condition.id}`);
    };

    return (
        <button
            className="condition-card"
            onClick={handleClick}
            style={{ '--condition-color': condition.color }}
        >
            <div className="condition-card-icon">{condition.icon}</div>
            <div className="condition-card-content">
                <h3 className="condition-card-title">{condition.name}</h3>
                <p className="condition-card-desc">{condition.description}</p>
            </div>
            <div className="condition-card-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </button>
    );
}
