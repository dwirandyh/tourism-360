import express from "express";
import { User, Category } from "../middleware/Validation";
import UserController from "../controllers/UserController";
import CategoryController from "../controllers/CategoryController";

const router = express.Router();

router.post("/api/user", User.insert, UserController.store);
router.post("/api/auth", User.auth, UserController.auth);

router.get("/api/category", CategoryController.index);
router.get("/api/category/:id", CategoryController.detail);
router.post("/api/category", Category.insert, CategoryController.store);
router.put("/api/category/:id", CategoryController.update);
router.delete("/api/category/:id", CategoryController.delete);

export default router;
