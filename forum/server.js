const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://admin:admin1234@cluster0.uyhgcoc.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client) => {
    console.log('DB연결성공')
    db = client.db('forum')
    app.listen(8080, () => {
        console.log('http://localhost:8080에서 서버 실행 중');
    })
}).catch((err) => {
    console.log(err)
})


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/users', (request, response) => {
    response.sendFile(__dirname + '/about.html');
})

app.get('/list', async (request, response) => {
    let result = await db.collection('post').find().toArray()
    response.render('list.ejs', { posts: result })
})

app.get('/time', (request, response) => {
    let time = new Date()
    response.render('time.ejs', { time: time })
})

app.get('/write', (request, response) => {
    response.render('write.ejs')
})

app.post('/add', async (request, response) => {
    try{
        if (request.body.title === '') {
            response.send('제목을 입력해주세요')
        } else {
            await db.collection('post').insertOne({ title: request.body.title, content: request.body.content })
            response.redirect('/list')
        }
    }catch(e){
        console.log(e)
        response.status(500).send('서버에러')
    }
    
})