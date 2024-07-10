import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Usermodel from "../model/User.js";
import { body, validationResult } from "express-validator";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "archywilliams2@gmail.com",
    pass: "kfsr ntuc uzkg wnen",
  },
});

// Register route
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isStrongPassword().withMessage("Use a strong Password"),
    body("confirmedPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the email already exists.
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
        html: `Please click on the link to verify: <a href="${url}">Here</a>`,
      });

      res.status(201).json({ message: "User Created, Verify Email Now" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

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

    res.status(200).json({ message: "Verified", redirect: "/login" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    

    const { email, password } = req.body;

    try {
      const user = await Usermodel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email Not Found" });
      }

      if (!user.isVerified) {
        return res
          .status(400)
          .json({ message: "Email Not Verified", redirect: "/not-verified" });
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
  }
);

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

    const url = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: `Reset Password`,
      html: `<h3>Reset your password by clicking <a href="${url}">here</a></h3>`,
    });

    res.status(200).json({ message: "Reset Link Sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reset password route
router.post(
  "/reset/:token",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmedPassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token } = req.params;
    const { password } = req.body;

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
  }
);

router.get("/protected", verifyToken, (req, res, next) => {
  res.status(200).json({ message: "This protected route", user: req.user });
});

export default router;
