const express = require('express');
const app = express();
const gameRouter = require('./router/game');
const db = require('./db/db');

db.connect();

app.use(express.json());
app.use('/game',gameRouter);

app.listen(8080,()=>{
    console.log('Listening on 8080');
})