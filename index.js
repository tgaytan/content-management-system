const inquirer = require('inquirer');
// const init = require('./utils/init');
const { selectAllDeparment, selectAllRole, selectAllEmployee, addDepartment, addRole, addEmployee } = require('./utils/queries');
// const { addDepartment } = require('./utils/insertRow');

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
            // const table = res.action.split(' ')[2]; //extracts the table name from the user's choice
            // console.log(table);
            // selectAll(table);
            selectAllEmployee();
            break;
        case choices[3]:
            addDepartment();
            break;
        case choices[4]:
            addRole();
            break;
        case choices[5]:
            addEmployee();
            break
    }
};

init();


