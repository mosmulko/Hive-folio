const morgan = require("morgan");
const debug = require("debug")("server");
const express = require("express");
const path = require("path");
const React = require("react");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
import { renderToString } from "react-dom/server";
import Gallery from "../components/Gallery";

const app = express();
const port = process.env.PORT || 3000;

const config = require("../../webpack.config.dev.js");
const compiler = webpack(config);

app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

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

app.listen(port, () => {
  debug(`listening on the port ${port}`);
});
