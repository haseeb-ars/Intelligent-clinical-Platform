// In-memory slot and booking storage
const pharmacists = [
    { id: 'pharm_1', name: 'Dr. Sarah Mitchell' },
    { id: 'pharm_2', name: 'Dr. James Wilson' }
];

function generateSlots(dateStr) {
    const date = dateStr || new Date().toISOString().split('T')[0];
    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30'
    ];

    let slotId = 1;
    const slots = [];

    for (const pharmacist of pharmacists) {
        for (const time of timeSlots) {
            // Randomly mark some slots as unavailable for realism
            const isBooked = bookedSlotIds.has(slotId) || Math.random() < 0.2;
            slots.push({
                id: slotId,
                pharmacist: pharmacist.name,
                pharmacistId: pharmacist.id,
                date,
                time,
                available: !isBooked
            });
            slotId++;
        }
    }

    return slots;
}

const bookedSlotIds = new Set();
const bookings = [];

const bookingService = {
    getAvailableSlots(date) {
        const slots = generateSlots(date);
        return slots.filter(s => s.available);
    },

    createBooking({ sessionId, patientName, phone, slotId }) {
        const allSlots = generateSlots();
        const slot = allSlots.find(s => s.id === slotId);

        if (!slot) {
            throw new Error('Invalid slot ID');
        }

        if (bookedSlotIds.has(slotId)) {
            throw new Error('This slot is no longer available');
        }

        bookedSlotIds.add(slotId);

        const booking = {
            id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            sessionId,
            patientName,
            phone,
            slotId,
            pharmacist: slot.pharmacist,
            time: slot.time,
            date: slot.date,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        bookings.push(booking);
        return booking;
    },

    getBookings() {
        return bookings;
    }
};

module.exports = bookingService;
