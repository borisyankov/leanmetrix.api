var server = require('../server/app')(__dirname);
var request = require('supertest').agent(server.listen());
var expect = require('chai').expect;

describe('signin', function() {
    it('should return failed', function *() {
        var data = {
            email: 'incorrect',
            password: 'incorrect'
        };
        var res = yield request.post('/signin').send(data).expect(200).end();
        expect(res.text).to.equal('Hello, World');
    });
});
