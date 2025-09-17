import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const URI = process.env.MONGODB_URI;

if (!URI) {
  console.error("MONGODB_URI is not defined in .env file");
  process.exit(1);
}

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDb;
