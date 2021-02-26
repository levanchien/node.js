const uploadController = require('./upload.controller');

module.exports = function(app) {
    app.use('/upload', uploadController());
}
