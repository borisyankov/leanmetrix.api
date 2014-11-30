var koa = require('koa');
var router = require('koa-router');
var cors = require('koa-cors');
var body = require('koa-body')();
var parse = require('co-body');
var app = koa();

app.use(cors({origin: '*'}));
app.use(router(app));

var mandrill = require('node-mandrill')('EDUnJcByBGdZM9_H0lk2og');

var Firebase = require("firebase");
var firebase = new Firebase("https://leanmetrix.firebaseio.com/messages/");

var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("RL9dj9raQugBfmeKHiW3SE5v5wMmM0yXKm5RF6T0");
var token = tokenGenerator.createToken({uid: "1", some: "arbitrary", data: "here"});

console.log('token: ', token);

firebase.child("location/city").on("value", function(snapshot) {
    // console.log(snapshot.val()); // Alerts "San Francisco"
});

app.get('/users/:id', function*(next) {
    //    var user =        yield User.findOne(this.params.id);
    this.body = 'boris';
});


// create account
app.post('/users', function*(next) {

    var body = yield parse(this, { limit: '1kb' });

    firebase.createUser({
        email: body.email,
        password: body.password,
    }, function(error) {
        if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", error);
        }
      } else {
        console.log("User account created successfully!");
      }
    });
});


// sign in
app.post('/signin', function*(email, password) {

    var body = yield parse(this, { limit: '1kb' });

    firebase.authWithPassword({
        email: body.email,
        password: body.password,
    }, function(error, authData) {
        if (error === null) {
            // user authenticated with Firebase
            console.log(authData);
            console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
        } else {
            console.log("Error authenticating user:", error);
        }
    });
});


// post contact us info
app.post('/contact/', body, function*(next) {

    this.body = JSON.stringify(this.request.body);

    console.log(this.request.host);

    firebase.push().set({
        timestamp: Firebase.ServerValue.TIMESTAMP,
        name: this.request.body.name,
        email: this.request.body.email,
        message: this.request.body.message
    });

    mandrill('/messages/send', {
        message: {
            to: [{
                email: 'borisyankov@gmail.com',
                name: 'Boris Yankov'
            }],
            from_email: this.request.body.email,
            subject: 'New message form ' + this.request.body.name,
            text: this.request.body.message
        }
    }, function(error, response) {
        //uh oh, there was an error
        if (error) console.log(JSON.stringify(error));

        //everything's good, lets see what mandrill said
        else console.log(response);
    });

});

app.listen(process.env.PORT || 3000);
