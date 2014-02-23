var dbConfig = require('./config')
var mongoose = require('mongoose')
var db = mongoose.connection;

mongoose.connect(dbConfig)
db.once('open', function callback () {
    console.log('DB connected\n')
})

module.exports = db