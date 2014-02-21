var controllerDirectory = __dirname + '/controller'

module.exports = function(app, express){
    setupRoute(app, express);
}

function setupRoute(app, express) {
    setupPublicRoute(app, express);
    setupHomepageRoute(app);
    setupControllersRoute(app);
}

function setupPublicRoute(app, express) {
    app.use(express.static(__dirname + '/public'));
}

function setupHomepageRoute(app) {
    var home = require(controllerDirectory + '/home')
    app.get('/', home)
}

function setupControllersRoute(app) {
    var fileSystem = require('fs')
    fileSystem.readdir(controllerDirectory, function (err, files) {
        if (!err) {
            setupControllersRouteByFiles(app, files);
        }
        setup404Route(app);
    })
}

function setup404Route(app) {
    var _404 = require(controllerDirectory + '/_404')
    app.get('*', _404)
}

function setupControllersRouteByFiles(app, files) {
    var path = require('path'),
        controllerRoute,
        controllerPath,
        controller
    files.forEach(function (item) {
        controllerRoute = '/' + path.basename(item, '.js')
        controllerPath = controllerDirectory + controllerRoute
        controller = require(controllerPath)
        app.get(controllerRoute, controller)
        app.post(controllerRoute, controller)
    })
}

//TODO:
//cache
