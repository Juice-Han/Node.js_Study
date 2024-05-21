const express = require('express')
const mysql = require('mysql2')
const app = express();

app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'likelionuser',
    password: 'likelionpw',
    database: 'likelion'
});

app.listen(8080, () => {
    console.log('listening on 8080')
})

app.get('/', (req, res) => {
    connection.query('SELECT * FROM user', (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: '서버 오류' })
        }
        return res.status(200).json({ rows: results })
    });
})

app.post('/user', (req, res) => {
    const { id, password, name } = req.body
    // 중복되는 아이디 확인
    connection.query('select name from user where id=?', [id], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: '서버 오류' })
        }
        if (results.length !== 0) return res.status(400).json({ message: '아이디 중복' })
        // 만약 중복되는 아이디가 없을 경우 사용자 계정 생성
        connection.query('insert into user (id,password,name) values(?,?,?)', [id, password, name], (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: '서버 오류' })
            }
            return res.status(201).json({ message: '계정 생성 성공' })
        })
    })
})

app.post('/login', (req, res) => {
    const { id, password } = req.body
    // 로그인 계정 확인
    connection.query('select name from user where id=? and password=?', [id, password], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: '서버 오류' })
        }
        if(results.length === 0) {
            return res.status(400).json({ message: '로그인 실패' }) // 전달받은 아이디와 비밀번호에 매칭되는 계정이 존재하지 않는 경우
        }
        return res.status(200).json({ message: '로그인 성공' })
    })
})