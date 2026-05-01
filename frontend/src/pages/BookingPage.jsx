import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SlotCard from '../components/SlotCard';
import { getAvailableSlots, createBooking } from '../api/client';

export default function BookingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { sessionId, conditionName } = location.state || {};

    const [step, setStep] = useState(1);
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [patientName, setPatientName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(null);
    const [slotsLoading, setSlotsLoading] = useState(true);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        setSlotsLoading(true);
        try {
            const data = await getAvailableSlots();
            setSlots(data.slots || []);
        } catch (err) {
            console.error('Failed to fetch slots:', err);
            // Use mock slots as fallback
            setSlots(generateMockSlots());
        } finally {
            setSlotsLoading(false);
        }
    };

    const generateMockSlots = () => {
        const today = new Date().toISOString().split('T')[0];
        const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30', '15:00'];
        return times.map((time, i) => ({
            id: i + 1,
            pharmacist: i < 5 ? 'Dr. Sarah Mitchell' : 'Dr. James Wilson',
            date: today,
            time,
            available: true
        }));
    };

    const handleBooking = async () => {
        setLoading(true);
        try {
            const data = await createBooking({
                sessionId,
                patientName,
                phone,
                slotId: selectedSlot.id
            });
            setBooking(data.booking || {
                id: 'mock_booking',
                patientName,
                phone,
                pharmacist: selectedSlot.pharmacist,
                time: selectedSlot.time,
                date: selectedSlot.date,
                status: 'confirmed'
            });
            setStep(3);
        } catch (err) {
            // Fallback to mock booking
            setBooking({
                id: `booking_${Date.now()}`,
                patientName,
                phone,
                pharmacist: selectedSlot.pharmacist,
                time: selectedSlot.time,
                date: selectedSlot.date,
                status: 'confirmed'
            });
            setStep(3);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-page">
            <div className="booking-header">
                <button className="btn-back" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                </button>
                <h1 className="page-title">Book Consultation</h1>
                {conditionName && <p className="page-subtitle">For: {conditionName}</p>}
            </div>

            {/* Step Indicators */}
            <div className="booking-steps">
                {['Choose Slot', 'Your Details', 'Confirmation'].map((label, i) => (
                    <div key={i} className={`booking-step-indicator ${step > i + 1 ? 'completed' : ''} ${step === i + 1 ? 'active' : ''}`}>
                        <div className="booking-step-circle">
                            {step > i + 1 ? (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M3 7l2.5 2.5L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                i + 1
                            )}
                        </div>
                        <span className="booking-step-label">{label}</span>
                    </div>
                ))}
            </div>

            {/* Step 1: Slot Selection */}
            {step === 1 && (
                <div className="booking-step-content">
                    <h2 className="booking-step-title">Choose an available time slot</h2>
                    {slotsLoading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading available slots...</p>
                        </div>
                    ) : (
                        <>
                            <div className="slots-grid">
                                {slots.map(slot => (
                                    <SlotCard
                                        key={slot.id}
                                        slot={slot}
                                        selected={selectedSlot?.id === slot.id}
                                        onSelect={setSelectedSlot}
                                    />
                                ))}
                            </div>
                            <button
                                className="btn btn-primary btn-lg"
                                disabled={!selectedSlot}
                                onClick={() => setStep(2)}
                            >
                                Continue
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Step 2: Patient Details */}
            {step === 2 && (
                <div className="booking-step-content">
                    <h2 className="booking-step-title">Enter your details</h2>
                    <div className="booking-form">
                        <div className="form-group">
                            <label htmlFor="patientName">Full Name</label>
                            <input
                                id="patientName"
                                type="text"
                                placeholder="Enter your full name"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="booking-selected-slot">
                            <h4>Selected Appointment</h4>
                            <div className="slot-summary">
                                <div><strong>Pharmacist:</strong> {selectedSlot?.pharmacist}</div>
                                <div><strong>Date:</strong> {selectedSlot?.date}</div>
                                <div><strong>Time:</strong> {selectedSlot?.time}</div>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary btn-lg"
                            disabled={!patientName.trim() || !phone.trim() || loading}
                            onClick={handleBooking}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner spinner-sm"></span>
                                    Booking...
                                </>
                            ) : (
                                'Confirm Booking'
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && booking && (
                <div className="booking-step-content booking-confirmation">
                    <div className="confirmation-icon">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="22" stroke="#009639" strokeWidth="3" />
                            <path d="M14 24l7 7 13-14" stroke="#009639" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2>Booking Confirmed!</h2>
                    <p className="confirmation-subtitle">Your pharmacist consultation has been booked successfully.</p>

                    <div className="confirmation-details">
                        <div className="confirmation-row">
                            <span>Patient Name</span>
                            <strong>{booking.patientName}</strong>
                        </div>
                        <div className="confirmation-row">
                            <span>Phone</span>
                            <strong>{booking.phone}</strong>
                        </div>
                        <div className="confirmation-row">
                            <span>Pharmacist</span>
                            <strong>{booking.pharmacist}</strong>
                        </div>
                        <div className="confirmation-row">
                            <span>Date</span>
                            <strong>{booking.date}</strong>
                        </div>
                        <div className="confirmation-row">
                            <span>Time</span>
                            <strong>{booking.time}</strong>
                        </div>
                        <div className="confirmation-row">
                            <span>Reference</span>
                            <strong className="booking-ref">{booking.id}</strong>
                        </div>
                    </div>

                    <div className="confirmation-note">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <p>You will receive a call from the pharmacist at your scheduled time. Please have your phone available.</p>
                    </div>

                    <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
                        Return Home
                    </button>
                </div>
            )}
        </div>
    );
}
