const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { client, serviceSid } = require("../config/twilioConfig");


// Register User and Send OTP
router.post("/otp/register", async (req, res) => {
    console.log("here")
  const { name, email, password, role, phone } = req.body;

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
      phone,
      isVerified: false, 
    });

    await user.save();

    
    await client.verify.services(serviceSid).verifications.create({
      to: `+${phone}`, // Ensure phone is in E.164 format (e.g., +1234567890)
      channel: "sms",
    });

    res.status(201).json({
      msg: "User registered successfully. OTP sent to your phone.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Server error");
  }
});

router.post("/otp/verify", async (req, res) => {
  const { userId, otp } = req.body;

  try {
   
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

   
    const verificationCheck = await client.verify.services(serviceSid).verificationChecks.create({
      to: `+${user.phone}`,
      code: otp,
    });

    if (verificationCheck.status !== "approved") {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

  
    user.isVerified = true;
    await user.save();

    res.status(200).json({ msg: "User verified successfully" });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
