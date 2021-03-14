const models = require('../databases/index');
const commentsController = require('express').Router();

commentsController.post('/', (req, res, next) => {
    models.Comment.create(req.body)
        .then(result => res.status(200).json(result), next)
        .catch(next);
});

commentsController.get('/:id([0-9]+)', (req, res, next) => {
    models.Comment.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(result => res.status(200).json(result), next)
        .catch(next);
});

module.exports.initCommentsController = (app) => {
    app.use('/api/comments', commentsController);
}
