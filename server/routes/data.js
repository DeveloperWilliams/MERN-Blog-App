import express from "express";
import BlogModel from "../model/Blog.js";

const router = express.Router();

router.post("/create-blog/", async (req, res) => {
  const { title, image, content, author } = req.body;
  try {
    const blog = new BlogModel({ title, image, content, author });
    await blog.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/delete-blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/update-blog/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image, content } = req.body;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = title || blog.title;
    blog.image = image || blog.image;
    blog.content = content || blog.content;

    await blog.save();
    res.status(200).json({ message: "Blog Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
