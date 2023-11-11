const inquirer = require('inquirer');

const choices = [ 
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a deparment', 
    'Add a role', 
    'Add an employee', 
    'Update an employee role'
];

const init = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: choices
        }
    ])
    .then(res => res);
}

module.exports = init;