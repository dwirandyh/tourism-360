"use strict";

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../config").JWT_SECRET;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };

  User.jwtToken = (payload, callback) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, callback);
  };

  return User;
};
