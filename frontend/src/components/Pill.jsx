import React from 'react';

export default function Pill({ status }) {
    const statusConfig = {
        pending: { label: 'Pending', className: 'pill-pending' },
        reviewed: { label: 'Reviewed', className: 'pill-reviewed' },
        completed: { label: 'Completed', className: 'pill-completed' },
        confirmed: { label: 'Confirmed', className: 'pill-confirmed' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span className={`pill ${config.className}`}>
            {config.label}
        </span>
    );
}
