var koa = require('koa');
var router = require('koa-router');
var cors = require('koa-cors');
var body = require('koa-body')();
var app = koa();

app.use(cors({origin: '*'}));
app.use(router(app));

var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://blazing-torch-8037.firebaseio.com/");

myFirebaseRef.set({
    title: "Hello World!",
    author: "Firebase",
    location: {
        city: "San Francisco",
        state: "California",
        zip: 94103
    }
});

myFirebaseRef.child("location/city").on("value", function(snapshot) {
    console.log(snapshot.val()); // Alerts "San Francisco"
});

app.get('/users/:id', function*(next) {
//    var user =        yield User.findOne(this.params.id);
    this.body = 'boris';
});

app.post('/contact/', body, function *(next) {
    this.body = JSON.stringify(this.request.body);
});

app.listen(process.env.PORT || 3000);
