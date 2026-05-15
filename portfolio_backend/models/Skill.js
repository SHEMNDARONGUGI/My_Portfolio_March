const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    // to show skill icon
    icon: { type: String, default: "none" },

    title: { type: String, required: true, unique: true },

    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "Devops",
        "Tools",
        "IT Helpdesk",
        "Others",
      ],
      default: "Others",
    },

    proficiency: { type: Number, min: 1, max: 10, default: 5 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skills", skillSchema);
