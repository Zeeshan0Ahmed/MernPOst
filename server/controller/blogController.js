const blogModel = require("../models/blogModel");

exports.getAllBlogs = async (req, res) => {
  try {
    const fetchAllBlogs = await blogModel.find({ user: req.user._id });
    res.status(200).json({ fetchAllBlogs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.addNewBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (title && category && description) {
      const addBlog = await blogModel.create({
        title,
        description,
        category,
        thumbnail: req.file.filename,
        user: req.user._id,
      });
      return res.status(200).json({ message: "Blog Added successfully" });
    } else {
      return res.status(400).json({ message: "All field are required" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const fetchBlogById = await blogModel.findById(id);
      return res.status(200).json({ fetchBlogById });
    } else {
      return res.status(400).json({ message: "Invalid User" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
