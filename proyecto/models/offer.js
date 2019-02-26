'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    offer_name: DataTypes.STRING,
    offer_terms: DataTypes.STRING,
    offer_banner: DataTypes.STRING,
    offer_begindate: DataTypes.DATE,
    offer_enddate: DataTypes.DATE
  }, {});
  Offer.associate = function(models) {
    // associations can be defined here
    models.Offer.belongsTo(models.Contractor,{
      onDelete: "CASCADE",
      foreignKey:{
        allowNull: false
      }
    });
    models.Offer.hasMany(models.Application);
  };
  return Offer;
};