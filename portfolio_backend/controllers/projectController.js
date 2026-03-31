const Project = require("../models/Project");

// POST api/projects
exports.createProject = async (req, res) => {
  try {
    const {
      projectTitle,
      projectImage,
      projectDescription,
      projectStack,
      tags,
      projectGithubURL,
      projectURL,
    } = req.body;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized. Admins only" });
    }
    const project = await Project.create({
      projectTitle,
      projectImage,
      projectDescription,
      projectStack,
      tags,
      projectGithubURL,
      projectURL,
      owner: req.user.id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ startDate: -1 });
    if (!projects || projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No project records found",
      });
    }
    res
      .status(200)
      .json({ success: true, count: projects.length, projects: projects });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this item" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete api/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res
        .status(403)
        .json({ message: "Not authorized to delete this item" });

    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
