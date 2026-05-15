const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Experience", experienceSchema);
