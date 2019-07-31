"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("babel-core/register");
require("babel-polyfill");

var _config = require("./config");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _web = require("./routes/web");

var _web2 = _interopRequireDefault(_web);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();

// enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use((0, _morgan2.default)("dev"));
// support parsing of application/json type post data
app.use(_bodyParser2.default.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(_bodyParser2.default.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", _express2.default.static(process.cwd() + "/uploads"));

app.use(_web2.default);

app.engine(
  "hbs",
  (0, _expressHandlebars2.default)({
    extname: "hbs",
    defaultLayout: "welcome",
    layoutsDir: _path2.default.join(__dirname, "/src/views")
  })
);
app.set("views", _path2.default.join(__dirname, "/src/views"));
app.set("view engine", "hbs");

app.listen(_config.PORT, function() {
  console.log("App is running on port " + _config.PORT);
});

exports.default = app;
//# sourceMappingURL=app.js.map
