var parse = require('co-body');

exports = function*(email, password) {

    var firebase = new Firebase('https://leanmetrix.firebaseio.com/');

    var body =
        yield parse(this, {
            limit: '1kb'
        });

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

};
