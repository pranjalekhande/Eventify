const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Route to fetch all users (admin only)
router.get("/users", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from the response
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
});

// Route to update a user's role (admin only)
router.put("/users/:userId/role", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  const { role } = req.body;

  try {
    // Validate the role
    if (!["admin", "organizer", "invitee"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.role = role;
    await user.save();

    res.json({ msg: `User role updated to "${role}"`, user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send("Server error");
  }
});

// Route to delete a user (admin only)
router.delete("/users/:userId", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await user.deleteOne();
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
