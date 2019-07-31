"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = undefined;

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _md = require("md5");

var _md2 = _interopRequireDefault(_md);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function filename(req, file, cb) {
    cb(null, (0, _md2.default)(file.originalname + Date.now()) + _path2.default.extname(file.originalname));
  }
});

var upload = exports.upload = (0, _multer2.default)({
  storage: storage
});
//# sourceMappingURL=Upload.js.map