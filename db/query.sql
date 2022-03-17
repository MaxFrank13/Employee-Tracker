-- View All Departments
SELECT * FROM department;

-- View All Roles
SELECT role.id AS id, role.title as title, department.name AS department, role.salary AS salary
FROM role
JOIN department ON role.department_id = department.id
ORDER BY id;

-- -- View All Employees
SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(m.first_name, ' ', m.last_name) AS manager 
FROM employee e 
LEFT JOIN role ON e.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id 
LEFT JOIN employee m ON e.manager_id = m.id;

