const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
  createContact,
  getContact,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

//PUBLIC
router.post("/", createContact);

//PRIVATE/admin
router.use(protect);
router.use(authorize(["admin"]));
router.get("/", getContact);
router.patch("/:id", updateContactStatus);
router.delete("/:id", deleteContact);

module.exports = router;
