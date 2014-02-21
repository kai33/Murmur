var express = require('express')
var app = express()
require(__dirname + '/route')(app, express)
app.listen(3000)

//TODO:
//get & post preprocess/postprocess filter!
