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
}

const promptLoop = (input) => {
    switch(input) {
        case "View All Employees":
            sql = "SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, role.department_id AS department,role.salary AS salary, employee.manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id";
            getTable(sql);
            break;
        case "Add Employee":
            // retrieve array of managers and assign it to 'choices' at index 3 of addEmployee
            inquirer
                .prompt(addEmployee)
                .then(({ firstName, lastName, role, manager }) => {
                    // INSERT INTO employee table
                    promptLoop(main);
                })
            break;
        case "Update Employee Role":
            // retrieve array of employees and assign to choices of updateEmployee
            const updatePrompt = updateEmployee.concat(addRole);
            inquirer
                .prompt(updatePrompt)
                .then(({ updateWho, role }) => {
                    // INSERT INTO or ALTER TABLE on employee
                    promptLoop(main);
                })
            break;
        case "View All Roles":
            sql = "SELECT role.id AS id, role.title as title, department.name AS department, role.salary AS salary FROM role JOIN department ON role.department_id = department.id ORDER BY id";
            getTable(sql);
            break;
        case "Add Role":
            inquirer
            .prompt(addRole)
            .then(({ role }) => {
                // INSERT INTO role table
                promptLoop(main);
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
                    // INSERT INTO department table
                    promptLoop(main);
                })
                .catch(err => console.error(err));
            break;
    }
}

const getTable = (sqlString) => {
    db.query(sqlString, (err, rows) => {
        if (err) {
            res.status(500).json( {error: err.message });
            return;
        }
        console.table(rows);
    })
    inquirer
        .prompt(main)
        .then(({main}) => promptLoop(main))
        .catch(err => console.error(err));
}

init();