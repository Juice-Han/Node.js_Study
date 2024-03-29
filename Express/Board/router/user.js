const router = require('express').Router();
const bcrypt = require('bcrypt');
const { client } = require('../config/mongodb.js');

const collection = client.db('board').collection('users')

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 회원 관련 기능 api
 */
router.post('/register', async (req, res) => {
    if (!req.body.id || !req.body.password) {
        return res.status(400).json({ message: '필수 입력사항을 입력해주세요.' });
    }
    const user = await collection.findOne({ id: req.body.id });
    if (user) {
        return res.status(400).json({ message: '이미 존재하는 id입니다.' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const result = await collection.insertOne({id: req.body.id, password: hash});
    if (!result) {
        return res.status(500).json({ message: '계정을 등록하지 못했습니다.' });
    }
    return res.status(201).json({ message: '계정이 생성되었습니다.' });
})

router.post('/login', async (req, res) => {
    if (req.session.is_login) {
        return res.status(400).json({ message: '정상적인 접근이 아닙니다.' })
    }
    if (!req.body.id || !req.body.password) {
        return res.status(400).json({ message: '필수 입력사항을 입력해주세요.' });
    }
    const user = await collection.findOne({ id: req.body.id });
    if (!user) {
        return res.status(400).json({ message: '존재하지 않는 아이디입니다.' });
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: '비밀번호를 다시 입력해주세요.' });
    }
    req.session.is_login = true;
    return res.status(200).json({ message: '로그인 성공' });
})

router.post('/logout', async (req, res) => {
    if (!req.session.is_login) {
        return res.status(401).json({ message: '정상적인 접근이 아닙니다.' });
    }
    req.session.destroy();
    return res.status(200).json({ message: '로그아웃 되었습니다.' });
})

module.exports = router;