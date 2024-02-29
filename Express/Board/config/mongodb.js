const { MongoClient} = require('mongodb');

const client = new MongoClient('mongodb+srv://admin:admin1234@cluster0.uyhgcoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

async function connectDB(listen){
    try{
        await client.connect();
        console.log('mongoDB 연결')
        db = client.db("board");
        listen();
    }catch(err){
        console.error(err);
    }
}

module.exports = {connectDB, client};