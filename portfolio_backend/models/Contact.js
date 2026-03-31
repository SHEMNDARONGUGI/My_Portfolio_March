const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    phoneNumber: { type: String, trim: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "responded"],
      default: "pending",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Contact", contactSchema);
