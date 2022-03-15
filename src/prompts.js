const main = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
    name: 'main'
}

const addDpt = {
    type: 'input',
    message: `What's the name of the new department?`,
    name: 'dpt'
}

const addRole = [
    {
        type: 'input',
        message: `What's the name of the new role?`,
        name: 'role'
    },
    {
        type: 'input',
        message: `What's the salary of the new role?`,
        name: 'salary'
    },
    {
        type: 'input',
        message: `What department is the role part of?`,
        name: 'dpt'
    },
]

const addEmployee = [
    {
        type: 'input',
        message: `What's the new employee's first name?`,
        name: 'firstName'
    },
    {
        type: 'input',
        message: `What's the new employee's last name?`,
        name: 'lastName'
    },
    {
        type: 'list',
        message: 'What is their role?',
        choices: ["Lawyer", "Law Consultant", "Salesperson", "Marketing Lead", "Accountant", "Backend Developer", "Web Developer", "Lead Engineer"],
        name: 'role'
    },
    {
        type: 'list',
        message: `Who is the employee's manager?`,
        choices: ["Bill", "Gandalf", "Bilbo"],
        name: 'manager'
    }
]

const updateEmployee = [
    {
        type: 'list',
        message: `Which employee do you want to update?`,
        choices: ["Bill", "Gandalf", "Bilbo"],
        name: 'updateWho'
    },
    {
        type: 'list',
        message: `What's the name of their new role?`,
        choices: ["Lawyer", "Law Consultant", "Salesperson", "Marketing Lead", "Accountant", "Backend Developer", "Web Developer", "Lead Engineer"],
        name: 'role'
    }
]

module.exports = {
    main,
    addDpt,
    addRole,
    addEmployee,
    updateEmployee
}