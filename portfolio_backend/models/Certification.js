const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
  {
    institutionName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Education",
      required: true,
    },
    certificateName: { type: String, required: true },
    certificateImage: { type: String },
    certificateURL: { type: String },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
      },
    ],
    issueDate: { type: Date },
    expiryDate: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Certification", certificationSchema);
