'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    service_name: DataTypes.STRING,
    service_description: DataTypes.STRING,
    service_exampleurl: DataTypes.STRING,
    service_price: DataTypes.DOUBLE
  }, {});
  Service.associate = function(models) {
    // associations can be defined here
    models.Service.belongsTo(models.User,{
      onDelete: "CASCADE",
      foreignKey:{
        allowNull: false
      }
    });
    models.Service.belongsToMany(models.Contract, {through: 'ContractService'});
  };
  return Service;
};