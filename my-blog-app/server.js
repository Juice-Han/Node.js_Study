import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();

//ES module에선 __dirname을 그냥 사용할 수 없고 import.meta.url을 통해 변환해야 됨
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '/dist')))


app.listen(8080, ()=>{
    console.log('8080 포트에서 서버 실행중')
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

//리액트에게 라우팅 전권을 부여
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/dist/index.html'))
})