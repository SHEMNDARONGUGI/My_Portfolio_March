const Skill = require("../models/Skill");

// POST api/skills
exports.createSkill = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { icon, title, category, proficiency } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }
    const skill = await Skill.create({
      icon,
      title,
      category,
      proficiency,
      owner: req.user.id,
    });
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    return res.status(500).json({ message: `Server error ${error.message}` });
  }
};

//PUT api/skills
exports.getSkill = async (req, res) => {
  try {
    const skills = await Skill.find();
    if (!skills || skills.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No skill records found",
      });
    }

    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT api/skill/:id
exports.updateSkill = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedSkill) {
      return res
        .status(404)
        .json({ status: "fail", message: "Skill not found" });
    }
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//DELETE api/skill/:id
exports.deleteSkill = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res
        .status(403)
        .json({ message: "Not authorized to delete this item" });

    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

    if (!deletedSkill)
      return res.status(404).json({ message: "Skill not found" });

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
