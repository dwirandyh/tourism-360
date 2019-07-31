"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../config");

var _check = require("express-validator/check");

var _models = require("../database/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "index",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                res.json({ msg: "User List" });

              case 1:
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
    key: "detail",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models.User.findOne({
                  where: {
                    id: req.user.id
                  },
                  attributes: {
                    exclude: ["password"]
                  }
                });

              case 3:
                user = _context2.sent;

                if (user) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({ msg: "User not found" }));

              case 6:

                res.json(user);
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);

                console.error(_context2.t0.message);
                res.status(500).send("Server error");

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function detail(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return detail;
    }()
  }, {
    key: "store",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var errors, _req$body, name, email, password, user, salt, payload;

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
                _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
                _context3.prev = 4;
                _context3.next = 7;
                return _models.User.findOne({
                  where: { email: email }
                });

              case 7:
                user = _context3.sent;

                if (!user) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({ errors: [{ msg: "User already exissts" }] }));

              case 10:
                _context3.next = 12;
                return _bcryptjs2.default.genSalt(10);

              case 12:
                salt = _context3.sent;
                _context3.next = 15;
                return _bcryptjs2.default.hash(password, salt);

              case 15:
                password = _context3.sent;
                _context3.next = 18;
                return _models.User.create({
                  name: name,
                  email: email,
                  password: password
                });

              case 18:
                user = _context3.sent;
                payload = {
                  user: {
                    id: user.id
                  }
                };


                _jsonwebtoken2.default.sign(payload, _config.JWT_SECRET, { expiresIn: 360000 }, function (err, token) {
                  if (err) throw err;
                  res.json({ token: token });
                });
                _context3.next = 27;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3["catch"](4);

                console.error(_context3.t0.message);
                res.status(500).send("Server error");

              case 27:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 23]]);
      }));

      function store(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return store;
    }()
  }, {
    key: "auth",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var errors, _req$body2, email, password, user, isMatch, payload;

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
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context4.prev = 4;
                _context4.next = 7;
                return _models.User.findOne({
                  where: { email: email }
                });

              case 7:
                user = _context4.sent;

                if (user) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] }));

              case 10:
                _context4.next = 12;
                return _bcryptjs2.default.compare(password, user.password);

              case 12:
                isMatch = _context4.sent;

                if (isMatch) {
                  _context4.next = 15;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] }));

              case 15:
                payload = {
                  user: {
                    id: user.id
                  }
                };


                _models.User.jwtToken(payload, function (err, token) {
                  if (err) throw err;
                  return res.json({ token: token });
                });
                _context4.next = 23;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](4);

                console.error(_context4.t0.message);
                res.status(500).send("Server Error");

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[4, 19]]);
      }));

      function auth(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return auth;
    }()
  }]);

  return UserController;
}();

exports.default = UserController;
//# sourceMappingURL=UserController.js.map