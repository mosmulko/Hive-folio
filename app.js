const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;

const nav = [
  // { link: "/books", title: "Books" },
  // { link: "/authors", title: "Authors" },
];

app.use(morgan("tiny"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(session({ secret: "library" }));

// require("./src/config/passport")(app);

app.use(express.static(path.join(__dirname, "public")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

// Routers
// const adminRouter = require("./src/routes/adminRoutes")(nav);
// const authRouter = require("./src/routes/authRoutes")(nav);
const projectRouter = require("./src/routes/projectRoutes")();

// app.use("/admin", adminRouter);
// app.use("/auth", authRouter);
app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contactForm.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.listen(port, () => {
  debug(`listening on the port ${chalk.green(port)}`);
});
