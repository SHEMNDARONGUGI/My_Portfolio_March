const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institutionName: { type: String, required: true },
    courseTitle: { type: String, required: true },
    description: { type: String },

    completed: { type: Boolean, default: false },

    startDate: { type: Date },
    endDate: { type: Date, default: null },

    // allowing one to have multiple skills tied to one institution
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
      },
    ],

    //helps to control how things appear on my website
    order: { type: Number, default: 0 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  //
  { timestamps: true },
);

module.exports = mongoose.model("Education", educationSchema);
