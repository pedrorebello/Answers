const Sequelize = require('sequelize');
const CREDENTIALS = require('./credentials');

const connection = new Sequelize(CREDENTIALS.DB, CREDENTIALS.USER, CREDENTIALS.PASSWORD, {
    host: CREDENTIALS.HOST,
    dialect: 'mysql'
});

module.exports = connection;