'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vehicle.init({
    carId: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    description: DataTypes.STRING,
    segment: DataTypes.STRING,
    vehicleType: DataTypes.STRING,
    bodyStyle: DataTypes.STRING,
    fuelType: DataTypes.STRING,
    transmision: DataTypes.STRING,
    numSeat: DataTypes.STRING,
    powerCV: DataTypes.INTEGER,
    powerKW: DataTypes.INTEGER,
    doors: DataTypes.INTEGER,
    year: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};