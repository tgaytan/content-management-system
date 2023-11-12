// const express = require('express');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

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

const selectAllDeparment = () => {
    db.promise().query('SELECT * FROM department')
    .then( ([rows,columns]) => {
        console.log(rows);
        return rows;
    })
    .catch(console.log)
    .then( () => db.end());
}

const selectAllRole = () => {
    db.promise().query('SELECT * FROM role')
    .then( ([rows,columns]) => {
        console.log(rows);
        return rows;
    })
    .catch(console.log)
    .then( () => db.end());
}

const selectAllEmployee = () => {
    return db.promise().query('SELECT * FROM employee')
    .then( ([rows,columns]) => {
        console.log(rows);
        return rows;
    })
    .catch(console.log)
    .then( (rows) => {
        // db.end();
        return rows;
    });
}

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

const addRole = () => {
    inquirer
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
        db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [res.title, res.salary, res.department])
        .then( res => {
            console.log('data inserted successfully');
        })
        .catch(console.log)
        .then( () => selectAllRole());
    });
};

const addEmployee = () => {
    inquirer
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
        db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.role, res.manager])
        .then( res => {
            console.log('data inserted successfully');
        })
        .catch(console.log)
        .then( () => selectAllEmployee());
    });
};

const updateEmployee = () => {
    selectAllEmployee()
    .then( rows => {
        console.log('------------');
        const names = rows.map( data => `${data.first_name} ${data.last_name}`)
        // console.log(names);
        return names;
    })
    .then( names => {
        // console.log(names);
        inquirer
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
            db.promise().query('UPDATE employee SET role_id = ? WHERE first_name=? AND last_name=?', [res.role, firstName, lastName])
            .then( (res, err) => {
                console.log('update successful');
                selectAllEmployee();
            });
        });
    });
};



// db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

// db.query('SELECT * FROM department', (err, results) => {
//     console.log(results);
// });

module.exports = { selectAllDeparment, selectAllRole, selectAllEmployee, addDepartment, addRole, addEmployee, updateEmployee };