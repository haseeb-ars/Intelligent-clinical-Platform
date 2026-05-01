# PharmaCare AI

NHS Pharmacy First intelligent clinical platform. Patients answer AI-driven symptom questions, an LLM generates a clinical summary for the pharmacist, and the patient can book a consultation call.

## Tech Stack

- **Frontend**: React 19 + Vite
- **Backend**: Node.js + Express
- **AI**: Anthropic Claude API (claude-sonnet-4-20250514)
- **Auth**: JWT (pharmacist login)
- **DB**: PostgreSQL (via Prisma ORM)
- **Deployment**: Docker-ready

## Quick Start

### 1. Clone & Install

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your ANTHROPIC_API_KEY
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

Edit `backend/.env`:

```
ANTHROPIC_API_KEY=your_key_here
DATABASE_URL=postgresql://pharmacare:pharmacare@localhost:5432/pharmacare_db
JWT_SECRET=your_secret_here
PORT=3001
```

> **Note:** The app works without an API key — it will return mock clinical summaries. Set the key for real AI-generated summaries.

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

### 4. Docker (Optional)

```bash
ANTHROPIC_API_KEY=your_key docker compose up
```

## Pharmacy First Conditions

The platform covers all 7 NHS Pharmacy First conditions:

| # | Condition | Questions |
|---|-----------|-----------|
| 1 | Earache | 10 |
| 2 | Sore Throat | 10 |
| 3 | Sinusitis | 9 |
| 4 | Infected Eye (Conjunctivitis) | 10 |
| 5 | UTI | 9 |
| 6 | Shingles | 10 |
| 7 | Impetigo | 10 |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/conditions | List all conditions |
| POST | /api/ai/summary | Generate clinical summary |
| GET | /api/bookings/slots | Get available slots |
| POST | /api/bookings | Create a booking |
| POST | /api/auth/login | Pharmacist login |
| GET | /api/pharmacist/queue | Pending patient summaries |

## Pharmacist Dashboard

Access via the **"Pharmacist View"** button in the header.

**Demo credentials:**
- Email: `sarah.mitchell@nhs.net`
- Password: `pharmacy123`

## Project Structure

```
pharmacare-ai/
├── frontend/          # React + Vite
│   └── src/
│       ├── pages/     # 5 page components
│       ├── components/# 7 reusable components
│       ├── hooks/     # Custom React hooks
│       ├── data/      # Condition data
│       ├── api/       # Axios client
│       └── styles/    # Global CSS
├── backend/           # Node.js + Express
│   ├── prisma/        # DB schema
│   └── src/
│       ├── routes/    # API routes
│       ├── controllers/
│       ├── services/  # Claude + booking
│       ├── middleware/ # Auth + errors
│       └── utils/     # Prompt builder
└── docker-compose.yml
```

## License

NHS Pharmacy First Service — For demonstration purposes.
