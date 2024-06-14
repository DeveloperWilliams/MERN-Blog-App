import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { verifyToken } from "../middleware/authMiddleware";
import User from "../model/User";
//declaring router
const router = express.Router();

//nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "archywilliams2@gmail.com",
    pass: "kfsr ntuc uzkg wnen",
  },
});

//registaring
router.post("/register", async (req, res) => {
  const { email, password, confirmedPassword } = req.body;

  if (password !== confirmedPassword) {
    return res.status(400).json({ message: "Password do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(confirmedPassword, 10);
    const user = new User({ email, password: hashedPassword });
    user.save();

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const url = `http://localhost:5173/verift${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: `Verify Email`,
      text: `Please click on the link to verify, ${url}`,
    });

    res.status(201).json({ message: "User Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
