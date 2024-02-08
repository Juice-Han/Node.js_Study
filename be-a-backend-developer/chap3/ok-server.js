const http = require('http');
const url = require('url')

const server = http.createServer((req, res) => {
    try {
        const path = url.parse(req.url, true).pathname;
        res.setHeader('Content-Type', 'text/html');
        console.log(path);
        if (path in urlMap) {
            urlMap[path](req, res);
        } else {
            notFound(req, res);
        }
    }catch(e){
        console.log(e)
    }
})

const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`);
}
const feed = (req, res) => {
    res.end(`<ul>
    <li>picture1</li>
    <li>picture2</li>
    <li>picture3</li>
    </ul>
    `);
}

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end('404 page not found');
}

const hello = (req, res) => {
    res.end('<h2>hello, my friend!</h2>');
}

const urlMap = {
    '/': (req, res) => res.end("HOME"),
    '/user': user,
    '/feed': feed,
    '/hello': hello,
}

server.listen('3000', () => console.log("라우터!"))