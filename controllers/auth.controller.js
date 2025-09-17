import User from "../models/user.model.js";
import bcrypt from "bcryptjs";   

// ✅ Home Route
export const home = (req, res) => {
  res.status(200).send("Welcome to portfolio tracker using controllers");
};

// ✅ Register Route
export const register = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;

    // check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      const error = new Error("Email already exists");
      error.status = 400;
      throw error; // middleware handle karega
    }

    // create new user (password hashing schema me ho raha hai)
    const newUser = new User({ username, email, password, phone });
    await newUser.save();

    // generate token
    const token = newUser.generateToken();

    res.status(201).json({
      msg: "Registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    next(error); // ✅ errorMiddleware ko pass hoga
  }
};

// ✅ Login Route
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 400;
      throw error;
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.status = 400;
      throw error;
    }
    
    // generate token
    const token = user.generateToken();
    
    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error)
    next(error); // ✅ middleware handle karega
  }
};
