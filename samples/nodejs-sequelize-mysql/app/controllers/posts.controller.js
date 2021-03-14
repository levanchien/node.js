const models = require('../databases/index');
const { Transaction } = require('sequelize');
const postsController = require('express').Router();

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

postsController.post('/', (req, res, next) => {
    models.Post.create(req.body)
        .then(result => res.status(200).json(result), next)
        .catch(next);
});

postsController.get('/:id([0-9]+)', async (req, res, next) => {

    const post = await models.Post.findOne({
        where: { id: req.params.id },
        include: {
            model: models.User,
            as: 'commentedUsers'
        }
    });

    if (!post) {
        throw new Error('Post not found !');
    }

    /* just test */
    const comments = await post.getComments();
    const commentedUsers = await post.getCommentedUsers();
    const countComments = await post.countComments();
    const countCommentedUsers = await post.countCommentedUsers();
    const hasComments = await post.hasComments(1); 
    const hasCommentedUsers = await post.hasCommentedUsers(1);

    const plainPost = post.get({ plain: true });
    plainPost.countComments = countComments;
    plainPost.countCommentedUsers = countCommentedUsers;

    res.status(200).json(plainPost);
});

postsController.delete('/:id([0-9]+)',async (req, res, next) => {
    const t = await models.sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
    });

    try {
        const post = await models.Post.findOne({ where: { id: 1 }, transaction: t });
        if (!post) {
            throw new Error('Post not found !');
        }    
        await models.Post.destroy({
            where: { id: 1 },
            transaction: t
        });

        /* Use this to test lock */
        await delay(5000000);

        await t.commit();
    } catch (e) {
        await t.rollback();
    }
});

module.exports.initPostsController = (app) => {
    app.use('/api/posts', postsController);
}
