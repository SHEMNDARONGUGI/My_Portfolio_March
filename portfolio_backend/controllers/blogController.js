const Blog = require("../models/Blog");

// POST api/blogs
exports.createBlog = async (req, res) => {
  const blog = await Blog.create({ ...req.body, owner: req.user.id });
  res.json(blog);
};

//Get /api/blogs/me
exports.getMyBlogss = async (req, res) => {
  const tasks = (await Blog.find({ isPublished: true })).sort({ date: -1 });
  res.json(tasks);
};
