const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

const db = mysql.createPool({
    host: 'localhost',
    user: '201901630user',
    password: '201901630pw',
    database: 'algorithmdb',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
})

app.use(cors())
app.use(express.json())

app.listen(8080, () => {
    console.log('listening on 8080 port')
})

app.get('/user',(req,res)=>{
    db.query('select * from user', (err, rows)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({rows});
    })
})

app.post('/user',(req,res)=>{
    const {id,password,name,phone_num} = req.body;
    db.query('insert into user (id, password, name, phone_num) values(?,?,?,?)',[id,password,name,phone_num],(err,result)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({message: '삽입 성공'})
    })
})

app.put('/user/:user_id',(req,res)=>{
    const user_id = req.params.user_id
    const {id,password,name,phone_num} = req.body
    db.query('update user set id=?, password=?, name=?, phone_num=? where user_id=?',[id,password,name,phone_num,user_id], (err,result)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({message: '수정 성공'})
    })
})

app.delete('/user/:user_id', (req,res)=>{
    const user_id = parseInt(req.params.user_id)
    db.query('delete from user where user_id=?',user_id,(err,result)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({message: '삭제 성공'})
    })
})

app.get('/problem', (req,res)=>{
    db.query('select * from problem', (err, rows)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({rows})
    })
})

app.post('/problem', (req,res)=>{
    const {title, description, difficulty} = req.body
    db.query('insert into problem (title, description, difficulty) values(?, ?, ?)',[title,description,difficulty], (err,result) => {
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({message: '삽입 성공'})
    })
})

app.put('/problem/:problem_num', (req,res)=>{
    const problem_num= req.params.problem_num
    const {title, description, difficulty} = req.body
    db.query('update problem set title=?, description=?, difficulty=? where problem_num=?',[title,description,difficulty,problem_num],(err,result)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({message: '수정 성공'})
    })
})

app.delete('/problem/:problem_num', (req,res)=>{
    const problem_num= req.params.problem_num
    db.query('delete from problem where problem_num=?',problem_num,(err,result)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({message: '삭제 성공'})
    })
})

app.get('/userProblem', (req,res)=>{
    db.query('select * from user_problem', (err, rows)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({rows})
    })
})

app.post('/userProblem', (req,res)=>{
    const {user_id,problem_num,success} = req.body
    db.query('insert into user_problem (user_id, problem_num, success) values(?, ?, ?)',[user_id, problem_num, success], (err,result) => {
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({message: '삽입 성공'})
    })
})

app.put('/userProblem', (req,res)=>{
    const {user_id,problem_num,success} = req.body
    db.query('update user_problem set success=? where user_id=? and problem_num=?',[success,user_id,problem_num],(err,result)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({message: '수정 성공'})
    })
})

app.delete('/userProblem/:user_id/:problem_num', (req,res)=>{
    const user_id = req.params.user_id
    const problem_num = req.params.problem_num
    db.query('delete from user_problem where user_id=? and problem_num=?',[user_id,problem_num],(err,result)=>{
        if(err){
            console.error(err)
            return res.json({message: '서버 오류'})
        }
        return res.json({message: '삭제 성공'})
    })
})