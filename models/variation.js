'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Variation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Variation.init({
    carId: DataTypes.STRING,
    versionId: DataTypes.INTEGER,
    fuelId: DataTypes.INTEGER,
    transmissionId: DataTypes.INTEGER,
    yearId: DataTypes.INTEGER,
    bodyId: DataTypes.INTEGER,
    numSeat: DataTypes.INTEGER,
    doors: DataTypes.INTEGER,
    powerCV: DataTypes.INTEGER,
    powerKW: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Variation',
  });
  return Variation;
};