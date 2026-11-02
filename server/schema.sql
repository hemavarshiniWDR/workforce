PRAGMA foreign_keys = ON;
CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE employees (
 id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
 role TEXT NOT NULL, department_id INTEGER NOT NULL REFERENCES departments(id),
 location TEXT NOT NULL,
 status TEXT NOT NULL CHECK(status IN ('Present','Absent','On Leave','Remote','Late')),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE attendance (
 id INTEGER PRIMARY KEY, employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
 attendance_date TEXT NOT NULL, status TEXT NOT NULL, check_in TEXT, check_out TEXT,
 UNIQUE(employee_id, attendance_date)
);
CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
