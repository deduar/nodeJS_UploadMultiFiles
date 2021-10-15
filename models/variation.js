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
    makeId: DataTypes.INTEGER,
    modelId: DataTypes.INTEGER,
    descriptionId: DataTypes.INTEGER,
    segmentId: DataTypes.INTEGER,
    vehicleTypeId: DataTypes.INTEGER,
    bodyStyleId: DataTypes.INTEGER,
    fuelTypeId: DataTypes.INTEGER,
    transmisionId: DataTypes.INTEGER,
    numSeat: DataTypes.INTEGER,
    powerCV: DataTypes.INTEGER,
    powerKW: DataTypes.INTEGER,
    doors: DataTypes.INTEGER,
    introductionDate: DataTypes.INTEGER,
    endDat: DataTypes.INTEGER,
    modificationDate: DataTypes.INTEGER,
    modelYear: DataTypes.INTEGER,
    modelIntroductionYear: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'variation',
  });
  return Variation;
};