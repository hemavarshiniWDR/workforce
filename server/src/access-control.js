import db from './db.js';

export function getUserScope(user) {
  if (user.role === 'Admin' || user.role === 'HR') return { kind: 'all' };
  if (user.role === 'Employee') return { kind: 'self', employeeId: user.employee_id ?? null };
  if (!user.employee_id) return { kind: 'none' };
  const employee = db.prepare('SELECT id, department_id, team_name FROM employees WHERE id = ?').get(user.employee_id);
  if (!employee) return { kind: 'none' };
  if (user.role === 'Manager') return { kind: 'department', departmentId: employee.department_id };
  if (user.role === 'TeamLead') return { kind: 'team', departmentId: employee.department_id, teamName: employee.team_name };
  return { kind: 'none' };
}

export function scopeSql(scope, alias = 'e') {
  if (scope.kind === 'all') return { sql: '', params: [] };
  if (scope.kind === 'self') return scope.employeeId ? { sql: ` AND ${alias}.id = ?`, params: [scope.employeeId] } : { sql: ' AND 1 = 0', params: [] };
  if (scope.kind === 'department') return { sql: ` AND ${alias}.department_id = ?`, params: [scope.departmentId] };
  if (scope.kind === 'team') return { sql: ` AND ${alias}.department_id = ? AND ${alias}.team_name = ?`, params: [scope.departmentId, scope.teamName] };
  return { sql: ' AND 1 = 0', params: [] };
}
