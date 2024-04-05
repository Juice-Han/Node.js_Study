const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.get('/try/:id', (req, res) => {
    const id = req.params.id;
    db.query(`SELECT try_count FROM user WHERE user_id=${id}`, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ error: "남은 시도 횟수 조회 실패" });
        }
        else {
            return res.json({ try_count: result[0].try_count, message: "남은 시도 횟수 조회 성공" });
        }
    })
})

router.patch('/try/:id', (req, res) => {
    const id = req.params.id;
    const tryCount = req.body.try_count;
    db.query(`UPDATE user SET try_count=${tryCount} WHERE user_id=${id}`, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ error: "남은 시도 횟수 적용 실패" });
        }
        else {
            return res.json({ message: "남은 시도 횟수 적용 성공" });
        }
    })
})

router.patch('/score', (req,res)=>{
    const {nickname, score} = req.body;
    db.query(`UPDATE user SET score=${score} WHERE nickname="${nickname}"`,(err, result)=>{
        if(err){
            console.error(err);
            return res.json({error: "점수 저장 오류"});
        }
        else{
            return res.json({message: "점수 저장 성공"});
        }
    })
})


module.exports = router;