'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    carId: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    make: DataTypes.INTEGER,
    model: DataTypes.INTEGER,
    version: DataTypes.INTEGER,
    segment: DataTypes.STRING,
    bodyStyle: DataTypes.INTEGER,
    fuelType: DataTypes.INTEGER,
    transmision: DataTypes.INTEGER,
    numSeat: DataTypes.INTEGER,
    powerCV: DataTypes.INTEGER,
    powerKW: DataTypes.INTEGER,
    doors: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    register: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return Post;
};