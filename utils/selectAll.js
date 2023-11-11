// const express = require('express');
const mysql = require('mysql2');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log('Connected to the company_db database')
);

const selectAllDeparment = () => {
    db.promise().query('SELECT * FROM department')
    .then( ([rows,columns]) => {
        console.log(rows);
    })
    .catch(console.log)
    .then( () => db.end());
}

const selectAllRole = () => {
    db.promise().query('SELECT * FROM role')
    .then( ([rows,columns]) => {
        console.log(rows);
    })
    .catch(console.log)
    .then( () => db.end());
}

const selectAllEmployee = () => {
    db.promise().query('SELECT * FROM employee')
    .then( ([rows,columns]) => {
        console.log(rows);
    })
    .catch(console.log)
    .then( () => db.end());
}

// db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

// db.query('SELECT * FROM department', (err, results) => {
//     console.log(results);
// });

module.exports = { selectAllDeparment, selectAllRole, selectAllEmployee };