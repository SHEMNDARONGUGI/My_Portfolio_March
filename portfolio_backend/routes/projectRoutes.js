const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const router = express.Router();

//public
router.get("/", getProjects);

//private
router.use(protect);
router.use(authorize(["admin"]));

router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
