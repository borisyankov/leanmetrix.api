var koa = require('koa');
var app = koa();

module.exports = function(ROOT) {

    app.directory = ROOT;

    // Config
    var config = require('./config')(app);

    // Errors
    var errors = require('./errors')(app, config);

    // Routes
    require('./routes')(app, config, errors);

    return app;
};


return;

var cors = require('koa-cors');

app.use(cors({
    origin: '*'
}));



var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("RL9dj9raQugBfmeKHiW3SE5v5wMmM0yXKm5RF6T0");
var token = tokenGenerator.createToken({
    uid: "1",
    some: "arbitrary",
    data: "here"
});
