'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    contract_terms: DataTypes.STRING,
    contract_comments: DataTypes.STRING,
    contract_begindate: DataTypes.DATE,
    contract_enddate: DataTypes.DATE
  }, {});
  Contract.associate = function(models) {
    // associations can be defined here
    models.Contract.belongsTo(models.Contractor,{
      onDelete: "CASCADE",
      foreignKey:{
        allowNull: false
      }
    });
    models.Contract.hasMany(models.Service);
  };
  return Contract;
};