"use strict";

const pagination = require("../../app/helpers/Paginate").paginate;

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {}
  );
  Category.associate = models => {
    // associations can be defined here
  };

  Category.paginate = async options => {
    return await pagination(Category, options);
  };
  return Category;
};
