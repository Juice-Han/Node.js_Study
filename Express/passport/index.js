const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 8080;

let _ = {};

_.start = () => {
    try {
        app.listen(port);
        console.log(`Express server listening on ${port}`);
    } catch (e) {
        throw new Error(e);
    };
}

app.use(express.json());

passport.use(new LocalStrategy(
    function (username, password, done) {
        // db에서 회원정보 찾는 코드작성하는 곳
        // 회원검증이 완료되었다면 아래 코드 실행
        // return done(null, user);
    }
));

_.start();
