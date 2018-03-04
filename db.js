const uri = 'mongodb://localhost:27017/test2'

const MongoClient = require('mongodb').MongoClient

const findUsers = (db, callback) => {
    var cursor = db.collection('users')
        .find()
    cursor.each((err, doc) => {
        if(doc != null){
            console.dir(doc)
        } else {
            callback()
        }
    })
}

MongoClient.connect(uri, (err, db) => {
    if (err) throw err;
    var dbo = db.db("test2");
    findUsers(dbo, () => { db.close() })
})