var fs = require('fs'),
    path = require('path'),
    controllerDirectory = __dirname + '/controller',
    //two special: home and _404
    home = require(controllerDirectory + '/home'),
    _404 = require(controllerDirectory + '/_404'),
    controllerName,
    controllerPath,
    controller

module.exports = function(app){
    //handle homepage
    app.get('/', home)
    //handle other controllers
    fs.readdir(controllerDirectory, function(err, files){
        if(!err){
            files.forEach(function(item){
                //eg for item home.js -> /home
                controllerName = '/' + path.basename(item, '.js')
                //eg for /home -> ./controller/home
                controllerPath = controllerDirectory + controllerName
                //set up get & post for controllers
                controller  = require(controllerPath)
                app.get(controllerName, controller)
                app.post(controllerName, controller)
            })
        }
        //handle default
        app.get('*', _404)
    })
}