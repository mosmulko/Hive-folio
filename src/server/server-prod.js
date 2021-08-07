import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import Gallery from "../components/Gallery";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/gallery", (req, res) => {
  const component = renderToString(<Gallery />);
  res.render("gallery", { component });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "gallery.html"));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on the port ${port}`);
});
