'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    malePopulation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    femalePopulation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.Location, {
      as: 'parent',
      foreignKey: 'parentId'
    });
  };
  return Location;
};