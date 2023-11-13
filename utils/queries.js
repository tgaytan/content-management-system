const inquirer = require('inquirer');
const mysql = require('mysql2');

// starting db connection
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log('Connected to the company_db database from selectAll.js')
);

// this function checks which table the user wants to perform a 'SELECT *' on
const selectAll = table => {
    switch(table) {
        case "departments":
            return selectAllDepartment();
            break;
        case "roles":
            return selectAllRole();
            break;
        case "employees":
            return selectAllEmployee();
            break;
    }
};

// this function checks which table the user wants to add data to
const addData = table => {
    switch(table) {
        case "department":
            return addDepartment();
            break;
        case "role":
            return addRole();
            break;
        case "employee":
            return addEmployee();
            break;
    }
};

// select * from department
const selectAllDepartment = () => {
    return db.promise().query('SELECT * FROM department')
    .then( ([rows,columns]) => {
        const columnNames = columns.map(column => column.name);
        const rowsArray = rows.map(row => [row.id, row.name]);
        const allData = [columnNames].concat(rowsArray);
        return allData; // the data was combined into an array so it can be rendered with the 'table' package
    })
    .catch(console.log);
}

// select * from role
const selectAllRole = () => {
    return db.promise().query('SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id=department.id')
    .then( ([rows,columns]) => {
        console.log(rows);
        const columnNames = columns.map(column => column.name);
        const rowsArray = rows.map(row => [row.id, row.title, row.department, row.salary]);
        const allData = [columnNames].concat(rowsArray);
        return allData; // the data was combined into an array so it can be rendered with the 'table' package
    })
    .catch(console.log);
}

// select * from employee
const selectAllEmployee = () => {
    return db.promise().query('SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, mang.first_name AS mang_first_name, mang.last_name AS mang_last_name FROM employee emp INNER JOIN role ON emp.role_id=role.id INNER JOIN employee mang ON emp.manager_id=mang.id INNER JOIN department ON role.department_ID=department.id')
    .then( ([rows,columns]) => {
        const columnNames = columns.map(column => column.name);
        const rowsArray = rows.map(row => [row.id, row.first_name, row.last_name, row.title, row.department, row.salary, row.mang_first_name, row.mang_last_name]);
        const allData = [columnNames].concat(rowsArray);
        return allData; // the data was combined into an array so it can be rendered with the 'table' package
    })
    .catch(console.log);
}

// adds a new department and then displays entire dept table again
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
        .catch(console.log);
    })
};

// adds a new role and displays entire role table
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
    });
};

// adds a new employee and then displays the employee table
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
    });
};

// updates a role for an employee
const updateEmployee = () => {
    return selectAllEmployee()
    .then( rows => {
        rows.shift();
        const names = rows.map( data => `${data[1]} ${data[2]}`);
        return names;
    })
    .then( names => {
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
            return db.promise().query('UPDATE employee SET role_id = ? WHERE first_name=? AND last_name=?', [res.role, firstName, lastName])
            .then( (res, err) => {
                console.log('update successful');
                return selectAllEmployee();
            });
        });
    });
};

// closes db connection
const closeConnection = () => db.end();


module.exports = { selectAll, addData, updateEmployee, closeConnection };