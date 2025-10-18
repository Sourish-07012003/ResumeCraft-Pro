// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // @desc Register a new user
// export const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({ name, email, password });
//     if (user) {
//       res.status(201).json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(400).json({ message: "Invalid user data" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc Login user
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
// ✅ Logout User
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("❌ Logout Error:", error);
    res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};