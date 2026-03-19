const Experience = require("../models/Experience");

// POST api/experiences
exports.createExperience = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized. Admins only" });
    }
    const experience = await Experience.create({
      ...req.body,
      owner: req.user.id,
    });
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//GET api/experiences/
exports.getExperiences = async (req, res) => {
  try {
    // Sort by 'startDate' or 'createdAt' in descending order (-1) -- the most recent experience to be at the top
    //using .populate("skills") replaces with actual skill rather than the IDS
    const experiences = await Experience.find()
      .sort({ startDate: -1 })
      .populate("skills");
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT api/experiences/:id
exports.updateExperience = async (req, res) => {
  try {
    // Only admin can update
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this experience" });
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE api/experiences/:id
exports.deleteExperience = async (req, res) => {
  try {
    // only admin can delete
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this experience" });
    }

    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);

    if (!deletedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    //bad request
    res.status(400).json({ message: error.message });
  }
};
