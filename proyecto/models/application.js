'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    application_comments: DataTypes.STRING,
    application_price: DataTypes.DOUBLE
  }, {});
  Application.associate = function(models) {
    // associations can be defined here
    models.Application.belongsTo(models.User);
  };
  return Application;
};