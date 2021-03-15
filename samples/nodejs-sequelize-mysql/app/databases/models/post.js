const { Sequelize, DataTypes } = require('sequelize');

module.exports = (db) => {
    const Post = db.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER
        }
    }, {
        modelName: 'Post',
        tableName: 'Post'
    });

    Post.createAssociations = function(db) {
        this.Comments = this.hasMany(db.Comment, {
            foreignKey: 'postId',
            as: 'comments',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            hooks: true
        }),
        this.belongsTo(db.User, {
            foreignKey: 'userId',
            as: 'ownerUser'
        }),
        /* Many to Many */
        this.belongsToMany(db.User, {
            through: db.Comment,
            as: 'commentedUsers'
        });
    }

    return Post;
};
