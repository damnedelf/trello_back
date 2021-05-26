var Sequelize = require('sequelize');
var db = require('../db/index');
require('dotenv').config();
var Tables = db.define('tables', {
  id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
  boardId: Sequelize.INTEGER,
  order: Sequelize.DECIMAL,
});
module.exports = Tables;
