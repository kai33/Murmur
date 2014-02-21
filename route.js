var fileSystem = require('fs'),
    path = require('path'),
    ///////////////////////
    controllerDirectory = __dirname + '/controller'

module.exports = function(app, express){
    setupPublic(app, express);
    setupHomepage(app);
    setupControllers(app);
}

function setupPublic(app, express) {
    app.use(express.static(__dirname + '/public'));
}

function setupHomepage(app) {
    var home = require(controllerDirectory + '/home')
    app.get('/', home)
}

function setupControllers(app) {
    fileSystem.readdir(controllerDirectory, function (err, files) {
        if (!err) {
            setupControllersByFiles(app, files);
        }
        setup404(app);
    })
}

function setup404(app) {
    var _404 = require(controllerDirectory + '/_404')
    app.get('*', _404)
}

function setupControllersByFiles(app, files) {
    var controllerName,
        controllerPath,
        controller
    files.forEach(function (item) {
        controllerName = '/' + path.basename(item, '.js')
        controllerPath = controllerDirectory + controllerName
        //set up get & post for every controller
        controller = require(controllerPath)
        app.get(controllerName, controller)
        app.post(controllerName, controller)
    })
}

//TODO:
//cache
