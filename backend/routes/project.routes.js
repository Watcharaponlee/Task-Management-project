const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const projectController = require("../controllers/project.controller");

router.post("/", authenticate, projectController.createProject);
router.get("/", authenticate, projectController.getAllProjects);
router.get("/:id", authenticate, projectController.getProjectById);
router.put("/:id", authenticate, projectController.updateProject);
router.delete("/:id", authenticate, projectController.deleteProject);

module.exports = router;
