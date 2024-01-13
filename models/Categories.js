const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  cat_Name: {  type: String,required: true,},
  category_id: {type: Number, required: true},
});

const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;
