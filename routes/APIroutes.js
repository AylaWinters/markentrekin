const express = require("express");
const router = express.Router();

const BlogForm = require("../models/blogform");

router.get("/blog", async (req, res) => {
  try {
    const blogs = await BlogForm.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/blog", async (req, res) => {
  console.log("req.body", req.body);
  const blog = new BlogForm({
    title: req.body.title,
    blog: req.body.blog,
  });
  try {
    await blog.save();
    res.redirect("/blog");
    res.status(201).json(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
