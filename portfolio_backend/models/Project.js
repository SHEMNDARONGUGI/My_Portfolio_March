const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectTitle: { type: String, required: true, unique: true, trim: true },
    projectImage: { type: String },
    projectDescription: { type: String, required: true, trim: true },
    projectStack: [{ type: String, required: true, trim: true }],
    tags: [{ type: String, trim: true }],
    projectGithubURL: { type: String },
    projectURL: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Project", projectSchema);
