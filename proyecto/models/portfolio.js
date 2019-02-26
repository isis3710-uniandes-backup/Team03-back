'use strict';
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    portfolio_name: DataTypes.STRING,
    portfolio_type: DataTypes.STRING,
    portfolio_description: DataTypes.STRING,
    portfolio_url: DataTypes.STRING,
    portfolio_banner: DataTypes.STRING
  }, {});
  Portfolio.associate = function(models) {
    models.Portfolio.belongsTo(models.User,{
      onDelete: "CASCADE",
      foreignKey:{
        allowNull: false
      }
    });
    models.Portfolio.hasMany(models.Entry);
  };
  return Portfolio;
};