"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouristGallery = exports.TouristAttraction = exports.Category = exports.User = undefined;

var _check = require("express-validator/check");

var User = exports.User = {
  insert: [(0, _check.check)("name", "Name is required").not().isEmpty(), (0, _check.check)("email", "Please include a valid email").isEmail(), (0, _check.check)("password", "Password is required").not().isEmpty()],
  auth: [(0, _check.check)("email", "Please include a valid email").isEmail(), (0, _check.check)("password", "Password is required").not().isEmpty()]
};

var Category = exports.Category = {
  insert: [(0, _check.check)("name", "Name is required").not().isEmpty()]
};

var TouristAttraction = exports.TouristAttraction = {
  insert: [(0, _check.check)("name", "Name is required").not().isEmpty(), (0, _check.check)("address", "Address is required").not().isEmpty(), (0, _check.check)("shortDescription", "Short description is required").not().isEmpty(), (0, _check.check)("description", "Description is required").not().isEmpty(), (0, _check.check)("latitude", "Latitude is required").not().isEmpty(), (0, _check.check)("longitude", "Longitude is required").not().isEmpty()]
};

var TouristGallery = exports.TouristGallery = {
  insert: [(0, _check.check)("title", "Title is required").not().isEmpty(), (0, _check.check)("touristAttractionId", "Tourist Attraction is required").not().isEmpty()]
};
//# sourceMappingURL=Validation.js.map