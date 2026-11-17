import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
process.env.DB_PATH = ':memory:';
process.env.JWT_SECRET = 'integration-test-secret-at-least-48-characters-long';
process.env.BOOTSTRAP_KEY = 'integration-bootstrap-secret-key';
process.env.FRONTEND_ORIGIN = 'http://localhost:5173';
const [{ default: app }] = await Promise.all([import('../src/index.js')]);
let server, base;
async function request(path, options = {}) { return fetch(`${base}${path}`, options); }
async function login(email, password) { const r = await request('/api/auth/login', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({email,password}) }); assert.equal(r.status,200); return (await r.json()).accessToken; }
before(async () => { server = app.listen(0); await new Promise(resolve => server.once('listening', resolve)); base = `http://127.0.0.1:${server.address().port}`; });
after(async () => { await new Promise(resolve => server.close(resolve)); });
test('bootstrap, admin account creation, and employee self-service authorization', async () => {
  const boot = await request('/api/auth/bootstrap-admin',{method:'POST',headers:{'content-type':'application/json','x-bootstrap-key':process.env.BOOTSTRAP_KEY},body:JSON.stringify({email:'admin@test.local',password:'Admin-Test-Password-123'})});
  assert.equal(boot.status,201);
  const adminToken = await login('admin@test.local','Admin-Test-Password-123');
  const create = await request('/api/auth/users',{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${adminToken}`},body:JSON.stringify({email:'employee@test.local',password:'Employee-Test-Password-123',role:'Employee',employeeId:1})});
  assert.equal(create.status,201);
  const employeeToken = await login('employee@test.local','Employee-Test-Password-123');
  const denied = await request('/api/employees',{headers:{authorization:`Bearer ${employeeToken}`}});
  assert.equal(denied.status,403);
  const profile = await request('/api/me/profile',{headers:{authorization:`Bearer ${employeeToken}`}});
  assert.equal(profile.status,200);
  assert.equal((await profile.json()).id,1);
  const ownAttendance = await request('/api/me/attendance',{headers:{authorization:`Bearer ${employeeToken}`}});
  assert.equal(ownAttendance.status,200);
  const auditDenied = await request('/api/audit-logs',{headers:{authorization:`Bearer ${employeeToken}`}});
  assert.equal(auditDenied.status,403);
});
test('Manager sees only linked department and TeamLead sees only linked team', async () => {
  const adminToken = await login('admin@test.local','Admin-Test-Password-123');
  for (const account of [
    {email:'manager@test.local',role:'Manager',employeeId:6,password:'Manager-Test-Password-123'},
    {email:'lead@test.local',role:'TeamLead',employeeId:9,password:'TeamLead-Test-Password-123'}
  ]) {
    const created = await request('/api/auth/users',{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${adminToken}`},body:JSON.stringify(account)});
    assert.equal(created.status,201);
    const token = await login(account.email,account.password);
    const response = await request('/api/employees',{headers:{authorization:`Bearer ${token}`}});
    assert.equal(response.status,200);
    const rows = await response.json();
    assert.ok(rows.length > 0);
    if (account.role === 'Manager') assert.ok(rows.every(row => row.department === 'Engineering'));
    if (account.role === 'TeamLead') assert.ok(rows.every(row => row.teamName === 'Product Engineering'));
  }
});
test('refresh tokens rotate and replay revokes the token family', async () => {
  const signedIn = await request('/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'admin@test.local',password:'Admin-Test-Password-123'})});
  assert.equal(signedIn.status,200);
  const oldCookie = signedIn.headers.get('set-cookie')?.split(';')[0];
  assert.ok(oldCookie?.startsWith('wfa_refresh='));
  const rotated = await request('/api/auth/refresh',{method:'POST',headers:{cookie:oldCookie}});
  assert.equal(rotated.status,200);
  const newCookie = rotated.headers.get('set-cookie')?.split(';')[0];
  assert.ok(newCookie && newCookie !== oldCookie);
  const replay = await request('/api/auth/refresh',{method:'POST',headers:{cookie:oldCookie}});
  assert.equal(replay.status,401);
});

test('five failed password attempts lock the account temporarily', async () => {
  const adminToken = await login('admin@test.local','Admin-Test-Password-123');
  const created = await request('/api/auth/users',{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${adminToken}`},body:JSON.stringify({email:'locked@test.local',password:'Correct-Password-123',role:'Employee',employeeId:2})});
  assert.equal(created.status,201);
  for (let attempt=0; attempt<5; attempt++) {
    const failed = await request('/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'locked@test.local',password:'Incorrect-Password-123'})});
    assert.equal(failed.status,401);
  }
  const locked = await request('/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'locked@test.local',password:'Correct-Password-123'})});
  assert.equal(locked.status,423);
});
