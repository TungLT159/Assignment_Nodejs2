const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const mongoConnect = (callback) => {
    MongoClient
        .connect('mongodb+srv://tunglt:dvalvuumm1ty1@cluster0.5hjpvkp.mongodb.net/?retryWrites=true&w=majority')
        .then(clinet => {
            console.log('Connected')
            callback(clinet)
        })
        .catch(err => console.log(err))
}

module.exports = mongoConnect