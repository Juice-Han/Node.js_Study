const express = require('express')
const order = require('./router/order.js')
const app = express();

app.use(express.json());

app.listen(8080, () => {
    console.log('8080 포트에서 서버 실행중')
})

app.use('/order',order);

