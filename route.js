var fileSystem = require('fs'),
    path = require('path'),
    controllerDirectory = __dirname + '/controller',
    home = require(controllerDirectory + '/home'),
    _404 = require(controllerDirectory + '/_404'),
    controllerName,
    controllerPath,
    controller

module.exports = function(app, express){
    //set up public folder
    app.use(express.static('./public'));
    //set up homepage
    app.get('/', home)
    //set up other controllers
    fileSystem.readdir(controllerDirectory, function(err, files){
        if(!err){
            setupControllers(app, files);
        }
        //set up default case with _404
        app.get('*', _404)
    })
}

function setupControllers(app, files) {
    files.forEach(function (item) {
        //eg for item home.js -> /home
        controllerName = '/' + path.basename(item, '.js')
        //eg for /home -> ./controller/home
        controllerPath = controllerDirectory + controllerName
        //set up get & post for controllers
        controller = require(controllerPath)
        app.get(controllerName, controller)
        app.post(controllerName, controller)
    })
}

//TODO:
//cache
