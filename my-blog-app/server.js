import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

const app = express();

//mongoDB와 연동
const client = new MongoClient("mongodb+srv://admin:admin1234@cluster0.uyhgcoc.mongodb.net/?retryWrites=true&w=majority", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
let db;
const connectMongoDB = async () => {
    try {
        await client.connect();
        db = client.db('my-blog-app');
        console.log("DB 연동완료")
        app.listen(8080, () => {
            console.log('8080 포트에서 서버 실행중')
        })
    } catch (e) {
        console.error(e);
    }
}
connectMongoDB();

//ES module에선 __dirname을 그냥 사용할 수 없고 import.meta.url을 통해 변환해야 됨
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(express.static(path.join(__dirname, '/dist')))
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})


app.get('/post', async (req, res) => {
    try {
        let data = await db.collection('posts').find().toArray();
        res.json(data);
    } catch (e) {
        console.log(e);
    }
})

app.post('/post', (req, res) => {
    try {
        db.collection('posts').insertOne({ title: req.body.title, content: req.body.content })
        res.status(200).end();
    } catch (e) {
        console.log(e)
    }
})

app.get('/post/:id', async (req, res) => {
    try {
        let data = await db.collection('posts').findOne({ _id: new ObjectId(req.params.id) })
        res.status(200).send({ title: data.title, content: data.content });
    } catch (e) {
        console.log(e);
        res.status(404).send('값을 찾을 수 없습니다.')
    }
})

app.patch('/post/:id', async (req, res) => {
    let id = req.params.id
    try {
        await db.collection('posts').updateOne({ _id: new ObjectId(id) }, { $set: { title: req.body.title, content: req.body.content } })
        res.status(200).send('업데이트 완료');
    } catch (e) {
        console.log(e);
        res.status(404).send('값을 찾을 수 없습니다.');
    }
})

app.delete('/post/:id', async(req,res)=> {
    let id = req.params.id
    try{
        await db.collection('posts').deleteOne({_id : new ObjectId(id)})
        res.status(200).send('삭제 완료')
    }catch(e){
        console.log(e)
        res.status(404).send('값을 찾을 수 없습니다.')
    }
})

//리액트에게 라우팅 전권을 부여
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})