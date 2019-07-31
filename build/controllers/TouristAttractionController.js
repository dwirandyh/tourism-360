"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _check = require("express-validator/check");

var _models = require("../database/models");

var _TouristAttractionRepository = require("../repositories/TouristAttractionRepository");

var _TouristAttractionRepository2 = _interopRequireDefault(_TouristAttractionRepository);

var _sharp = require("sharp");

var _sharp2 = _interopRequireDefault(_sharp);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _TouristGalleryRepository = require("../repositories/TouristGalleryRepository");

var _TouristGalleryRepository2 = _interopRequireDefault(_TouristGalleryRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TouristAttractionController = function () {
  function TouristAttractionController() {
    _classCallCheck(this, TouristAttractionController);
  }

  _createClass(TouristAttractionController, null, [{
    key: "index",

    /**
     * get all tourist with pagination
     * @param {*} req
     * @param {*} res
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var attractions, query, Op, options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                attractions = [];
                query = req.query.name;

                if (!query) {
                  _context.next = 10;
                  break;
                }

                Op = _models.Sequelize.Op;
                options = {
                  where: {
                    name: _defineProperty({}, Op.like, "%" + query + "%")
                  }
                };
                _context.next = 7;
                return _TouristAttractionRepository2.default.search(req, options);

              case 7:
                attractions = _context.sent;
                _context.next = 13;
                break;

              case 10:
                _context.next = 12;
                return _TouristAttractionRepository2.default.getData(req);

              case 12:
                attractions = _context.sent;

              case 13:
                res.json(attractions);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function index(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return index;
    }()

    /**
     * get detail tourist by id
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: "detail",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var id, tourist;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;
                _context2.next = 3;
                return _TouristAttractionRepository2.default.detail(id);

              case 3:
                tourist = _context2.sent;

                if (tourist) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({ errors: "tourist not found" }));

              case 6:

                res.json(tourist);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function detail(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return detail;
    }()

    /**
     * insert new tourist
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: "store",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var errors, thumbnail, _req$body, name, address, shortDescription, description, latitude, longitude, tourist;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                errors = (0, _check.validationResult)(req);

                if (errors.isEmpty()) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({ errors: errors.array() }));

              case 3:
                thumbnail = "";

                if (req.file) {
                  // Resize image
                  (0, _sharp2.default)(req.file.path).resize({
                    height: 500
                  }).toBuffer(function (err, buffer) {
                    _fs2.default.writeFile("./uploads/" + req.file.filename, buffer, function (e) {});
                  });

                  thumbnail = req.file.filename;
                }

                _req$body = req.body, name = _req$body.name, address = _req$body.address, shortDescription = _req$body.shortDescription, description = _req$body.description, latitude = _req$body.latitude, longitude = _req$body.longitude;
                _context3.prev = 6;
                _context3.next = 9;
                return _TouristAttractionRepository2.default.create({
                  name: name,
                  address: address,
                  shortDescription: shortDescription,
                  description: description,
                  latitude: latitude,
                  longitude: longitude,
                  thumbnail: thumbnail
                });

              case 9:
                tourist = _context3.sent;


                res.json(tourist);
                _context3.next = 17;
                break;

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](6);

                console.error(_context3.t0.message);
                res.status(500).send("Server Error");

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 13]]);
      }));

      function store(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return store;
    }()

    /**
     * Update tourist by id
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: "update",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var errors, thumbnail, _req$body2, name, address, shortDescription, description, latitude, longitude, id, tourist;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                errors = (0, _check.validationResult)(req);

                if (errors.isEmpty()) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({ errors: errors.array() }));

              case 3:
                thumbnail = "";

                if (req.file) {
                  // Resize image
                  (0, _sharp2.default)(req.file.path).resize({
                    height: 500
                  }).toBuffer(function (err, buffer) {
                    _fs2.default.writeFile("./uploads/" + req.file.filename, buffer, function (e) {});
                  });

                  thumbnail = req.file.filename;
                }

                _req$body2 = req.body, name = _req$body2.name, address = _req$body2.address, shortDescription = _req$body2.shortDescription, description = _req$body2.description, latitude = _req$body2.latitude, longitude = _req$body2.longitude;
                _context4.prev = 6;
                id = req.params.id;
                _context4.next = 10;
                return _TouristAttractionRepository2.default.detail(id);

              case 10:
                tourist = _context4.sent;

                if (tourist) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({ errors: "tourist not found" }));

              case 13:
                _context4.next = 15;
                return _TouristAttractionRepository2.default.update({
                  name: name,
                  address: address,
                  shortDescription: shortDescription,
                  description: description,
                  latitude: latitude,
                  longitude: longitude,
                  thumbnail: thumbnail
                }, {
                  where: {
                    id: id
                  }
                });

              case 15:
                _context4.next = 17;
                return _TouristAttractionRepository2.default.detail(id);

              case 17:
                tourist = _context4.sent;


                res.json(tourist);
                _context4.next = 25;
                break;

              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4["catch"](6);

                console.error(_context4.t0.message);
                res.status(500).send("Server Error");

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[6, 21]]);
      }));

      function update(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return update;
    }()

    /**
     * Delete tourist by id
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: "delete",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, tourist;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                _context5.next = 3;
                return _TouristAttractionRepository2.default.detail(id);

              case 3:
                tourist = _context5.sent;

                if (tourist) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({ errors: "tourist not found" }));

              case 6:
                _context5.prev = 6;
                _context5.next = 9;
                return _TouristAttractionRepository2.default.destroy({
                  where: {
                    id: id
                  }
                });

              case 9:

                res.json({ msg: "Tourist attraction removed" });
                _context5.next = 16;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](6);

                console.error(_context5.t0.message);
                res.status(500).send("Server Error");

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[6, 12]]);
      }));

      function _delete(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return _delete;
    }()

    // Public API

  }, {
    key: "popular",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var attractions;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _TouristAttractionRepository2.default.popular();

              case 3:
                attractions = _context6.sent;
                return _context6.abrupt("return", res.json(attractions));

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);

                console.error(_context6.t0.message);
                res.status(500).send("Server Error");

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 7]]);
      }));

      function popular(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return popular;
    }()
  }, {
    key: "gallery",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var id, galleries;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                id = req.params.id;
                _context7.next = 4;
                return _TouristGalleryRepository2.default.getAttractionGallery(id);

              case 4:
                galleries = _context7.sent;
                return _context7.abrupt("return", res.json(galleries));

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);

                console.error(_context7.t0.message);
                res.status(500).send("Server Error");

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 8]]);
      }));

      function gallery(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return gallery;
    }()
  }, {
    key: "searchAttraction",
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var query, Op, options, attractions;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                query = req.query.q;

                if (query) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return", res.status(404).json({ msg: "Keyword is required" }));

              case 3:
                _context8.prev = 3;
                Op = _models.Sequelize.Op;
                options = {
                  where: _defineProperty({}, Op.or, [{
                    name: _defineProperty({}, Op.like, "%" + query + "%")
                  }, {
                    shortDescription: _defineProperty({}, Op.like, "%" + query + "%")
                  }])
                };
                _context8.next = 8;
                return _TouristAttractionRepository2.default.searchAttraction(options);

              case 8:
                attractions = _context8.sent;

                res.json(attractions);
                _context8.next = 16;
                break;

              case 12:
                _context8.prev = 12;
                _context8.t0 = _context8["catch"](3);

                console.error(_context8.t0.message);
                res.status(500).send("Server Error");

              case 16:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[3, 12]]);
      }));

      function searchAttraction(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return searchAttraction;
    }()
  }]);

  return TouristAttractionController;
}();

exports.default = TouristAttractionController;
//# sourceMappingURL=TouristAttractionController.js.map