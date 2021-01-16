const express = require("express");
const projectController = require("../controllers/projectController");
// const projects = require("../../projectsAPI");

const projectRouter = express.Router();

const router = () => {
  const { getIndex, getById } = projectController();
  // projectRouter.use(middleware);
  projectRouter.route("/").get(getIndex);
  projectRouter.route("/:route").get(getById);

  return projectRouter;
};

module.exports = router;
