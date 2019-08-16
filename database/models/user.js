'use strict';
const defaultAttributes = ['id', 'name', 'email', 'role',]

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    defaultScope: {
      attributes: defaultAttributes
    },
    scopes: {
      withPassword: {
        attributes: [...defaultAttributes, 'password']
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};