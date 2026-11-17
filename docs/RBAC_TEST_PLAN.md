# WFA Authentication & RBAC Test Plan

## Automated tests

| Area | Test | Expected result |
|---|---|---|
| Password security | Correct password / wrong password | Correct verifies; wrong password fails |
| MFA | Generate and verify TOTP | Six-digit current-window code verifies |
| Refresh token storage | SHA-256 digest | Raw refresh token is never stored |
| Bootstrap | First Admin creation | 201; repeat bootstrap returns 409 |
| Employee access | Employee requests workforce directory | 403 Forbidden |
| Employee self-service | Employee requests own profile and attendance | 200; linked employee record only |
| Audit authorization | Employee requests audit logs | 403 Forbidden |
| Manager scope | Manager requests employee directory | Only linked department records returned |
| Team Lead scope | TeamLead requests employee directory | Only linked department/team records returned |

Run backend tests with `cd server && npm test`. Run frontend tests from project root with `npm test`.

## Manual browser end-to-end demonstration

1. Start SQLite API and Vite frontend.
2. Bootstrap the first Admin account once.
3. Sign in as Admin and verify the Admin dashboard, account creation panel and audit feed.
4. Create an HR user linked to an employee; verify HR can access the workforce directory but cannot access Admin-only audit tools.
5. Create a Manager linked to an employee; verify only that employee's department appears in employee, attendance, department and activity data.
6. Create a TeamLead linked to an employee; verify only that employee's team appears.
7. Create an Employee linked to an employee; verify only My Workforce Portal, own profile and own attendance are available; direct workforce API requests return 403.
8. Enable MFA using Google Authenticator or Microsoft Authenticator; log out and verify next login requires a six-digit code.
9. Open Sessions, revoke a session, and verify that refresh session cannot be reused.
10. Verify five incorrect password attempts lock the account for 15 minutes.
11. Capture screenshots of Admin, HR, Manager, TeamLead, Employee, MFA enrollment, Access Denied and test results.

## Execution evidence in this build environment

- Backend JavaScript syntax checks: passed.
- Security unit tests (`node --test test/security.test.js`): 3 passed.
- SQLite schema + migrations 002/003: validated with SQLite; auth tables and team_name column created successfully.
- Backend HTTP integration tests: authored, but not executed here because the supplied `better-sqlite3` native binary is Windows-built and cannot load in this Linux test container; rebuilding requires downloading Node headers, and network access was unavailable.
- Frontend TypeScript/Vite build and browser tests: not executed here because frontend dependencies were not installed in this container. Run them on the Windows development machine after `npm install`.

Do not mark the manual browser end-to-end items complete until they have been performed and screenshots captured on the target machine.


C:\Users\Admin\Downloads\WFA_RBAC_Implementation_Updated\server>npm test
 
> test
> node --test
 
✔ bootstrap, admin account creation, and employee self-service authorization (267.4938ms)
✔ Manager sees only linked department and TeamLead sees only linked team (279.3252ms)
✔ refresh tokens rotate and replay revokes the token family (72.2124ms)
✔ five failed password attempts lock the account temporarily (366.0891ms)
✔ password hashes verify only the original password (148.337ms)
✔ TOTP codes validate for the active time window (1.0785ms)
✔ refresh tokens are stored as SHA-256 digests (0.2829ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1252.9416


C:\Users\Admin\Downloads\WFA_RBAC_Implementation_TestFix>npm test
 
> workforce-dashboard@0.0.0 test
> vitest run
 
 
RUN  v5.0.5 C:/Users/Admin/Downloads/WFA_RBAC_Implementation_TestFix
 
✓ tests/filters.test.ts (4 tests) 9ms
 
 
 
✓ tests/AuthLogin.test.tsx (2 tests) 390ms
✓ tests/Dashboard.test.tsx (2 tests) 144ms
 
Test Files  3 passed (3)
      Tests  8 passed (8)
   Start at  14:16:17
   Duration  11.04s (import 61%, environment 35%, tests 3%, transform 1%)
   