"use strict";
const pagination = require("../../app/helpers/Paginate").paginate;

module.exports = (sequelize, DataTypes) => {
  const TouristGallery = sequelize.define(
    "TouristGallery",
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      touristAttractionId: DataTypes.INTEGER
    },
    {}
  );
  TouristGallery.associate = function(models) {
    // associations can be defined here
  };

  TouristGallery.paginate = async options => {
    return await pagination(TouristGallery, options);
  };
  return TouristGallery;
};
