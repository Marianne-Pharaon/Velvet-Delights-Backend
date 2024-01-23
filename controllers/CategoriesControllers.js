const Categories = require("../models/Categories");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a category by category_id
const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findOne({ category_id: req.params.category_id });

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(500).send("Server Error");
  }
};
const getCategoryByName = async (req, res) => {
  try {
    const category = await Categories.findOne({  cat_Name: req.params. cat_Name });

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(500).send("Server Error");
  }
};

// Add a new category
const addCategory = async (req, res) => {
  try {
    const { cat_Name, category_id } = req.body;

    const newCategory = new Categories({
      cat_Name,
      category_id,
    });

    await newCategory.save();

    res.json(newCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update category by category_id
const updateCategoryById = async (req, res) => {
  try {
    const category = await Categories.findOneAndUpdate(
      { category_id: req.params.category_id },
      { $set: req.body },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete category by category_id
const deleteCategoryById = async (req, res) => {
  try {
    const deletedCategory = await Categories.findOneAndDelete({ category_id: req.params.category_id });

    if (!deletedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getCategoryByName,
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategoryById,
  deleteCategoryById,
};
