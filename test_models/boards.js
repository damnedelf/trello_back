var Sequelize = require('sequelize');
var db = require('../db/index');
require('dotenv').config();
var Boards = db.define('boards', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
  ownerId: Sequelize.INTEGER,
});
module.exports = Boards;
