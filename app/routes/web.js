import express from "express";
import { User, Category } from "../middleware/Validation";
import UserController from "../controllers/UserController";
import CategoryController from "../controllers/CategoryController";
import Auth from "../middleware/Auth";

const router = express.Router();

router.post("/api/user", User.insert, UserController.store);
router.post("/api/auth", User.auth, UserController.auth);

router.get("/api/me/", Auth, UserController.detail);

router.get("/api/category", [Auth], CategoryController.index);
router.get("/api/category/:id", [Auth], CategoryController.detail);
router.post("/api/category", [Auth], Category.insert, CategoryController.store);
router.put("/api/category/:id", [Auth], CategoryController.update);
router.delete("/api/category/:id", [Auth], CategoryController.delete);

export default router;
