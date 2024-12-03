const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Middleware to ensure admin access
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};

// Fetch all users (Admin only)
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    console.log(users)
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
});  

// Delete a user (Admin only)
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await user.deleteOne();
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Server error");
  }
});

// Update a user (Admin only)
router.put("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
    console.log("in edit")
  const { name, email, role ,phone} = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.phone = phone || user.phone

    await user.save();
    res.json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
