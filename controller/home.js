var app

module.exports = function (_app_) {
    app = _app_;
    return { delegate: delegate }
};

function delegate(req, res){
    res.send('Hello World!')
    res.end()
}