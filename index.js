const inquirer = require('inquirer');
const { selectAll, addData, updateEmployee, closeConnection } = require('./utils/queries');
const { table } = require('table'); // used to display the data in a nice table

// available choices when application is launched
const choices = [ 
    'View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a department', 
    'Add a role', 
    'Add an employee', 
    'Update an employee role',
    'Exit'
];

// this function runs first and asks the user what they would like to do and takes their answer and passes it to reviewUserAction
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
            reviewUserAction(res.action);
        });
    }

// this function takes the user's input andd decides which function to call using switch
const reviewUserAction = action => {
    const tableName = action.split(' ')[2]; //extracts the table name from the user's choice
    switch(action) {
        // these are choices where the fuction will run 'SELCT * from tableName'
        case choices[0]:
        case choices[1]:
        case choices[2]:
            selectAll(tableName)
            .then( data => renderAndRestart(data));
            break;
        // these are the choices were data is being added
        case choices[3]:
        case choices[4]:
        case choices[5]:    
            addData(tableName)
            .then( data => renderAndRestart(data));
            break;
        // this choice is to update the employee role
        case choices[6]:
            updateEmployee()
            .then( data => renderAndRestart(data));
            break;
        // this allows the user to exit out of the application
        case choices[7]:
            closeConnection();
            break;
    }
};

// this function renders the data in a nice table and then restarts the application
const renderAndRestart = data => {
    console.log(table(data));
    init();
};

init();


