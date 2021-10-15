'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('variations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carId: {
        type: Sequelize.STRING
      },
      makeId: {
        type: Sequelize.INTEGER
      },
      modelId: {
        type: Sequelize.INTEGER
      },
      descriptionId: {
        type: Sequelize.INTEGER
      },
      segmentId: {
        type: Sequelize.INTEGER
      },
      vehicleTypeId: {
        type: Sequelize.INTEGER
      },
      bodyStyleId: {
        type: Sequelize.INTEGER
      },
      fuelTypeId: {
        type: Sequelize.INTEGER
      },
      transmisionId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('variations');
  }
};