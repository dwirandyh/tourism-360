"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _check = require("express-validator/check");

var _models = require("../database/models");

var _TouristGalleryRepository = require("../repositories/TouristGalleryRepository");

var _TouristGalleryRepository2 = _interopRequireDefault(_TouristGalleryRepository);

var _sharp = require("sharp");

var _sharp2 = _interopRequireDefault(_sharp);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TouristGalleryController = function () {
  function TouristGalleryController() {
    _classCallCheck(this, TouristGalleryController);
  }

  _createClass(TouristGalleryController, null, [{
    key: "index",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var galleries, query, Op, options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                galleries = [];
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
                return _TouristGalleryRepository2.default.search(req, options);

              case 7:
                galleries = _context.sent;
                _context.next = 13;
                break;

              case 10:
                _context.next = 12;
                return _TouristGalleryRepository2.default.getData(req);

              case 12:
                galleries = _context.sent;

              case 13:
                res.json(galleries);

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
  }, {
    key: "attractionGallery",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var attractionId, galleries;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                attractionId = req.params.idAttraction;
                _context2.prev = 1;
                _context2.next = 4;
                return _TouristGalleryRepository2.default.getAttractionGallery(attractionId);

              case 4:
                galleries = _context2.sent;
                return _context2.abrupt("return", res.json(galleries));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);

                console.error(_context2.t0.message);
                res.status(500).send("Server Error");

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 8]]);
      }));

      function attractionGallery(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return attractionGallery;
    }()
  }, {
    key: "detail",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, gallery;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _context3.next = 3;
                return _TouristGalleryRepository2.default.detail(id);

              case 3:
                gallery = _context3.sent;

                if (gallery) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({ errors: "gallery not found" }));

              case 6:

                res.json(gallery);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function detail(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return detail;
    }()
  }, {
    key: "store",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var errors, thumbnail, _req$body, title, touristAttractionId, gallery;

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
                  (0, _sharp2.default)(req.file.path).resize({
                    height: 500
                  }).toBuffer(function (err, buffer) {
                    _fs2.default.writeFile("./uploads/" + req.file.filename, buffer, function (e) {});
                  });

                  thumbnail = req.file.filename;
                }

                _req$body = req.body, title = _req$body.title, touristAttractionId = _req$body.touristAttractionId;
                _context4.prev = 6;
                _context4.next = 9;
                return _TouristGalleryRepository2.default.create({
                  title: title,
                  touristAttractionId: touristAttractionId,
                  thumbnail: thumbnail
                });

              case 9:
                gallery = _context4.sent;

                res.json(gallery);
                _context4.next = 17;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](6);

                console.error(_context4.t0.message);
                res.status(500).send("Server Error");

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[6, 13]]);
      }));

      function store(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return store;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var errors, _req$body2, title, touristAttractionId, data, id, gallery;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                errors = (0, _check.validationResult)(req);

                if (errors.isEmpty()) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json({ errors: errors.array() }));

              case 3:
                _req$body2 = req.body, title = _req$body2.title, touristAttractionId = _req$body2.touristAttractionId;
                data = {
                  title: title,
                  touristAttractionId: touristAttractionId
                };


                if (req.file) {
                  (0, _sharp2.default)(req.file.path).resize({
                    height: 500
                  }).toBuffer(function (err, buffer) {
                    _fs2.default.writeFile("./uploads/" + req.file.filename, buffer, function (e) {});
                  });

                  data.thumbnail = req.file.filename;
                }

                _context5.prev = 6;
                id = req.params.id;
                _context5.next = 10;
                return _TouristGalleryRepository2.default.detail(id);

              case 10:
                gallery = _context5.sent;

                if (gallery) {
                  _context5.next = 13;
                  break;
                }

                return _context5.abrupt("return", res.status(404).json({ errors: "gallery not found" }));

              case 13:
                _context5.next = 15;
                return _TouristGalleryRepository2.default.update(data, {
                  where: {
                    id: id
                  }
                });

              case 15:
                _context5.next = 17;
                return _TouristGalleryRepository2.default.detail(id);

              case 17:
                gallery = _context5.sent;

                res.json(gallery);
                _context5.next = 25;
                break;

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5["catch"](6);

                console.error(_context5.t0.message);
                res.status(500).send("server error");

              case 25:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[6, 21]]);
      }));

      function update(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var id, gallery;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = req.params.id;
                _context6.next = 3;
                return _TouristGalleryRepository2.default.detail(id);

              case 3:
                gallery = _context6.sent;

                if (gallery) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json({ errors: "gallery not found" }));

              case 6:
                _context6.prev = 6;
                _context6.next = 9;
                return _TouristGalleryRepository2.default.destroy({
                  where: {
                    id: id
                  }
                });

              case 9:

                res.json({ msg: "Gallery removed" });
                _context6.next = 16;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](6);

                console.error(_context6.t0.message);
                res.status(500).send("Server Error");

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[6, 12]]);
      }));

      function _delete(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return TouristGalleryController;
}();

exports.default = TouristGalleryController;
//# sourceMappingURL=TouristGalleryController.js.map