const { Sequelize, Transaction } = require('sequelize');

const sequelize = new Sequelize({
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: false,
        underscored: true
    },
    logging: process.env.MODE === 'TEST' ? false : console.log,
    pool: {
        min: 1,
        max: 10
    }
});

module.exports = sequelize;
