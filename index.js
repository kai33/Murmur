var express = require('express')
var app = express()
require(__dirname + '/route')(app)
//TODO:
//get & post preprocess/filter!
app.listen(3000)
