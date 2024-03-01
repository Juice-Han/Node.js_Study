const { MongoClient} = require('mongodb');
require('dotenv').config();

const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_LOGIN}@cluster0.uyhgcoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

async function connectDB(callback){
    try{
        await client.connect();
        console.log('mongoDB 연결')
        db = client.db("board");
        callback();
    }catch(err){
        console.error(err);
    }
}

module.exports = {connectDB, client};