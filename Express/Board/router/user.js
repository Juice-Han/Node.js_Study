const router = require('express').Router();
const { client } = require('../config/mongodb.js');

const collection = client.db('board').collection('users')

router.post('/register', async (req, res) => {
    if(!req.body.id || !req.body.password){
        res.json({message: '필수 입력사항을 입력해주세요.'});
        return;
    }
    const user = await collection.findOne({id: req.body.id});
    if(user){
       res.status(400).json({message: '이미 존재하는 id입니다.'});
       return;
    }
    const result = await collection.insertOne(req.body);
    if(!result){
        res.status(500).json({message: '계정을 등록하지 못했습니다.'});
        return;
    }
    res.status(201).json({message: '계정이 생성되었습니다.'});
})

router.post('/login', async (req, res) => {
    if(!req.body.id || !req.body.password){
        res.json({message: '필수 입력사항을 입력해주세요.'});
        return;
    }
    const user = await collection.findOne({id: req.body.id});
    if(!user){
        res.status(400).json({message: '존재하지 않는 아이디입니다.'});
        return;
    }
    if(req.body.password !== user.password){
        res.status(400).json({message: '비밀번호를 다시 입력해주세요.'});
        return;
    }
    req.session.is_login = true;
    res.status(200).json({message: '로그인 성공'});
})

module.exports = router;