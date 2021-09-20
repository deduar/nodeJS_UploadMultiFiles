'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      carId: {
        type: Sequelize.STRING
      },
      postId: {
        type: Sequelize.INTEGER
      },
      make: {
        type: Sequelize.INTEGER
      },
      model: {
        type: Sequelize.INTEGER
      },
      version: {
        type: Sequelize.INTEGER
      },
      segment: {
        type: Sequelize.STRING
      },
      bodyStyle: {
        type: Sequelize.INTEGER
      },
      fuelType: {
        type: Sequelize.INTEGER
      },
      transmision: {
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
      year: {
        type: Sequelize.INTEGER
      },
      register: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      userId: {
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
    await queryInterface.dropTable('posts');
  }
};