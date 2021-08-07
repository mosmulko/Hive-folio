import express from "express";
import path from "path";
// import React from "react";
// import { renderToString } from "react-dom/server";
// import Gallery from "../components/Gallery";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.config.dev.js";

const app = express(),
  compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);
app.use(webpackHotMiddleware(compiler));

// app.use(express.static(path.join(__dirname, "public")));

app.set("views", "./src/views");
// app.set("view engine", "ejs");

// app.get("/gallery", (req, res) => {
//   const component = renderToString(<Gallery />);
//   res.render("gallery", { component });
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "gallery.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on the port ${port}`);
});
