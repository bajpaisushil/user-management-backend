const User = require("../models/usermodel.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({email: req.body.email});
    if (existingUser) {
      throw new Error("User Already Exists with that email")
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
exports.login = async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(401).json({ message: "User is not registered" });
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "secret_key");

    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
