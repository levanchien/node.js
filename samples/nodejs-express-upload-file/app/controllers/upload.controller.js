const upload = require('../middlewares/multer.middleware');
const resize = require('../middlewares/resize-image.middleware');

const uploadController = require('express').Router();

module.exports = function() {

    uploadController.post('/one-file', upload.single('file'), resize(), (req, res, next) => {
        res.json([req.file, req.body]);
    });

    uploadController.post('/multi-file', upload.array('files'), resize(), (req, res, next) => {
        res.json(req.files);
    });

    return uploadController;
}
