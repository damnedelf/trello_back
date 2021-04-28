var { Sequelize } = require('sequelize');
require('dotenv').config();

var sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_LOGIN,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

module.exports = sequelize;
