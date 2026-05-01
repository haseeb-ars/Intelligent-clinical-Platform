import React from 'react';

export default function SlotCard({ slot, selected, onSelect }) {
    return (
        <button
            className={`slot-card ${selected ? 'slot-card-selected' : ''}`}
            onClick={() => onSelect(slot)}
            disabled={!slot.available}
        >
            <div className="slot-card-time">{slot.time}</div>
            <div className="slot-card-pharmacist">{slot.pharmacist}</div>
            <div className="slot-card-date">{slot.date}</div>
            {selected && (
                <div className="slot-card-check">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4 9l3.5 3.5L14 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
        </button>
    );
}
