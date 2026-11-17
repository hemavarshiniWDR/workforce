# WFA Authentication, Authorization & RBAC

This implementation extends the existing Workforce Analytics Platform SQLite database. It does not replace the workforce database.

## Implemented
- Scrypt password hashing and timing-safe verification.
- HS256 JWT access tokens (15 minutes), opaque hashed refresh tokens (7 days), rotation and reuse-family revocation.
- HttpOnly, SameSite=Strict refresh cookie.
- TOTP MFA enrollment and verification.
- Five roles: Admin, HR, Manager, TeamLead, Employee.
- Server-side role checks plus row-level scope: Admin/HR all workforce data; Manager own department; TeamLead own department/team; Employee own profile and attendance only.
- Account lockout after five invalid passwords (15 minutes), authentication rate limiting, security headers and audit log.
- Session listing and per-session revocation endpoints.
- Admin account creation endpoint with employee association for scoped roles.
- Frontend login, refresh-on-start, refresh-on-401, logout, MFA enrollment UI and Employee self-service page.
- Versioned SQLite migrations 002 and 003.

## Setup
1. Use Node.js 22 or later.
2. `cd server` and copy `.env.example` to `.env`. Set unique random values for `JWT_SECRET` (at least 32 characters) and `BOOTSTRAP_KEY`.
3. Start the backend: `npm install` then `npm run dev`. The SQLite migrations execute on startup.
4. Create the first Admin once using PowerShell (replace the key with the value from `.env`):

```powershell
$body = @{ email = 'admin@wfa.com'; password = 'Use-A-Unique-Password-12+' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:4000/api/auth/bootstrap-admin' -Method POST -Headers @{'x-bootstrap-key'='YOUR_BOOTSTRAP_KEY'} -ContentType 'application/json' -Body $body
```

5. Remove `BOOTSTRAP_KEY` from the runtime environment after bootstrap and restart the backend.
6. From the project root run `npm install` then `npm run dev`. Open `http://localhost:5173`.
7. Sign in with the Admin email and the password used in step 4.
8. In Admin account creation, associate each non-admin user with an existing `employeeId`. Manager and TeamLead scoping is derived from that employee record.

## API
- `POST /api/auth/bootstrap-admin` – one-time initial Admin creation.
- `POST /api/auth/login` – `{email,password,otp?}`.
- `POST /api/auth/refresh` – rotates HttpOnly refresh cookie.
- `POST /api/auth/logout` – revokes current refresh token.
- `GET /api/auth/me` – authenticated account details.
- `POST /api/auth/mfa/setup` and `POST /api/auth/mfa/verify` – TOTP setup and enablement.
- `GET /api/auth/sessions`, `DELETE /api/auth/sessions/:id` – own session management.
- `POST /api/auth/users` – Admin-only `{email,password,role,employeeId}`.
- `GET /api/auth/users` – Admin/HR user listing.
- `GET /api/employees`, `/api/dashboard/summary`, `/api/departments`, `/api/attendance` – role-scoped organization data.
- `GET /api/me/profile`, `GET /api/me/attendance` – Employee-only self-service.
- `GET /api/audit-logs` – Admin-only audit events.

## Role scope
| Role | Data access |
|---|---|
| Admin | All employees, departments, attendance, users and audit logs |
| HR | All workforce and user directory data; no audit logs |
| Manager | Employees and analytics in the linked employee's department |
| TeamLead | Employees and analytics in the linked employee's department and team |
| Employee | Own profile and attendance only |

Manager and TeamLead accounts must have a valid `employeeId` when created. Existing employees receive deterministic starter team labels from migration 003; replace those labels with real team assignments before production.

## Tests
- Backend tests: `cd server && npm test`
- Frontend production build: from root, `npm run build`
- Frontend tests: from project root run `npm test` (Vitest; includes the existing dashboard tests and new login UI tests).

## Production notes
- Auth rate limiter is in-memory and single-process only; use Redis/shared storage for multiple instances.
- Deploy behind HTTPS, configure explicit trusted origins, use a secret manager, and add CSRF/origin protection appropriate to the deployment topology.
- TOTP secret is stored in SQLite; encrypt it at rest and restrict database access in production.
- Team names assigned by migration 003 are sample assignments, not a substitute for verified organizational data.

## Frontend test suite

Run the frontend unit tests from the project root:

```bash
npm test
```

The suite covers login error handling, KPI card rendering, and employee dashboard filter behavior. The MUI `TextField` HTML input attributes use `slotProps.htmlInput` for compatibility with the installed Material UI version.
