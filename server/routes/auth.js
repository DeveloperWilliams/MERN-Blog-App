import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Usermodel from "../model/User.js";

const router = express.Router();

// nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
});

// Register route
router.post("/register", async (req, res) => {
  const { email, password, confirmedPassword } = req.body;

  if (password !== confirmedPassword) {
    return res.status(400).json({ message: "Passwords Do Not Match" });
  }

  try {
    // Check if the email already exists
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Usermodel({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const url = `http://localhost:5173/verify/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: `Verify Email`,
      text: `Please click on the link to verify: ${url}`,
    });

    res.status(201).json({ message: "User Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Token verifying route
router.get(`/verify/:token`, async (req, res) => {
  try {
    const { token } = req.params;
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Usermodel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    user.isVerified = true;
    await user.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email Not Found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Email Not Verified", redirect: "/notverified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password Does Not Match" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login Successful", redirect: "/home" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Forgot password route
router.post("/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Usermodel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email Not Found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const url = `http://localhost:5173/reset/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: `Reset Password`,
      text: `Click the link to reset your password: ${url}`,
    });

    res.status(200).json({ message: "Reset Link Sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reset password route
router.post("/reset/:token", async (req, res) => {
  const { token } = req.params;
  const { password, confirmedPassword } = req.body;

  if (password !== confirmedPassword) {
    return res.status(400).json({ message: "Passwords Do Not Match" });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Usermodel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password Updated", redirect: "/login" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
