"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _Validation = require("../middleware/Validation");

var _Upload = require("../middleware/Upload");

var _Auth = require("../middleware/Auth");

var _Auth2 = _interopRequireDefault(_Auth);

var _UserController = require("../controllers/UserController");

var _UserController2 = _interopRequireDefault(_UserController);

var _CategoryController = require("../controllers/CategoryController");

var _CategoryController2 = _interopRequireDefault(_CategoryController);

var _TouristAttractionController = require("../controllers/TouristAttractionController");

var _TouristAttractionController2 = _interopRequireDefault(_TouristAttractionController);

var _TouristGalleryController = require("../controllers/TouristGalleryController");

var _TouristGalleryController2 = _interopRequireDefault(_TouristGalleryController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/api/user", _Validation.User.insert, _UserController2.default.store);
router.post("/api/auth", _Validation.User.auth, _UserController2.default.auth);

router.get("/api/me/", _Auth2.default, _UserController2.default.detail);

router.get("/api/category/all", _Auth2.default, _CategoryController2.default.all);
router.get("/api/category", [_Auth2.default], _CategoryController2.default.index);
router.get("/api/category/:id", [_Auth2.default], _CategoryController2.default.detail);
router.post("/api/category", _Auth2.default, _Upload.upload.single("thumbnail"), _Validation.Category.insert, _CategoryController2.default.store);
router.put("/api/category/:id", _Auth2.default, _Upload.upload.single("thumbnail"), _Validation.Category.insert, _CategoryController2.default.update);
router.delete("/api/category/:id", [_Auth2.default], _CategoryController2.default.delete);

// Tourist Attractions
router.get("/api/tourist-attraction", [_Auth2.default], _TouristAttractionController2.default.index);
router.get("/api/tourist-attraction/:id", [_Auth2.default], _TouristAttractionController2.default.detail);
router.post("/api/tourist-attraction", _Auth2.default, _Upload.upload.single("thumbnail"), _Validation.TouristAttraction.insert, _TouristAttractionController2.default.store);
router.put("/api/tourist-attraction/:id", _Auth2.default, _Upload.upload.single("thumbnail"), _Validation.TouristAttraction.insert, _TouristAttractionController2.default.update);
router.delete("/api/tourist-attraction/:id", _Auth2.default, _TouristAttractionController2.default.delete);

// Tourist Gallery
router.get("/api/tourist-gallery", _Auth2.default, _TouristGalleryController2.default.index);
router.get("/api/tourist-gallery/attraction/:idAttraction", _Auth2.default, _TouristGalleryController2.default.attractionGallery);
router.get("/api/tourist-gallery/:id", _Auth2.default, _TouristGalleryController2.default.detail);
router.post("/api/tourist-gallery", _Auth2.default, _Upload.upload.single("thumbnail"), _Validation.TouristGallery.insert, _TouristGalleryController2.default.store);
router.put("/api/tourist-gallery/:id", _Auth2.default, _Upload.upload.single("thumbnail"), _Validation.TouristGallery.insert, _TouristGalleryController2.default.update);
router.delete("/api/tourist-gallery/:id", _Auth2.default, _TouristGalleryController2.default.delete);

// PUBLIC API

// Attraction Detail
router.get("/api/v1/attraction/:id([0-9]+)", _TouristAttractionController2.default.detail);

// Popular Attraction
router.get("/api/v1/attraction/popular", _TouristAttractionController2.default.popular);

// get attraction gallery
router.get("/api/v1/attraction/:id/gallery", _TouristAttractionController2.default.gallery);

// Search Attraction
router.get("/api/v1/attraction/search", _TouristAttractionController2.default.searchAttraction);

// Category
router.get("/api/v1/category", _CategoryController2.default.all);

// Get Attraction
router.get("/api/v1/category/:id/attraction", _CategoryController2.default.getAttraction);

exports.default = router;
//# sourceMappingURL=web.js.map