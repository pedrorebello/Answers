const Sequelize = require('sequelize');
const CREDENTIALS = require('credentials');

const connection = new Sequelize('answers', 'CREDENTIALS.SQL_USER', 'CREDENTIALS.SQL_PASS', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;