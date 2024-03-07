const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const boardRouter = require('./router/board.js');
const userRouter = require('./router/user.js');
const imgRouter = require('./router/img.js');
const { connectDB, client } = require('./config/mongodb.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: MongoStore.create({
        client,
        dbName: 'board-session'
    })
}))
app.use(cookieParser());

connectDB(() => {
    app.listen(8080, () => {
        console.log('8080 포트에서 서버 실행중');
    })
})

app.use('/board', boardRouter);
app.use('/user', userRouter);
app.use('/img', imgRouter);