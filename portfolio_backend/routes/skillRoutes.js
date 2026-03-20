const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  createSkill,
  getSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");
const router = express.Router();

//Public
router.get("/", getSkill);

// Private
router.use(protect);
router.use(authorize(["admin"]));
router.post("/", createSkill);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);
module.exports = router;
