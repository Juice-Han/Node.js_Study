const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const boardRouter = require('./router/board.js');
const userRouter = require('./router/user.js');
const { connectDB } = require('./config/mongodb.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}))
app.use(cookieParser());
connectDB(()=>{app.listen(8080, ()=>{
    console.log('8080 포트에서 서버 실행중');
})})

app.use('/board', boardRouter);
app.use('/user', userRouter);