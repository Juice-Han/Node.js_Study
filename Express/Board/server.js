const express = require('express');
const boardRouter = require('./router/board.js');
const userRouter = require('./router/user.js');
const { connectDB } = require('./config/mongodb.js');

const app = express();
app.use(express.json());

connectDB(()=>{app.listen(8080, ()=>{
    console.log('8080 포트에서 서버 실행중');
})})

app.use('/board', boardRouter);
app.use('/user', userRouter);