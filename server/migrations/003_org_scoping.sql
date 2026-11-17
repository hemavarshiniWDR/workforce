-- Add organizational scope metadata without replacing existing workforce tables.
ALTER TABLE employees ADD COLUMN team_name TEXT NOT NULL DEFAULT 'General';
UPDATE employees SET team_name = CASE
  WHEN department_id IN (SELECT id FROM departments WHERE name = 'Engineering') THEN CASE WHEN id % 2 = 0 THEN 'Platform' ELSE 'Product Engineering' END
  WHEN department_id IN (SELECT id FROM departments WHERE name = 'Sales') THEN 'Sales'
  WHEN department_id IN (SELECT id FROM departments WHERE name = 'Operations') THEN 'Operations'
  WHEN department_id IN (SELECT id FROM departments WHERE name = 'HR') THEN 'People'
  ELSE 'General' END;
CREATE INDEX IF NOT EXISTS idx_employees_team ON employees(department_id, team_name);
