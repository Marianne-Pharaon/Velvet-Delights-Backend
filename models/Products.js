const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  name: { type: String, required: true, maxlength: 100 },
  price: { type: Number, required: true, min: 0 },
  category_id: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, maxlength: 255 },
  sizes: [{ price: Number, size: String }],
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
