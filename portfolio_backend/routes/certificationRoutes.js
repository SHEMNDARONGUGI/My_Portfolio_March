const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();
const {
  createCertification,
  getCertification,
  updateCertification,
  deleteCertification,
} = require("../controllers/certificationController");

// PUBLIC: all can view certification
router.get("/", getCertification);

// PROTECTED/ADMIN: Only admins can modify data
router.use(protect);
router.use(authorize(["admin"]));
router.post("/", createCertification);
router.put("/:id", updateCertification);
router.delete("/:id", deleteCertification);

module.exports = router;
