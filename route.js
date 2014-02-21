var DIRECTORY_CONTROLLER = __dirname + '/controller',
    DIRECTORY_PUBLIC     = __dirname + '/public',
    DIRECTORY_HOME       = DIRECTORY_CONTROLLER + '/home',
    DIRECTORY_404        = DIRECTORY_CONTROLLER + '/_404'

module.exports = function(app, express){
    setupRoute(app, express);
}

function setupRoute(app, express) {
    setupPublicRoute(app, express);
    setupHomepageRoute(app);
    setupControllersRoute(app);
}

function setupPublicRoute(app, express) {
    app.use(express.static(DIRECTORY_PUBLIC));
}

function setupHomepageRoute(app) {
    var home = require(DIRECTORY_HOME)
    app.get('/', home)
}

function setupControllersRoute(app) {
    var fileSystem = require('fs')
    fileSystem.readdir(DIRECTORY_CONTROLLER, function (err, files) {
        if (!err) {
            setupControllersRouteByFiles(app, files);
        }
        setup404Route(app);
    })
}

function setup404Route(app) {
    var _404 = require(DIRECTORY_404)
    app.get('*', _404)
}

function setupControllersRouteByFiles(app, files) {
    var path = require('path')
    files.forEach(function (item) {
        var controllerRoute = '/' + path.basename(item, '.js'),
        controllerPath = DIRECTORY_CONTROLLER + controllerRoute,
        controller = require(controllerPath)
        app.get(controllerRoute, controller)
        app.post(controllerRoute, controller)
    })
}

//TODO:
//cache
