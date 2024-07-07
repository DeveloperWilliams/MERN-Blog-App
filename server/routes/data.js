import express, { Router } from "express";
import BlogModel from "../model/Blog.js"

const router = express.Router();

router.post("/create-blog/", async (req, res) => {
  const { title, image, content, author } = req.body;
  try {
    const blog = new BlogModel({ title, image, content, author });
    await blog.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
