"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var pagination = require("../../helpers/Paginate").paginate;

module.exports = function (sequelize, DataTypes) {
  var TouristAttractions = sequelize.define("TouristAttractions", {
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    shortDescription: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.TEXT,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    view: DataTypes.INTEGER
  }, {});
  TouristAttractions.associate = function (models) {
    // associations can be defined here
  };
  TouristAttractions.paginate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return pagination(TouristAttractions, options);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
  return TouristAttractions;
};
//# sourceMappingURL=touristattractions.js.map