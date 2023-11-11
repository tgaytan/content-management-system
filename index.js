const inquirer = require('inquirer');
const { selectAllDeparment, selectAllRole, selectAllEmployee } = require('./utils/selectAll');

const choices = [ 
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a deparment', 
    'Add a role', 
    'Add an employee', 
    'Update an employee role'
];

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
        console.log(`You chose ${res.action}`);
        switch(res.action) {
            case choices[0]:
                selectAllDeparment();
                break;
            case choices[1]:
                selectAllRole();
                break;
            case choices[2]:
                // const table = res.action.split(' ')[2]; //extracts the table name from the user's choice
                // console.log(table);
                // selectAll(table);
                selectAllEmployee();
                break;
        }
    });