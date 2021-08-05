const morgan = require("morgan");
const debug = require("debug")("server");
const express = require("express");
const path = require("path");
const React = require("react");
import { renderToString } from "react-dom/server";
import Gallery from "./src/client/Components/Gallery";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/gallery", (req, res) => {
  const component = renderToString(<Gallery />);
  res.render("gallery", { component });
});

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
  debug(`listening on the port ${port}`);
});
