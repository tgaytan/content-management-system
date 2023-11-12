const inquirer = require('inquirer');
// const init = require('./utils/init');
const { selectAllDepartment, selectAllRole, selectAllEmployee, addDepartment, addRole, addEmployee, updateEmployee, closeConnection } = require('./utils/queries');
// const { addDepartment } = require('./utils/insertRow');

const { table } = require('table');

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
            selectAllDepartment()
            .then( data => {
                console.log(table(data));
                init();
            });
            break;
        case choices[1]:
            selectAllRole()
            .then( data => {
                console.log(table(data));
                init();
            });
            break;
        case choices[2]:
            // const table = res.action.split(' ')[2]; //extracts the table name from the user's choice
            // console.log(table);
            // selectAll(table);
            selectAllEmployee()
            .then( data => {
                console.log(table(data));
                init();
            });
            break;
        case choices[3]:
            addDepartment()
            .then( data => {
                console.log(table(data));
                init();
            });
            break;
        case choices[4]:
            addRole()
            .then( data => {
                console.log(table(data));
                init();
            });
            break;
        case choices[5]:
            addEmployee()
            .then( data => {
                console.log(table(data));
                init();
            });
            break;
        case choices[6]:
            updateEmployee()
            .then( data => {
                console.log(table(data));
                init();
            });
            break;
        case choices[7]:
            closeConnection();
            break;
    }
};

init();


