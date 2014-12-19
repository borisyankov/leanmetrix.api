var parse = require('co-body');
var Firebase = require('firebase');
var customerio = require('node-customerio');

module.exports = function*(email, password) {

    var firebase = new Firebase('https://leanmetrix.firebaseio.com/');

    var body = yield parse(this);

    firebase.authWithPassword({
        email: body.email,
        password: body.password,
    }, function(error, authData) {
        if (error != null) {
            console.log("Error authenticating user:", error);
            return;
        }
        
        customerio.init('b6603ce1808edcb87957', '1852560cf6f3a5c8bc8d');
        customerio.identify({
            id: body.email,
            email: body.email
        }).done(function(result) {
            console.log('Logged in: ' + body.email);
        }, function(err) {
            console.log('Logged in failed!', err);
        });
        // customer.track(body.email, 'logged in>?!?').done(function () {
        //   console.log('done');
        // }, function (err) {
        //   console.log('oh no', err);
        // });
    });

};
