const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const users = await User.find(); 
   
    res.status(200).json(users); // Send users as JSON response
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
});


router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
   
    if (!["admin", "organizer", "invitee"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

   
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    user = new User({
      name,
      email,
      password: hashedPassword,
      role, 
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

    
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
});



module.exports = router; 