const { DataTypes, Model } = require('sequelize');

module.exports = (db) => {
    const User = db.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        modelName: 'User',
        tableName: 'Access'
    });

    User.createAssociations = function(db) {
        this.Posts = this.hasMany(db.Post, {
            foreignKey: 'userId',
            as: 'posts'
        });
        this.belongsToMany(db.Post, {
            through: 'Comment',
            as: 'commentedPosts'
        });
    }

    return User;
};
