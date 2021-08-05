const debug = require("debug")("app:projectController");
const projects = require("../../../projectsAPI");

function projectController() {
  function getIndex(req, res) {
    res.render("projectsListView", { projects });
  }
  function getById(req, res) {
    const { route } = req.params;
    const index = projects.findIndex((obj) => obj.route === route);
    const project = projects[index];
    res.render("projectView", { project });
  }
  return {
    getIndex,
    getById,
  };
}

module.exports = projectController;
