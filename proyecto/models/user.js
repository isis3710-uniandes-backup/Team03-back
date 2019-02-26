'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_names: DataTypes.STRING,
    user_lastnames: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_login: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_birthdate: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Portfolio);
    models.User.hasMany(models.Application);
    models.User.hasMany(models.Service);
  };
  return User;
};