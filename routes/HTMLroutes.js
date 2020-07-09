const path = require("path");
const Blogform = require("../models/blogform");

module.exports = (app) => {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  app.get("/speeches", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/speeches.html"));
  });
  app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });
  app.get("/blog", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });
  app.get("/blogpage", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/blogpage.html"));
  });
  app.get("/success", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/thankyou.html"));
  });
  app.get("/blog/:id", async function (req, res) {
    try {
      const blog = await Blogform.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ msg: "Blog not found" });
      }
      res.json(blog);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Blog not found" });
      }
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  app.get("/blogform", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/blogform.html"));
  });
  app.get("/blog/edit/:id", async (req, res) => {
    // const blog = await BlogForm.findById(req.params.id);
    res.sendFile(path.join(__dirname, "../public/editblog.html"));
  });
};
