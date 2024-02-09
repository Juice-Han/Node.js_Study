const {MongoClient} = require('mongodb');
const uri = 'mongodb+srv://admin:admin1234@cluster0.uyhgcoc.mongodb.net/?retryWrites=true&w=majority'

module.exports = function(callback){
    return MongoClient.connect(uri, callback);
}