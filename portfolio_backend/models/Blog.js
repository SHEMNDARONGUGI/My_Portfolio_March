const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogImage: { type: String },
    blogTitle: { type: String, required: true, unique: true },
    blogContent: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
