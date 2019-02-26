'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contractor = sequelize.define('Contractor', {
    contractor_name: DataTypes.STRING,
    contractor_email: DataTypes.STRING,
    contractor_login: DataTypes.STRING,
    contractor_password: DataTypes.STRING
  }, {});
  Contractor.associate = function(models) {
    // associations can be defined here
    models.Contractor.hasMany(models.CreditCard);
    models.Contractor.hasMany(models.Offer);
    models.Contractor.hasMany(models.Contract);
  };
  return Contractor;
};