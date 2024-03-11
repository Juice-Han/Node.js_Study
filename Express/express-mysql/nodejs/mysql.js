var mysql = require('mysql2');
require('dotenv').config();
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: process.env.MYSQL_PASSWORD,
    database: 'nodetutorial'
});

connection.connect();

connection.query('SELECT * FROM topic', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});

connection.end();