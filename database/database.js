const Sequelize  = require('sequelize');

const connection = new Sequelize('perguntaresposta','root','182122', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;