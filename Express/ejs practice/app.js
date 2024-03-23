const express = require('express')
const app = express();
const path = require('path');
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(8080, () => {
    console.log('Listening on 8080');
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/page1', (req, res) => {
    res.render('page1');
})
app.get('/page2', (req, res) => {
    res.render('page2');
})
