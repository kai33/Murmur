var express = require('express')
var app = express()
app.db = require('./conf/db')
var route = require('./core/route')(app, express)
route.setup()
app.listen(3000)

//TODO:
//get & post preprocess/postprocess filter!
