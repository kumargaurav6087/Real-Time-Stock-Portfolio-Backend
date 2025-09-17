// backend/routes/dashboardRoutes.js
import express from "express";
import { 
  getDashboard, 
  addStock, 
  updateStock, 
  deleteStock 
} from "../controllers/dashboardController.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getDashboard);
router.post("/add", protect, addStock);
router.put("/update/:stockId", protect, updateStock);
router.delete("/delete/:stockId", protect, deleteStock);

export default router;
