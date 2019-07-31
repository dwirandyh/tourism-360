"use strict";
const pagination = require("../../helpers/Paginate").paginate;
const touristAttraction = require("./touristattractions");

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
    TouristGallery.belongsTo(models.TouristAttractions, {
      foreignKey: "touristAttractionId",
      as: "attraction"
    });
  };

  TouristGallery.paginate = async options => {
    return await pagination(TouristGallery, options);
  };
  return TouristGallery;
};
