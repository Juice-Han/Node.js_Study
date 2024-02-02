const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://admin:admin1234@cluster0.mpunoid.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
  app.listen(8080, () => {
    console.log('http://localhost:8080에서 서버 실행 중');
})
}).catch((err)=>{
  console.log(err)
})


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/news', (request, response) => {
    db.collection('post').insertOne({title: 'first'});
    // response.send('뉴스페이지');
})

app.get('/users', (request, response) => {
    response.sendFile(__dirname + '/about.html');
})