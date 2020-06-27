const express = require("express");
const compression = require("compression");
const app = express();
const PORT = process.env.PORT || 8080;
const apiRoutes = require("./routes/APIroutes");
const connectDB = require("./config/db");
const methodOverride = require("method-override");

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(express.static("public"));
app.use(methodOverride("_method"));

require("./routes/HTMLroutes")(app);

app.use("/api", apiRoutes);

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
