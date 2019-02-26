'use strict';
module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define('CreditCard', {
    creditcard_name: DataTypes.STRING,
    creditcard_number: DataTypes.STRING,
    creditcard_expirationdate: DataTypes.STRING
  }, {});
  CreditCard.associate = function(models) {
    // associations can be defined here
  };
  return CreditCard;
};