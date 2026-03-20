const Education = require("../models/Education");

//POST api/education
exports.addEducation = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized. Admins only" });
    }

    const {
      institutionName,
      courseTitle,
      description,
      completed,
      startDate,
      endDate,
      skills,
    } = req.body;

    if (!institutionName || !courseTitle) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    const education = await Education.create({
      institutionName,
      courseTitle,
      description,
      completed,
      startDate,
      endDate,
      skills,
      owner: req.user.id,
    });

    res.status(201).json({ success: true, education: education });
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error.message}` });
  }
};

// GET api/education
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.find().populate("skills").lean();

    if (!education || education.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No education records found",
      });
    }

    res
      .status(200)
      .json({ success: true, count: education.length, education: education });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT api/education/:id
exports.updateEducation = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized. Admins only" });
    }
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedEducation)
      return res.status(404).json({ message: "Education not found" });

    res.status(200).json(updatedEducation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//DELETE api/education/:id
exports.deleteEducation = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized. Admins only" });
    }

    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation)
      return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
