// backend/routes/authRoutes.js
import express from "express";
import { home, register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// ✅ Home route
router.get("/", home);

// ✅ Auth routes
router.post("/register", register);
router.post("/login", login);

export default router;
