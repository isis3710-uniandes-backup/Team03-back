'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      offer_name: {
        type: Sequelize.STRING
      },
      offer_terms: {
        type: Sequelize.STRING
      },
      offer_banner: {
        type: Sequelize.STRING
      },
      offer_begindate: {
        type: Sequelize.DATE
      },
      offer_enddate: {
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
    return queryInterface.dropTable('Offers');
  }
};