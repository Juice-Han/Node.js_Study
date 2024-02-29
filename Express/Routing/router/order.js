const express = require('express');
const router = express.Router();

const orderList = []

router.get('/',(req,res)=>{
    res.send(orderList);    
})

router.post('/', (req,res) => {
    orderList.push(req.body);
    res.send('주문 생성');
})

module.exports = router