const express = require('express');
const { ObjectId } = require('mongodb');
const { client } = require('../config/mongodb.js');
const router = express.Router();

const db = client.db('board');

/**
 * @swagger
 * tags:
 *   name: Board
 *   description: 게시글 작성 api
 */
/**
 * @swagger
 * paths:
 *  /board/posts:
 *    get:
 *      summary: "게시글 전체 목록 조회"
 *      description: "게시글 목록을 가져온다."
 *      tags: [Board]
 *      responses:
 *        "200":
 *          description: 전체 게시글 목록
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    posts:
 *                      type: object
 *                      example: 
 *                          [
 *                            { "_id": "1234567", "title": "test1", "content": "test1" },
 *                            { "_id": "2345678", "title": "test2", "content": "test2" },
 *                            { "_id": "3456789", "title": "test3", "content": "test3" },
 *                          ]
 *                    message:
 *                      type: string
 *                      example:
 *                          "정상적으로 데이터를 불러왔습니다."
 *                          
 */
router.get('/posts', async (req, res) => {
    const posts = await db.collection('posts').find().toArray();
    return res.status(200).json({ posts: posts, message: '정상적으로 데이터를 불러왔습니다.' });
})

router.post('/posts', async (req, res) => {
    if (!req.session.is_login) {
        return res.status(401).send({ message: '로그인을 한 후 이용해주세요.' });
    }
    const post = req.body;
    if (!post.title || !post.content) {
        return res.status(400).json({ message: "필수 입력 사항을 입력하세요." });
    }
    const result = await db.collection('posts').insertOne({ title: post.title, content: post.content });
    if (result.acknowledged === false) {
        return res.status(500).json({ message: '데이터베이스에 글이 저장되지 않았습니다.' });
    }
    return res.status(201).json({ message: '정상적으로 글이 작성되었습니다.' });
})

router.get('/posts/:id', async (req, res) => {
    const filter = { _id: new ObjectId(req.params.id) };
    const post = await db.collection('posts').findOne(filter);
    if (!post) {
        return res.status(400).json({ message: '해당하는 데이터가 존재하지 않습니다.' });
    }
    return res.status(200).json({ post: post, message: '정상적으로 데이터를 불러왔습니다.' });
})

router.patch('/posts/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: "필수 입력 사항을 입력하세요." });
    }
    const updateDoc = { $set: { title: req.body.title, content: req.body.content } };
    const result = await db.collection('posts').updateOne(query, updateDoc);
    if (result.modifiedCount !== 1) {
        return res.status(500).json({ message: '데이터베이스에 변경사항이 저장되지 않았습니다.' });
    }
    return res.status(200).json({ message: '정상적으로 수정되었습니다.' });
})

router.delete('/posts/:id', async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await db.collection('posts').deleteOne(query);
    if (result.deletedCount !== 1) {
        return res.status(400).json({ message: '해당하는 데이터가 존재하지 않습니다.' });

    }
    return res.status(200).json({ message: '데이터가 정상적으로 삭제되었습니다.' });
})

module.exports = router