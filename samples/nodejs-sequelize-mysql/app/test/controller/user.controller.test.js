const {app, server} = require('../../server');
const request = require('supertest');

describe('User Api', function () {

    it('should return one user', function (done) {
        request(app)
            .get('/api/users/1')
            .expect(200, done);
    });

    after((done) => {
        done();
        server.close();
    });
});
