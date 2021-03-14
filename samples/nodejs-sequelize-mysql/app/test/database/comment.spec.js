
const models = require('../../databases/index');

describe('User', function () {

    describe('#save()', function () {
        it('should save without error', function (done) {
            models.User.create({
                name: 'Vuong',
            }).then(result => {
                if (result) {
                    return done();
                }
            }, done)
            .catch(done);
        });
    });
});
