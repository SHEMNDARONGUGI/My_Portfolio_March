const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  createService,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const router = express.Router();

//Public
router.get("/", getServices);
// Private/protected
router.use(protect);
router.use(authorize(["admin"]));
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
