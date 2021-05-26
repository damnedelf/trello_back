var Sequelize = require('sequelize');
var db = require('../db/index');
require('dotenv').config();
var Tasks = db.define('tasks', {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  text: Sequelize.STRING,
  story: Sequelize.STRING,
  tableId: Sequelize.INTEGER,
  creatorId: Sequelize.INTEGER,
  priority: Sequelize.DECIMAL,
});
module.exports = Tasks;
