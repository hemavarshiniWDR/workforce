import db from './db.js';
import { scopeSql } from './access-control.js';

function scopedEmployees(scope, filters = {}) {
  let sql = `SELECT e.id,e.name,e.email,e.role,d.name department,e.location,e.status,e.team_name teamName FROM employees e JOIN departments d ON d.id=e.department_id WHERE 1=1`;
  const params = [];
  const scoped = scopeSql(scope, 'e'); sql += scoped.sql; params.push(...scoped.params);
  for (const [value, column] of [[filters.department, 'd.name'], [filters.location, 'e.location'], [filters.status, 'e.status']]) { if (value) { sql += ` AND ${column}=?`; params.push(value); } }
  if (filters.search) { sql += ' AND (e.name LIKE ? OR e.email LIKE ? OR e.role LIKE ?)'; params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`); }
  return { sql, params };
}
export const employeeRepository = {
  list(scope, filters = {}) { const q = scopedEmployees(scope, filters); return db.prepare(q.sql + ' ORDER BY e.name').all(...q.params).map(e => ({ ...e, avatar: e.name.split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase() })); },
  summary(scope) { const q = scopedEmployees(scope); const total = db.prepare(`SELECT COUNT(*) n FROM employees e WHERE 1=1${scopeSql(scope, 'e').sql}`).get(...scopeSql(scope, 'e').params).n; const counts = db.prepare(`SELECT e.status,COUNT(*) n FROM employees e WHERE 1=1${scopeSql(scope, 'e').sql} GROUP BY e.status`).all(...scopeSql(scope, 'e').params); const c = Object.fromEntries(counts.map(x => [x.status, x.n])); const present = (c.Present || 0) + (c.Remote || 0) + (c.Late || 0); return { totalEmployees: total, present, absent: c.Absent || 0, onLeave: c['On Leave'] || 0, attendanceRate: total ? Number((present / total * 100).toFixed(1)) : 0 }; },
  departments(scope) { const sc = scopeSql(scope, 'e'); return db.prepare(`SELECT d.name,COUNT(e.id) employees FROM departments d LEFT JOIN employees e ON e.department_id=d.id${sc.sql} GROUP BY d.id ORDER BY employees DESC`).all(...sc.params).filter(x => x.employees > 0); },
  attendance(scope) { const sc = scopeSql(scope, 'e'); return db.prepare(`SELECT a.attendance_date day,SUM(a.status IN ('Present','Remote')) present,SUM(a.status='Absent') absent,SUM(a.status='Late') late FROM attendance a JOIN employees e ON e.id=a.employee_id WHERE 1=1${sc.sql} GROUP BY a.attendance_date ORDER BY a.attendance_date DESC LIMIT 90`).all(...sc.params).reverse(); },
  profile(employeeId) { return db.prepare(`SELECT e.id,e.name,e.email,e.role,d.name department,e.location,e.status,e.team_name teamName FROM employees e JOIN departments d ON d.id=e.department_id WHERE e.id=?`).get(employeeId); },
  myAttendance(employeeId) { return db.prepare('SELECT attendance_date day,status,check_in checkIn,check_out checkOut FROM attendance WHERE employee_id=? ORDER BY attendance_date DESC LIMIT 90').all(employeeId); },
  recentActivity(scope) { const sc=scopeSql(scope,'e'); return db.prepare(`SELECT e.name,a.attendance_date day,a.status FROM attendance a JOIN employees e ON e.id=a.employee_id WHERE 1=1${sc.sql} ORDER BY a.attendance_date DESC,a.id DESC LIMIT 8`).all(...sc.params).map(row=>({...row,action:'Attendance marked'})); }
};
