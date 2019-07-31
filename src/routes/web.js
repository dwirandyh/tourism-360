import express from "express";
import {
  User,
  Category,
  TouristAttraction,
  TouristGallery
} from "../middleware/Validation";
import { upload } from "../middleware/Upload";
import Auth from "../middleware/Auth";

import UserController from "../controllers/UserController";
import CategoryController from "../controllers/CategoryController";
import TouristAttractionController from "../controllers/TouristAttractionController";
import TouristGalleryController from "../controllers/TouristGalleryController";

const router = express.Router();

router.post("/api/user", User.insert, UserController.store);
router.post("/api/auth", User.auth, UserController.auth);

router.get("/api/me/", Auth, UserController.detail);

router.get("/api/category/all", Auth, CategoryController.all);
router.get("/api/category", [Auth], CategoryController.index);
router.get("/api/category/:id", [Auth], CategoryController.detail);
router.post(
  "/api/category",
  Auth,
  upload.single("thumbnail"),
  Category.insert,
  CategoryController.store
);
router.put(
  "/api/category/:id",
  Auth,
  upload.single("thumbnail"),
  Category.insert,
  CategoryController.update
);
router.delete("/api/category/:id", [Auth], CategoryController.delete);

// Tourist Attractions
router.get(
  "/api/tourist-attraction",
  [Auth],
  TouristAttractionController.index
);
router.get(
  "/api/tourist-attraction/:id",
  [Auth],
  TouristAttractionController.detail
);
router.post(
  "/api/tourist-attraction",
  Auth,
  upload.single("thumbnail"),
  TouristAttraction.insert,
  TouristAttractionController.store
);
router.put(
  "/api/tourist-attraction/:id",
  Auth,
  upload.single("thumbnail"),
  TouristAttraction.insert,
  TouristAttractionController.update
);
router.delete(
  "/api/tourist-attraction/:id",
  Auth,
  TouristAttractionController.delete
);

// Tourist Gallery
router.get("/api/tourist-gallery", Auth, TouristGalleryController.index);
router.get(
  "/api/tourist-gallery/attraction/:idAttraction",
  Auth,
  TouristGalleryController.attractionGallery
);
router.get("/api/tourist-gallery/:id", Auth, TouristGalleryController.detail);
router.post(
  "/api/tourist-gallery",
  Auth,
  upload.single("thumbnail"),
  TouristGallery.insert,
  TouristGalleryController.store
);
router.put(
  "/api/tourist-gallery/:id",
  Auth,
  upload.single("thumbnail"),
  TouristGallery.insert,
  TouristGalleryController.update
);
router.delete(
  "/api/tourist-gallery/:id",
  Auth,
  TouristGalleryController.delete
);

// PUBLIC API

// Attraction Detail
router.get(
  "/api/v1/attraction/:id([0-9]+)",
  TouristAttractionController.detail
);

// Popular Attraction
router.get("/api/v1/attraction/popular", TouristAttractionController.popular);

// get attraction gallery
router.get(
  "/api/v1/attraction/:id/gallery",
  TouristAttractionController.gallery
);

// Search Attraction
router.get(
  "/api/v1/attraction/search",
  TouristAttractionController.searchAttraction
);

// Category
router.get("/api/v1/category", CategoryController.all);

// Get Attraction
router.get("/api/v1/category/:id/attraction", CategoryController.getAttraction);

export default router;
