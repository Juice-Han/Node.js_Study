const mysql = require('mysql2');

const db_info = {
    host: "localhost",
    user: "fest",
    password: '1111',
    database: "festival"
};

const db = mysql.createConnection(db_info);

module.exports = db;