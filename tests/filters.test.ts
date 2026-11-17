import { describe, expect, it } from 'vitest';
import { filterEmployees } from '../src/utils/filterEmployees';
import type { Employee } from '../src/types/dashboard';

const employees: Employee[] = [
  { id: 1, name: 'Anita Rao', role: 'Developer', department: 'Engineering', location: 'Chennai', status: 'Present', avatar: '' },
  { id: 2, name: 'Bala Kumar', role: 'Designer', department: 'Design', location: 'Bengaluru', status: 'Remote', avatar: '', email: 'bala@example.com' },
  { id: 3, name: 'Chitra Devi', role: 'HR Executive', department: 'HR', location: 'Chennai', status: 'On Leave', avatar: '' },
];

describe('employee dashboard filters', () => {
  it('returns all employees when every filter is All', () => {
    expect(filterEmployees(employees, { department: 'All', location: 'All', status: 'All' })).toHaveLength(3);
  });

  it('combines department, location and status filters', () => {
    expect(filterEmployees(employees, { department: 'Engineering', location: 'Chennai', status: 'Present' }).map((e) => e.id)).toEqual([1]);
  });

  it('searches employee names and email addresses case-insensitively', () => {
    expect(filterEmployees(employees, { search: 'BALA@EXAMPLE.COM' }).map((e) => e.id)).toEqual([2]);
    expect(filterEmployees(employees, { search: 'chitra' }).map((e) => e.id)).toEqual([3]);
  });

  it('does not mutate the source employee list', () => {
    const original = [...employees];
    filterEmployees(employees, { status: 'Present' });
    expect(employees).toEqual(original);
  });
});
