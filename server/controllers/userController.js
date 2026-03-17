const USER = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
}; // Generate JWT

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } // Validation
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } // Check if user exists
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password
    const user = await USER.create({
      fullName,
      email,
      password: hashedPassword,
    }); // Create user
    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ $or: [{ email }, { username: email }] }); // Find user (email or username)
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password); // Compare password
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser, registerUser };
