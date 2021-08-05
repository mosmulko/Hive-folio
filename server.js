const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

// const projectRouter = require("./src/routes/projectRoutes")();

// app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contactForm.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});
app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "gallery.html"));
});

app.listen(port, () => {
  debug(`listening on the port ${chalk.green(port)}`);
});
