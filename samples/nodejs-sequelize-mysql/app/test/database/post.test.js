
const assert = require('assert');
const models = require('../../databases/index');

describe('Post', function () {

    let instance;

    describe('#delete()', function () {

        before(async () => {
            instance = await models.Post.create({
                title: "Vlxx",
                userId: 1,
                comments: [
                    {
                        userId: 2,
                        content: 'Ok ban'
                    },
                    {
                        userId: 3,
                        content: 'Binh thuong'
                    }
                ]
            },{
                include: {
                    association: models.Post.Comments
                }
            });
        });

        it('should delete comments when delete post', async function () {
            const post = await models.Post.findOne({
                where: { id: instance.id }
            });
            const deleted = await post.destroy()
                .then(res => res ? null : {});
            const comments = await models.Comment.findAll({ where: { postId: instance.id } });
            console.log(comments.length);
            assert.strictEqual(deleted, null, 'Post must be deleted');
            assert.strictEqual(comments.length, 0, 'Comments must be deleted');
        });

        after(async() => {
            models.Post.destroy({ where: { id: instance.id } });
            models.Comment.destroy({ where: { postId: instance.id } });
        })
    });
});
