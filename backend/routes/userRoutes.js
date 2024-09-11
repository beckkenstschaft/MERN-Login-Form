const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    // If passwords match, login successful
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
