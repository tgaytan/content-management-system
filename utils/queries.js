// const express = require('express');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const { table } = require('table');
const inquirer = require('inquirer');

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log('Connected to the company_db database from selectAll.js')
);

const selectAllDepartment = () => {
    return db.promise().query('SELECT * FROM department')
    .then( ([rows,columns]) => {
        // console.log(rows[0]);
        // console.log(columns[0]);
        // rows.forEach(row => console.log(row));
        // columns.forEach(column => console.log(column));
        // console.log(columnNames);
        // console.log(allRows);
        const columnNames = columns.map(column => column.name);
        const rowsArray = rows.map(row => [row.id, row.name]);
        const allData = [columnNames].concat(rowsArray);
        // console.log(table(allData));
        return allData;
    })
    .catch(console.log);
    // .then( () => db.end());
}

const selectAllRole = () => {
    return db.promise().query('SELECT * FROM role')
    .then( ([rows,columns]) => {
        // console.log(rows);
        // return rows;

        const columnNames = columns.map(column => column.name);
        const rowsArray = rows.map(row => [row.id, row.title, row.salary, row.department_id]);
        const allData = [columnNames].concat(rowsArray);
        // console.log(table(allData));
        return allData;
    })
    .catch(console.log);
    // .then( () => db.end());
}

const selectAllEmployee = () => {
    return db.promise().query('SELECT * FROM employee')
    .then( ([rows,columns]) => {
        const columnNames = columns.map(column => column.name);
        const rowsArray = rows.map(row => [row.id, row.first_name, row.last_name, row.role_id, row.manager_id]);
        const allData = [columnNames].concat(rowsArray);
        return allData;
        // console.log(rows);
        // return rows;
    })
    .catch(console.log);
    // .then( (rows) => {
    //     // db.end();
    //     return rows;
    // });
}

const addDepartment = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            message: 'Type a department name',
            name: 'department'
        }
    ])
    .then(res => {
        return db.promise().query('INSERT INTO department (name) VALUES (?)', res.department)
        .then( () => selectAllDepartment())
            // console.log(`these are the ${columns}`);
            // console.log(Object.getOwnPropertyNames(rows));
        .catch(console.log);
        // .then( () => db.end());
    })
};

const addRole = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            message: 'Type a title',
            name: 'title'
        },
        {
            type: 'number',
            message: 'Type a salary',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Which department is this role for?',
            name: 'department'
        }
    ])
    .then(res => {
        return db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [res.title, res.salary, res.department])
        .then( () => selectAllRole())
        .catch(console.log);
        // .then( () => selectAllRole());
    });
};

const addEmployee = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            message: 'enter first name',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'enter last name',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Enter their role',
            name: 'role'
        },
        {
            type: 'input',
            message: 'who is their manager?',
            name: 'manager'
        }
    ])
    .then( res => {
        return db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.role, res.manager])
        .then( () => selectAllEmployee())
        .catch(console.log);
        // .then( () => selectAllEmployee());
    });
};

const updateEmployee = () => {
    return selectAllEmployee()
    .then( rows => {
        // console.log('------------');
        // console.log(rows);
        // console.log(rows.shift());
        rows.shift();
        const names = rows.map( data => `${data[1]} ${data[2]}`)
        // console.log(names);
        return names;
    })
    .then( names => {
        // console.log(names);
        return inquirer
        .prompt([
            {
                type: 'list',
                choices: names,
                message: 'Which employee?',
                name: 'employee'
            },
            {
                type: 'numer',
                message: 'what is their new role?',
                name: 'role'
            }
        ])
        .then(res => {
            const firstName = res.employee.split(' ')[0];
            const lastName = res.employee.split(' ')[1];
            // console.log(firstName, 'test', lastName);
            // console.log(res.employee, res.role);
            return db.promise().query('UPDATE employee SET role_id = ? WHERE first_name=? AND last_name=?', [res.role, firstName, lastName])
            .then( (res, err) => {
                console.log('update successful');
                return selectAllEmployee();
            });
        });
    });
};

const closeConnection = () => db.end();



// db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

// db.query('SELECT * FROM department', (err, results) => {
//     console.log(results);
// });

module.exports = { selectAllDepartment, selectAllRole, selectAllEmployee, addDepartment, addRole, addEmployee, updateEmployee, closeConnection };