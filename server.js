var express = require('express');
var app = express();

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

Firebase.goOffline();

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('i am a beautiful butterfly');
});

app.listen(process.env.PORT || 12345);
