import express from 'express'
const app = express()

app.listen(8080, ()=>{
    console.log('8080 포트에서 서버 실행중')
})

app.get('/',(req,res) => {
    res.send('Hello World!')
})