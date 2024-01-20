const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  price: { type: Number,  min: 0 },
  description: { type: String, required: true },
  image: { type: String },
  sizes: [{ price: {type:Number}, size: {type:String}}],
  category:[{type:String, required:true}],
},{timestamps:true});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
