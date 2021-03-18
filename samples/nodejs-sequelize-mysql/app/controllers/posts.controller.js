const models = require('../databases/index');
const { Transaction } = require('sequelize');
const { Post } = require('../databases/index');
const postsController = require('express').Router();

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

postsController.post('/', (req, res, next) => {
    models.Post.create(req.body)
        .then(result => res.status(200).json(result), next)
        .catch(next);
});

postsController.get('/', (req, res, next) => {
    models.Post.findAll({   skipLocked: true })
        .then(result => res.status(200).json(result), next)
        .catch(next);
});

postsController.get('/:id([0-9]+)', async (req, res, next) => {

    const t = await models.sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
    });
    
    try {
        
        const post = await models.Post.findOne({
            where: { id: req.params.id },
            // include: {
            //     model: models.User,
            //     as: 'commentedUsers'
            // },
            transaction: t,
            lock: t.LOCK.UPDATE // bo sung lock read
        });

        if (!post) {
            throw new Error('Post not found !');
        }

        /* just test */
/*         const comments = await post.getComments();
        const commentedUsers = await post.getCommentedUsers();
        const countComments = await post.countComments();
        const countCommentedUsers = await post.countCommentedUsers();
        const hasComments = await post.hasComments(1); 
        const hasCommentedUsers = await post.hasCommentedUsers(1);

        const plainPost = post.get({ plain: true });
        plainPost.countComments = countComments;
        plainPost.countCommentedUsers = countCommentedUsers; */

        // await delay(100000000);

        await t.commit();

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        await t.rollback();
        next(error);
    }
});

postsController.delete('/:id([0-9]+)',async (req, res, next) => {
    const t = await models.sequelize.transaction();

    try {
        const post = await models.Post.findOne({
            where: { id: req.params.id },
            transaction: t,
            // only work in mysql
            // lock: t.LOCK.UPDATE
        });

        // await delay(30000);

        if (!post) {
            throw new Error('Post not found !');
        }    
        // post.title = "DMM 11xxx";
        // await post.save({ transaction: t });

        await Post.update({
            title : "XXX"
        }, { transaction: t, where: { id: req.params.id } });

        /* Use this to test lock */
        await delay(100000000);

        await t.commit();
        res.status(200).send('ok');
    } catch (e) {
        await t.rollback();
        next(e);
    }
});

module.exports.initPostsController = (app) => {
    app.use('/api/posts', postsController);
}
