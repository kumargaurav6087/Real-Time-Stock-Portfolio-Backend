import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";       
import dashboardRoutes from "./routes/dashboardRoutes.js"; 
import stockRoutes from "./routes/stockRoutes.js"; // ✅ Added
import connectDb from "./config/db.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";1

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
}));
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stocks", stockRoutes); // ✅ Stock routes

// ✅ Error handler
app.use(errorMiddleware);

// ✅ Test Routes
app.get("/", (req, res) => {
  res.status(200).send("Welcome to portfolio tracker");
});

const PORT = process.env.PORT;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at port : ${PORT}`);
  });
});
