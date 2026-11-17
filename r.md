## Task 1 — Dashboard UI/UX Development

A modern, responsive Workforce Analytics Dashboard built using React, TypeScript, Vite, Material UI, and Recharts.

The dashboard provides workforce and attendance insights through KPI cards, interactive charts, employee activity, filters, responsive layouts, and light/dark themes.

---

## 1. Technology Stack

- React
- TypeScript
- Vite
- Material UI
- Material UI Icons
- Recharts
- Responsive CSS
- Vitest
- React Testing Library
- jsdom

---

## 2. Key Features

### Dashboard

- Sidebar navigation
- Top navigation
- Five workforce KPI cards
- Attendance trend chart
- Department-wise employee distribution
- Workforce status donut chart
- Recent employee activity

### Filters

- Date filter
- Department filter
- Location filter
- Employee status filter
- Filter reset functionality

### Theme

- Dark mode
- Light mode
- Theme switching
- Modern dark-green/emerald visual design

### Responsive Design

The dashboard is optimized for:

- Desktop
- Tablet
- Mobile

Dashboard components automatically resize and reorganize according to the available screen size.

### UI States

- Loading state
- Empty state
- Error state

---

## 3. Prerequisites

Before running the project, make sure the following are installed:

- Node.js
- npm
- Git

Check the installed versions:

```bash
node --version
npm --version
git --version
```

---

## 4. Installation

### Step 1 — Clone the Repository

```bash
git clone <your-repository-url>
```

Replace `<your-repository-url>` with the GitHub repository URL.

### Step 2 — Navigate to the Project

```bash
cd workforce
```

### Step 3 — Install Dependencies

```bash
npm install
```

This installs all required project dependencies from `package.json`.

---

## 5. Run the Development Server

Start the Vite development server:

```bash
npm run dev
```

The terminal will display a local URL similar to:

```text
http://localhost:5173/
```

Open the displayed URL in your browser.

---

## 6. Production Build

To create a production-ready build:

```bash
npm run build
```

A successful build confirms that the project can be compiled for production.

---

## 7. Preview Production Build

After creating the production build:

```bash
npm run preview
```

Open the URL provided by Vite in the terminal.

---

## 8. Run Tests

The project uses Vitest and React Testing Library.

Run the test suite:

```bash
npm run test -- --run
```

For development/watch mode:

```bash
npm run test
```

The tests cover dashboard components and filter functionality.

---

## 9. Linting

Run the project lint check using:

```bash
npm run lint
```

---

## 10. Project Structure

```text
workforce/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   └── layout/
│   │
│   ├── data/
│   │   └── dashboard.ts
│   │
│   ├── hooks/
│   │
│   ├── pages/
│   │
│   ├── theme/
│   │
│   ├── types/
│   │   └── dashboard.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── tests/
│   ├── Dashboard.test.tsx
│   └── filters.test.ts
│
├── package.json
├── package-lock.json
├── vite.config.ts
├── vitest.config.ts
├── vitest.setup.ts
└── README.md
```

---

## 11. Mock Data

The dashboard currently uses mock workforce data for UI/UX development.

Mock data includes:

- Employees
- Departments
- Workforce status
- Attendance records
- KPI values
- Employee activity

This allows the dashboard interface and interactions to be developed independently before connecting a backend API.

---

## 12. Responsive Verification

The dashboard was designed to support different screen sizes.

### Desktop

Recommended testing resolution:

```text
1440 × 900
```

### Tablet

Recommended testing resolution:

```text
1024 × 768
```

### Mobile

Recommended testing resolution:

```text
390 × 844
```

The following areas are verified across responsive layouts:

- Sidebar/navigation
- KPI cards
- Charts
- Filters
- Employee activity
- Theme controls
- Content spacing

---

## 13. Theme Design

The primary dashboard visual identity uses a dark-green/emerald theme.

The design focuses on:

- Professional enterprise appearance
- High readability
- Clear information hierarchy
- Modern card-based layout
- Subtle visual effects
- Consistent spacing
- Responsive usability

The dashboard also supports switching between dark and light themes.

---

## 14. Accessibility

The UI follows accessibility-focused practices including:

- Meaningful labels
- Accessible buttons
- Readable typography
- Sufficient visual hierarchy
- Keyboard-friendly controls
- Responsive layouts
- Clear status indicators

