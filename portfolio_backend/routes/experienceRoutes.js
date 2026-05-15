const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");
const router = express.Router();

// Public
router.get("/", getExperiences);

//Private
router.use(protect);
router.use(authorize(["admin"]));
router.post("/", createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

module.exports = router;
