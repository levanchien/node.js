const { DataTypes } = require('sequelize');

module.exports = (db) => {
    const Comment = db.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(255),
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Post',
                key: 'id'
            }
        }
    }, {
        modelName: 'Comment',
        tableName: 'Comment'
    });

    Comment.createAssociations = function(db) {
        console.log(this)
    }

    return Comment;
};
