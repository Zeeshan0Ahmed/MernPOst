const categoryModel = require("../models/categoryModel");

exports.getAllCategories = async (req, res) => {
  try {
    const fetchAllCategories = await categoryModel.find({});
    res.status(200).json({
      fetchAllCategories,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.addNewCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const newCategory = await categoryModel.create({ title });
    res.status(200).json({
      message: "Category Added Successfull",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
