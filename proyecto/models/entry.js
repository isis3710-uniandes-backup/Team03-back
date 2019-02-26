'use strict';
module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    entry_name: DataTypes.STRING,
    entry_description: DataTypes.STRING,
    entry_url: DataTypes.STRING,
    entry_hashtags: DataTypes.STRING
  }, {});
  Entry.associate = function(models) {
    // associations can be defined here
    models.Entry.belongsToMany(models.Application, {through: 'ApplicationEntry'});
  };
  return Entry;
};