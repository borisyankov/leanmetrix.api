var router = require('koa-route');
var Firebase = require('firebase');
var parse = require('co-body');
var mandrill = require('node-mandrill')('EDUnJcByBGdZM9_H0lk2og');

module.exports = function(app, config, errors) {


    app.use(router.post('/contact', function *(next) {

        var firebase = new Firebase("https://leanmetrix.firebaseio.com/" + this.request.host + '/messages/');

        var body = yield parse(this);

        var ip = this.request.headers['x-forwarded-for'] ||
            this.request.connection.remoteAddress ||
            this.request.socket.remoteAddress ||
            this.request.connection.socket.remoteAddress;

        firebase.push().set({
            timestamp: Firebase.ServerValue.TIMESTAMP,
            name: body.name,
            email: body.email,
            message: body.message,
            url: this.request.url,
            ip: ip
        });

        mandrill('/messages/send', {
            message: {
                to: [{
                    email: 'borisyankov@gmail.com',
                    name: 'Boris Yankov'
                }],
                from_email: body.email,
                subject: 'New message form ' + body.name,
                text: body.message
            }
        }, function(error, response) {
            //uh oh, there was an error
            if (error) console.log(JSON.stringify(error));

                //everything's good, lets see what mandrill said
            else console.log(response);
        });

    }));

};
