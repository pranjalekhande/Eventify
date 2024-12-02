const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    // Log the users to the console
    res.status(200).json(users); // Send users as JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
});


// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Ensure role is valid
    if (!["admin", "organizer", "invitee"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the provided role
    user = new User({
      name,
      email,
      password: hashedPassword,
      role, // Explicitly set the role
    });

    await user.save();
    res.status(201).json({ msg: "User created successfully", user });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Include the role in the token payload
    const payload = {
      user: {
        id: user.id,
        role: user.role, // Ensure role is included here
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
});


// Protected route example
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: `Welcome user ${req.user}` });
});

module.exports = router; 