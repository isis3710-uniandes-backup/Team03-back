'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_names: {
        type: Sequelize.STRING
      },
      user_lastnames: {
        type: Sequelize.STRING
      },
      user_email: {
        type: Sequelize.STRING
      },
      user_login: {
        type: Sequelize.STRING
      },
      user_password: {
        type: Sequelize.STRING
      },
      user_birthdate: {
        type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};