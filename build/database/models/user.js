"use strict";

var jwt = require("jsonwebtoken");
var JWT_SECRET = require("../../config").JWT_SECRET;

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };

  User.jwtToken = function (payload, callback) {
    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, callback);
  };

  return User;
};
//# sourceMappingURL=user.js.map