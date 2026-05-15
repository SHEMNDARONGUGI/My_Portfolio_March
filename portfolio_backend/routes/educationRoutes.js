const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  addEducation,
  getEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationController");
const router = express.Router();

// PUBLIC
router.get("/", getEducation);

//PRIVATE
router.use(protect);
router.use(authorize(["admin"]));
router.post("/", addEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

module.exports = router;
