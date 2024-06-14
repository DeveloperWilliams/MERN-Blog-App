import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Usermodel from "../model/User.js";

const router = express.Router();

//nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "archywilliams2@gmail.com",
    pass: "kfsr ntuc uzkg wnen",
  },
});

//register route
router.post("/register", async (req, res) => {
  const { email, password, confirmedPassword } = req.body;

  if (password !== confirmedPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(confirmedPassword, 10);
    const user = new Usermodel({ email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const url = `http://localhost:5173/verify/${token}`;

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

//token verifying token
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

export default router;
