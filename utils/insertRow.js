const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log('Connected to the company_db database from insertRow.js')
);

const addDepartment = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Type a department name',
            name: 'newDepartment'
        }
    ])
    .then(res => {
        db.promise().query('INSERT INTO department (name) VALUES (?)', res.newDepartment)
        .then( ([rows,columns]) => {
            console.log(`these are the ${rows}`);
        })
        .catch(console.log)
        .then( () => db.end());
    })
};

module.exports = { addDepartment };