const prisma = require('../lib/prisma');

// All available time slots
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30'
];

const bookingController = {
  /**
   * GET /api/bookings/slots?date=YYYY-MM-DD
   * Returns available slots for a given date.
   */
  async getSlots(req, res, next) {
    try {
      const date = req.query.date || new Date().toISOString().split('T')[0];

      // Fetch pharmacists from DB
      const pharmacists = await prisma.pharmacist.findMany({
        select: { id: true, name: true }
      });

      // Fetch already-booked slot IDs for this date
      const existingBookings = await prisma.booking.findMany({
        where: { date },
        select: { slotId: true }
      });
      const bookedSlotIds = new Set(existingBookings.map(b => b.slotId));

      // Generate slots
      let slotNum = 1;
      const slots = [];
      for (const pharmacist of pharmacists) {
        for (const time of TIME_SLOTS) {
          const slotId = `${date}_${pharmacist.id}_${time.replace(':', '')}`;
          slots.push({
            id: slotId,
            slotNum: slotNum++,
            pharmacist: pharmacist.name,
            pharmacistId: pharmacist.id,
            date,
            time,
            available: !bookedSlotIds.has(slotId)
          });
        }
      }

      res.json({ slots: slots.filter(s => s.available) });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/bookings
   * Creates a booking and stores it in NeonDB.
   */
  async createBooking(req, res, next) {
    try {
      const { sessionId, patientName, phone, slotId } = req.body;

      if (!patientName || !phone || !slotId) {
        return res.status(400).json({
          error: 'Missing required fields: patientName, phone, slotId'
        });
      }

      // Check slot not already booked
      const existing = await prisma.booking.findFirst({ where: { slotId } });
      if (existing) {
        return res.status(409).json({ error: 'This slot is no longer available.' });
      }

      // Parse slot metadata from the composite ID: {date}_{pharmacistId}_{time}
      // e.g. "2026-04-28_pharm_1_0900"
      let date = '', pharmacistId = '', time = '';
      const parts = slotId.split('_');
      if (parts.length >= 4) {
        date = `${parts[0]}-${parts[1]}-${parts[2]}`;
        // Remaining structure: pharm_{n}_{HHMM}
        // Find the time (last segment)
        const rawTime = parts[parts.length - 1];
        time = rawTime.length === 4
          ? `${rawTime.slice(0, 2)}:${rawTime.slice(2)}`
          : rawTime;
        // pharmacistId is everything between date and time
        pharmacistId = parts.slice(3, parts.length - 1).join('_');
      }

      // Resolve pharmacist name
      let pharmacistName = 'Unknown Pharmacist';
      if (pharmacistId) {
        const ph = await prisma.pharmacist.findUnique({
          where: { id: pharmacistId },
          select: { name: true }
        });
        if (ph) pharmacistName = ph.name;
      }

      // Handle optional sessionId — create a stub session if not provided
      let resolvedSessionId = sessionId;
      if (!resolvedSessionId) {
        const stub = await prisma.patientSession.create({
          data: {
            conditionId: 'walk-in',
            conditionName: 'Walk-in / Direct Booking',
            answers: [],
            status: 'pending'
          }
        });
        resolvedSessionId = stub.id;
      }

      const booking = await prisma.booking.create({
        data: {
          sessionId: resolvedSessionId,
          patientName,
          phone,
          slotId,
          pharmacist: pharmacistName,
          pharmacistId: pharmacistId || 'unknown',
          time,
          date,
          status: 'pending'
        },
        include: { session: true }
      });

      res.status(201).json({ booking });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/bookings
   * Returns all bookings (pharmacist-facing).
   */
  async getBookings(req, res, next) {
    try {
      const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        include: { session: true }
      });
      res.json({ bookings });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = bookingController;
