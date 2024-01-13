const express = require("express");
const router = express.Router();


const {
    
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById,
  } = require("../controllers/CategoriesControllers");


router.get("/getcategories", getAllCategories);
router.get("/getcategories/:category_id", getCategoryById);
router.post("/addcategories", addCategory);
router.put("/updatecategories/:category_id", updateCategoryById);
router.delete("/deletecategories/:category_id", deleteCategoryById);

module.exports = router;
