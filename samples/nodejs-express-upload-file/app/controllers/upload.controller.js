const upload = require('../middlewares/multer.middleware');

const uploadController = require('express').Router();

module.exports = function() {

    uploadController.post('/one-file', upload.single('file'), (req, res, next) => {
        res.json([req.file, req.body]);
    });

    uploadController.post('/multi-file', upload.array('files'), (req, res, next) => {
        res.json([req.files, req.body]);
    });

    return uploadController;
}
