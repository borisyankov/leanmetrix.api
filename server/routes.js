var router = require('koa-route');

module.exports = function(app, config, errors) {

    require('./contact')(app, config, errors);

    app.use(router.post('/createaccount', require('./createaccount')));
    app.use(router.post('/signin', require('./signin')));
    //app.use(router.post('/contact', require('./contact')));

    app.use(router.get('/*', function*(next) {
        var locals = {
            title: 'LeanMetrix'
        };
        this.body = yield this.render('index', locals);
    }));

    return app;
};
