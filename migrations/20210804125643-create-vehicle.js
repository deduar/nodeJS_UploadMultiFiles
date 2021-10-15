'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carId: {
        type: Sequelize.STRING
      },
      make: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      segment: {
        type: Sequelize.STRING
      },
      vehicleType: {
        type: Sequelize.STRING
      },
      bodyStyle: {
        type: Sequelize.STRING
      },
      fuelType: {
        type: Sequelize.STRING
      },
      transmision: {
        type: Sequelize.STRING
      },
      numSeat: {
        type: Sequelize.INTEGER
      },
      powerCV: {
        type: Sequelize.INTEGER
      },
      powerKW: {
        type: Sequelize.INTEGER
      },
      doors: {
        type: Sequelize.INTEGER
      },
      introductionDate: {
        type: Sequelize.INTEGER
      },
      endDat: {
        type: Sequelize.INTEGER
      },
      modificationDate: {
        type: Sequelize.INTEGER
      },
      modelYear: {
        type: Sequelize.INTEGER
      },
      modelIntroductionYear: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vehicles');
  }
};