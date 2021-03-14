const models = require('../databases/index');
const userController = require('express').Router();

userController.post('/', async (req, res, next) => {
    const { user, first_post } = req.body;
    const newUser = await models.User.create({
        ...user,
        posts: [{
            ...first_post
        }]
    }, {
        include: {
            association: models.User.Posts
        }
    });

    await newUser.getPosts(); // return all posts

    res.status(200).json(newUser)
});

userController.get('/:id([0-9]+)', (req, res, next) => {
    const user = models.User.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: models.Post,
                as: 'posts'
            },
            {
                model: models.Post,
                as: 'commentedPosts'
            }
        ]
    })
    .then(result => res.status(200).json(result), next)
    .catch(next);

});

userController.post('/:id([0-9]+)/posts', (req, res, next) => {
    models.Post.create({
        ...req.body,
        userId: req.params.id
    })
        .then(result => res.status(200).json(result), next)
        .catch(next);
});

userController.post('/:userId([0-9]+)/comments/posts/:postId([0-9]+)', (req, res, next) => {
    models.Comment.create({
        ...req.body,
        userId: req.params.userId,
        postId: req.params.postId
    })
        .then(result => res.status(200).json(result), next)
        .catch(next);
});

module.exports.initUserController = (app) => {
    app.use('/api/users', userController);
}
