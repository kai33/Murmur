var app,
    express,
    path = require('path'),
    DIRECTORY_CONTROLLER = path.dirname(__dirname) + '/controller',
    DIRECTORY_PUBLIC     = path.dirname(__dirname) + '/public',
    DIRECTORY_HOME       = DIRECTORY_CONTROLLER + '/home',
    DIRECTORY_404        = DIRECTORY_CONTROLLER + '/_404'

module.exports = function(_app_, _express_){
    app = _app_
    express = _express_
    return { setup: setupRoute }
}

function setupRoute() {
    setupPublicRoute();
    setupHomepageRoute();
    setupControllersRoute();
}

function setupPublicRoute() {
    app.use(express.static(DIRECTORY_PUBLIC));
}

function setupHomepageRoute() {
    var home = require(DIRECTORY_HOME)(app)
    app.get('/', home.delegate)
}

function setupControllersRoute() {
    var fileSystem = require('fs')
    fileSystem.readdir(DIRECTORY_CONTROLLER, function (err, files) {
        if (!err) {
            setupControllersRouteByFiles(files);
        }
        setup404Route();
    })
}

function setup404Route() {
    var _404 = require(DIRECTORY_404)(app)
    app.get('*', _404.delegate)
}

function setupControllersRouteByFiles(files) {
    files.forEach(function (item) {
        var controllerRoute = '/' + path.basename(item, '.js'),
        controllerPath = DIRECTORY_CONTROLLER + controllerRoute,
        controller = require(controllerPath)(app)
        app.get(controllerRoute, controller.delegate)
        app.post(controllerRoute, controller.delegate)
    })
}

//TODO:
//cache
