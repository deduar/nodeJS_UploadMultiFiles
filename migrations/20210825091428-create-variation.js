'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Variations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carId: {
        type: Sequelize.STRING
      },
      versionId: {
        type: Sequelize.INTEGER
      },
      segmentId: {
        type: Sequelize.INTEGER
      },
      fuelId: {
        type: Sequelize.INTEGER
      },
      transmissionId: {
        type: Sequelize.INTEGER
      },
      yearId: {
        type: Sequelize.INTEGER
      },
      bodyId: {
        type: Sequelize.INTEGER
      },
      numSeat: {
        type: Sequelize.INTEGER
      },
      doors: {
        type: Sequelize.INTEGER
      },
      powerCV: {
        type: Sequelize.INTEGER
      },
      powerKW: {
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
    await queryInterface.dropTable('Variations');
  }
};