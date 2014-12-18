var customerio = require('node-customerio');
customerio.init('b6603ce1808edcb87957', '1852560cf6f3a5c8bc8d');


exports = function*(next) {

    var body = yield parse(this, {
        limit: '1kb'
    });

    console.log(body);

    customerio.identify({
        id: body.email,
        email: body.email,
        created_at: new Date()
    }).done(function(result) {
        console.log('Account created: ' + body.email);
    }, function(err) {
        console.log('Account creation failed!', err);
    });
};
