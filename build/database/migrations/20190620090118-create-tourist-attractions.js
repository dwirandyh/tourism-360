"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable("TouristAttractions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      address: {
        type: Sequelize.STRING(100)
      },
      shortDescription: {
        type: Sequelize.STRING(200)
      },
      description: {
        type: Sequelize.TEXT
      },
      thumbnail: {
        type: Sequelize.TEXT
      },
      latitude: {
        type: Sequelize.STRING(50)
      },
      longitude: {
        type: Sequelize.STRING(50)
      },
      view: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable("TouristAttractions");
  }
};
//# sourceMappingURL=20190620090118-create-tourist-attractions.js.map