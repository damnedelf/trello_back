var Sequelize = require('sequelize');
var db = require('../db/index');
require('dotenv').config();
var Users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: { type: Sequelize.STRING, primaryKey: true },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});
module.exports = Users;
