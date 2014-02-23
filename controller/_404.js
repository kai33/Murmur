var app

module.exports = function (_app_) {
    app = _app_;
    return { delegate: delegate }
};

function delegate(req, res){
    res.send('<h1>404 NOT FOUND</h1>')
    res.end()
}