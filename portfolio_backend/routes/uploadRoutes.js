const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();
const upload = require("../middleware/multer"); // multer middleware
const { uploadImage } = require("../controllers/uploadController");

// POST /upload
router.use(protect);
router.use(authorize(["admin"]));
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
