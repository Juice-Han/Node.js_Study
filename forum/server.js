const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => {
    console.log('http://localhost:8080에서 서버 실행 중');
})

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/news', (request, response) => {
    response.send('뉴스페이지');
})

app.get('/users', (request, response) => {
    response.sendFile(__dirname + '/about.html');
})