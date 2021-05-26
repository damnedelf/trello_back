var Sequelize = require('sequelize');
var db = require('../db/index');
require('dotenv').config();
var usersBoards = db.define('assigned_users_boards', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  boards_id: Sequelize.INTEGER,
  assigned_users_id: Sequelize.INTEGER,
});
module.exports = usersBoards;
