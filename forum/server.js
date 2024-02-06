const express = require('express');
const app = express();
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { MongoClient, ObjectId } = require('mongodb')

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
    let result = await db.collection('post').find().limit(5).toArray()
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
    try {
        if (request.body.title === '') {
            response.send('제목을 입력해주세요')
        } else {
            await db.collection('post').insertOne({ title: request.body.title, content: request.body.content })
            response.redirect('/list')
        }
    } catch (e) {
        console.log(e)
        response.status(500).send('서버에러')
    }

})

app.get('/write2', (request, response) => {
    response.render('write2.ejs')
})

app.post('/add2', async (request, response) => {
    try {
        if (request.body.name === '') {
            response.send('이름을 입력해주세요')
        } else if (request.body.number === '') {
            response.send('번호를 입력해주세요')
        } else if (request.body.name === '' && request.body.number === '') {
            response.send('내용을 입력해주세요')
        } else {
            await db.collection('post2').insertOne({ name: request.body.name, number: request.body.number })
            console.log('db 입력 성공')
        }

    } catch (e) {
        console.log(e)
    }
    response.redirect('/list')
})

app.get('/detail/:id', async (request, response) => {
    let id = request.params
    try {
        let result = await db.collection('post').findOne({ _id: new ObjectId(id) })
        if(result == null){
            response.status(404).send('데이터가 존재하지 않습니다.')    
        }
        response.render('detail.ejs', { data: result })
    } catch (e) {
        response.status(404).send('데이터가 존재하지 않습니다.')
    }

})
app.get('/rewrite/:id', async (request, response) => {
    let id = request.params
    try{
        let data = await db.collection('post').findOne({_id: new ObjectId(id)})
        response.render('rewrite.ejs', {data: data})
    }catch(e){
        response.status(500).send('오류가 발생했습니다.')
    }
    
})
app.put('/rewrite/:id', async (request, response) => {
    let id = request.params
    try{
        if(request.body.title === '' || request.body.content === ''){
            response.send('데이터를 모두 입력해주세요')
        }
        let result = await db.collection('post').updateOne({_id : new ObjectId(id)},{$set: {title: request.body.title, content: request.body.content}})
        console.log(result)
        response.redirect('/list')
    }catch(e){
        response.status(500).send('오류가 발생했습니다.')
    }
})

app.get('/increase', async (request, response) => {
    await db.collection('post').updateMany({_id: {$lt : 2}}, {$inc : {like : 2}})
    console.log('2 상승')
})

app.delete('/post', async (request, response) => {
    try{
        let result = await db.collection('post').deleteOne({_id: new ObjectId(request.query.id)})
        response.send('삭제완료')
        console.log(result)
    }catch(e){
        response.send('오류가 발생했습니다.')
    }
})


app.get('/list/next/:id', async (req, res) => {
    // let start = (parseInt(req.params.number)  - 1)* 5
    let result = await db.collection('post').find({_id : { $gt : new ObjectId(req.params.id)}}).limit(5).toArray()
    res.render('list.ejs', { posts: result })
})


app.get('*',(request, response) => {
    response.status(404).send('페이지가 존재하지 않습니다.')
})