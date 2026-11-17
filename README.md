# Workforce Analytics Platform

React + TypeScript + Vite workforce analytics application with a SQLite-backed Express API.

## Run locally

### Backend
```bash
cd server
cp .env.example .env
# Set JWT_SECRET and BOOTSTRAP_KEY in server/.env
npm install
npm run dev
```

### Frontend (new terminal, project root)
```bash
npm install
npm run dev
```
Open http://localhost:5173. Backend health: http://localhost:4000/api/health.

See [README_RBAC.md](README_RBAC.md) for Admin bootstrap, role permissions, MFA, session management, API endpoints, migrations and test instructions.
