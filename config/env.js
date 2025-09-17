import dotenv from "dotenv";

dotenv.config(); // Load variables from .env file

const ENV = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/dashboarddb",
  JWT_SECRET: process.env.JWT_SECRET || "yourSecretKey",
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development"
};

export default ENV;
    