const inquirer = require('inquirer');
// const init = require('./utils/init');
const { selectAllDeparment, selectAllRole, selectAllEmployee } = require('./utils/selectAll');

const choices = [ 
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a deparment', 
    'Add a role', 
    'Add an employee', 
    'Update an employee role',
    'Exit'
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
        .then(res => {
            // console.log(`You chose ${res.action}`);
            reviewUserAction(res.action);
        });
    }

const reviewUserAction = action => {
    switch(action) {
        case choices[0]:
            selectAllDeparment();
            break;
        case choices[1]:
            selectAllRole();
            break;
        case choices[2]:
            selectAllEmployee();
            break;
    }
};

init();