---

## 15. Testing Checklist

| Feature | Status |
|---|---|
| Dashboard rendering | Verified |
| KPI cards | Verified |
| Attendance chart | Verified |
| Department chart | Verified |
| Workforce donut chart | Verified |
| Employee activity | Verified |
| Department filter | Verified |
| Location filter | Verified |
| Status filter | Verified |
| Date filter | Verified |
| Theme switching | Verified |
| Desktop layout | Verified |
| Tablet layout | Verified |
| Mobile layout | Verified |
| Loading state | Verified |
| Empty state | Verified |
| Error state | Verified |
| Unit/component tests | Verified |
| Production build | Verified |

---

## 16. Task 1 Deliverables

The following deliverables are included for Task 1:

1. Complete source code
2. Dashboard screenshots
3. Responsive layout demonstration
4. Implemented feature list
5. Testing results
6. README with setup instructions

---

## 17. Development Commands

### Install

```bash
npm install
```

### Start development

```bash
npm run dev
```

### Run tests

```bash
npm run test -- --run
```

### Run lint

```bash
npm run lint
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## 18. Conclusion

The Workforce Analytics Platform Dashboard provides a responsive and professional enterprise-level interface for monitoring workforce, attendance, productivity, employee distribution, and workforce status.

The implementation uses reusable React components, TypeScript for type safety, Material UI for UI components, and Recharts for data visualization.

# Workforce Analytics Platform — Task 2

Task 2 extends the supplied Task 1 React + TypeScript + Vite + Material UI dashboard. Existing dashboard cards, chart components, layout, theme and filter concepts are retained and extended.

## Stack
- Frontend: React, TypeScript (strict project configuration), Vite, Material UI, Recharts
- Backend: Node.js, Express
- Database: SQLite using `better-sqlite3`
- Architecture: UI components → API service → Express routes → repository layer → SQLite

## Features
- Responsive dashboard shell and navigation
- KPI cards: total employees, present, absent, on leave and attendance rate
- Attendance trend, department distribution and workforce status charts
- Department, location and status filters
- Employee directory with search, sorting and pagination
- REST endpoints for employees, dashboard summary, departments and attendance
- SQLite schema with foreign keys, indexes and deterministic starter records
- Backend-unavailable notice with Task 1 sample-data fallback

## Requirements
Node.js 22 or later is recommended. On Windows, `better-sqlite3` may require Visual Studio C++ Build Tools if a prebuilt binary is unavailable.

## Run locally
Terminal 1 — frontend:
```bash
npm install
npm run dev
```
Terminal 2 — API:
```bash
cd server
npm install
npm run dev
```
Open the Vite URL shown in the terminal (normally http://localhost:5173). Vite proxies `/api` to `http://localhost:4000`.

Alternatively, from the project root run `npm install` then `npm run dev:full` (the API dependencies must also be installed with `cd server && npm install` once).

## API
- `GET /api/health`
- `GET /api/employees?department=Engineering&location=Chennai&status=Present&search=Arun`
- `GET /api/dashboard/summary`
- `GET /api/departments`
- `GET /api/attendance`

## Database
The database is created automatically at `server/data/workforce.sqlite` on first API start. Tables:
- `departments`
- `employees`
- `attendance`

SQLite enables WAL and foreign-key enforcement. Seed records are inserted only when the employee table is empty. Do not commit the generated database or secrets; `.gitignore` excludes local database files.

## Project structure
```text
src/
  components/
    common/       # loading, error and empty states
    dashboard/   # KPI, charts, filters, employee directory
    layout/      # sidebar and top navigation
  data/           # Task 1 fallback/demo data
  hooks/          # reusable dashboard hooks
  services/       # API client
  pages/          # dashboard page composition
  theme/
  types/
server/
  src/
    db.js
    index.js
    repositories.js
  data/           # generated SQLite database
```

## Notes / next integration steps
The current Task 1 chart data remains as a fallback for chart rendering. The employee directory reads from the SQLite API when the backend is running. For production, wire attendance and department chart series to their corresponding API endpoints, add write endpoints and request validation, authentication/authorization, migrations, and integration tests. The date-period selector currently changes the displayed sample trend window; a full historical date-range query should be connected when attendance history is populated.
