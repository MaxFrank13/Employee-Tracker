// Import Dependencies
const cTable = require('console.table');
const res = require('express/lib/response');
const inquirer = require('inquirer');
const mysql = require('mysql2');
let sql; // global sql string variable

// Import questions
const { main, addDpt, addRole, addEmployee, updateEmployee } = require('./src/prompts');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);

const init = () => {
    inquirer
        .prompt(main)
        .then(({main}) => promptLoop(main))
        .catch(error => console.error(error));
};

// Main Prompt Loop
const promptLoop = (input) => {
    switch(input) {
        case "View All Employees":
            sql = "SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department,role.salary AS salary, employee.manager_id AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";
            getTable(sql);
            break;
        case "Add Employee":
            // retrieve array of managers and assign it to 'choices' at index 3 of addEmployee

            inquirer
                .prompt(addEmployee)
                .then(({ firstName, lastName, role, manager }) => {
                    // INSERT INTO employee table
                    init();
                })
            break;
        case "Update Employee Role":
            db.promise().query(`SELECT CONCAT(employee.first_name, " ", employee.last_name) FROM employee`)
                .then( ([data]) => {
                    // get employees & set prompt object with updated list of employees
                    const employees = data.reduce((prev, next) => prev.concat(Object.values(next)), []);
                    updateEmployee[0].choices = employees;
                    inquirer
                        .prompt(updateEmployee)
                        .then(({ updateWho, role }) => {
                            // grab first name for refence in UPDATE query
                            const firstName = updateWho.split(' ')[0];
                            db.promise().query(`SELECT id FROM role WHERE title='${role}'`)
                                .then(([data]) => {
                                    // convert role name to it's ID
                                    const roleId = data[0].id;
                                    db.promise().query(`UPDATE employee SET role_id = ? WHERE first_name = ?`, [roleId, firstName])
                                        .then(() => {
                                            console.log("Employee role has been updated");
                                        })
                                        .catch(console.log)
          
                            init();
                        })
                        .catch(console.log);
                })
                .catch(console.log)
            });
            break;
        case "View All Roles":
            sql = "SELECT role.id AS id, role.title as title, department.name AS department, role.salary AS salary FROM role JOIN department ON role.department_id = department.id ORDER BY id";
            getTable(sql);
            break;
        case "Add Role":
            inquirer
                .prompt(addRole)
                .then(({ role, salary, dpt }) => {
                    db.promise().query(`SELECT id FROM department WHERE name='${dpt}'`)
                        .then(([data]) => {
                            // convert department name to it's ID
                            const dptId = data[0].id;
                            const values = [role, salary, dptId];
                            db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, values)
                                .then(() => {
                                    console.log(`\n Added ${role} to available roles`);
                                })
                                .catch(console.log)
                            init();
                        });
                })
                .catch(err => console.error(err));
            break;
        case "View All Departments":
            sql = "SELECT * FROM department";
            getTable(sql);
            break;
        case "Add Department":
            inquirer
                .prompt(addDpt)
                .then(({ dpt }) => {
                    // INSERT INTO database using prompt response
                    db.promise().query(`INSERT INTO department (name) VALUES (?)`, dpt)
                        .then(() => {
                            console.log(`\n Added ${dpt} to departments`);
                        })
                        .catch(console.log)
                    init();
                })
                .catch(err => console.error(err));
            break;
    }
};

// promisify query with .promise()
const getTable = (sqlString) => {
    db.promise().query(sqlString)
        .then( ([data]) => {
            console.log(`\n`);
            console.table(data);
        })
        .catch(console.log)
    inquirer
        .prompt(main)
        .then(({main}) => promptLoop(main))
        .catch(err => console.error(err));
};

init();