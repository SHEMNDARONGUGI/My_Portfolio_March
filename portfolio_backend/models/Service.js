const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceTitle: { type: String, required: true, unique: true },
    serviceImage: { type: String },
    serviceDescription: { type: String, required: true },
    tags: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Service", serviceSchema);
