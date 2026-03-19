const Blog = require("../models/Blog");

// POST api/blogs
exports.createBlog = async (req, res) => {
  const blog = await Blog.create({ ...req.body, owner: req.user.id });
  res.json(blog);
};

//Get /api/blogs/me
exports.getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
