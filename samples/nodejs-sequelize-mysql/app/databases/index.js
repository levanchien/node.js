const db = require('../config/database');

const models = {
    User: require('./models/user')(db),
    Post: require('./models/post')(db),
    Comment: require('./models/comment')(db),
    sequelize: db
}

Object.keys(models).forEach(key => {
    if (models[key] && models[key].hasOwnProperty('createAssociations')) {
        models[key].createAssociations(models);
    }
});

module.exports = models;