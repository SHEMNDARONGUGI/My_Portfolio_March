const Certification = require("../models/Certification");

// POST api/certifications
exports.createCertification = async (req, res) => {
  try {
    const {
      institutionName,
      certificateName,
      certificateImage,
      certificateURL,
      skills,
      issueDate,
      expiryDate,
    } = req.body;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized. Admins only" });
    }
    const certification = await Certification.create({
      institutionName,
      certificateName,
      certificateImage,
      certificateURL,
      skills,
      issueDate,
      expiryDate,
      owner: req.user.id,
    });
    res.status(201).json(certification);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//GET api/certifications
exports.getCertification = async (req, res) => {
  try {
    const certificates = await Certification.find()
      .populate("institutionName", "institutionName")
      .populate("skills", "title")
      .lean();

    if (!certificates || certificates.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No certificaton records found",
      });
    }
    res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//PUT api/certifications/:id
exports.updateCertification = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update" });
    }
    const updatedCertificate = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedCertificate)
      return res.status(404).json("Certificate not found");
    res.status(200).json(updatedCertificate);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE api/certifications/id
exports.deleteCertification = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update" });
    }
    const deletedCertification = await Certification.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedCertification)
      return res.status(404).json({ message: "certificate not found" });
    res.status(200).json({ message: "Certification Deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
