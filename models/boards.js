'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Boards.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.NUMBER,
    userId: DataTypes.ARRAY(DataTypes.NUMBER)
  }, {
    sequelize,
    modelName: 'Boards',
  });
  return Boards;
};