"use strict";
const pagination = require("../../helpers/Paginate").paginate;

module.exports = (sequelize, DataTypes) => {
  const TouristAttractions = sequelize.define(
    "TouristAttractions",
    {
      name: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      shortDescription: DataTypes.STRING,
      description: DataTypes.STRING,
      thumbnail: DataTypes.TEXT,
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      view: DataTypes.INTEGER
    },
    {}
  );
  TouristAttractions.associate = function(models) {
    // associations can be defined here
  };
  TouristAttractions.paginate = async options => {
    return await pagination(TouristAttractions, options);
  };
  return TouristAttractions;
};
