import type { Employee } from '../types/dashboard';

export interface EmployeeFilters {
  department?: string;
  location?: string;
  status?: string;
  search?: string;
}

/** Apply dashboard filters consistently; "All" and empty values are treated as no filter. */
export function filterEmployees(employees: Employee[], filters: EmployeeFilters): Employee[] {
  const search = filters.search?.trim().toLocaleLowerCase();
  return employees.filter((employee) => {
    const matchesDepartment = !filters.department || filters.department === 'All' || employee.department === filters.department;
    const matchesLocation = !filters.location || filters.location === 'All' || employee.location === filters.location;
    const matchesStatus = !filters.status || filters.status === 'All' || employee.status === filters.status;
    const matchesSearch = !search || [employee.name, employee.email, employee.role, employee.department, employee.location]
      .some((value) => value?.toLocaleLowerCase().includes(search));
    return matchesDepartment && matchesLocation && matchesStatus && matchesSearch;
  });
}
