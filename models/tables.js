'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tables.init({
    name: DataTypes.STRING,
    boardId: DataTypes.NUMBER,
    order: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Tables',
  });
  return Tables;
};