const express = require("express");
const router = express.Router();
const sendMail = require("../public/mail");

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
    desc: req.body.desc,
    blog: req.body.blog,
  });
  try {
    await blog.save();
    res.redirect("/blogpage");
    res.status(201).json(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/contact", async (req, res) => {
  console.log("contact req.body", req.body);

  const { fname, lname, email, body } = req.body;
  sendMail(fname, lname, email, body, (err, data) => {
    if (err) {
      res.status(500).json({ message: "internal error" });
    } else {
      res.redirect("/success");
    }
  });
});

router.put("/blog/edit/:id", async (req, res) => {
  await BlogForm.findById(req.params.id);
  res.send("hello");
});

router.delete("/:id", async (req, res) => {
  await BlogForm.findByIdAndDelete(req.params.id);
  res.redirect("/blogpage");
});

module.exports = router;
