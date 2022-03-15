-- View All Departments
SELECT * FROM department;

-- View All Roles
SELECT role.id AS id, role.title as title, department.name AS department, role.salary AS salary
FROM role
JOIN department ON role.department_id = department.id
ORDER BY id;

-- -- View All Employees
SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(employee.first_name, " ", employee.last_name) AS manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;

-- Use INSERT INTO for adding departments, roles, employees

-- UPDATE for changing employee role
UPDATE employee SET role_id = 3 WHERE id = 3;