const cloudinary = require("../utils/cloudinary");

exports.uploadImage = (req, res) => {
  // The file comes from multer middleware
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error uploading image",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
};
