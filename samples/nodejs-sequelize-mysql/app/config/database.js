const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
        underscored: true
    },
    logging: process.env.MODE === 'TEST' ? false : console.log
});

module.exports = sequelize;
