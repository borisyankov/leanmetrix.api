var router = require('koa-route');

module.exports = function(app, config, errors) {

    app.use(router.post('/createaccount', require('./api/createaccount')));
    app.use(router.post('/signin', require('./api/signin')));
    app.use(router.post('/contact', require('./api/contact')));

    app.use(router.get('/*', function*(next) {
        var locals = {
            title: 'LeanMetrix'
        };
        this.body = yield this.render('index', locals);
    }));

    return app;
};
