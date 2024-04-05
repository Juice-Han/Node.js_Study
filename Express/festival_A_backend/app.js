const express = require('express');
const app = express();
const gameRouter = require('./router/game');
require('dotenv').config();
const mysql = require('mysql2');

const db_info = {
    host: "localhost",
    user: "fest",
    password: '1111',
    database: "festival"
};

const db = mysql.createConnection(db_info);

app.use('/game',gameRouter);

app.listen(8080,()=>{
    console.log('Listening on 8080');
})