
const models = require('../../databases/index');

describe('User', function () {

    before((done) => {
        models.User.destroy({
            truncate: true
        }).then(done);
    });

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

        it('should delete without error', function (done) {
            models.User.destroy({
                where: { id: 1 }
            }).then(result => {
                if (result) {
                    return done();
                }
            }, done)
            .catch(done);
        });
    });

    after((done) => {
        models.User.destroy({
            truncate: true
        }).then(done);
    });
});
