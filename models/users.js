'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      name: { type: DataTypes.INTEGER, primaryKey: true },
      email: DataTypes.STRING,
      password: { type: Sequelize.STRING },
      // roles:[{type:DataTypes.STRING}]
    },
    {
      sequelize,
      modelName: 'users',
    }
  );
  return Users;
};
