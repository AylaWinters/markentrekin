var path = require("path");

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
  app.get("/blogform", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/blogform.html"));
  });
};
