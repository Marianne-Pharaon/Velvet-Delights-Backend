const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  price: { type: Number,  min: 0 },
  description: { type: String, required: true },
  image: { type: String },
  category:[{type:String, required:true}],
},{timestamps:true});

productSchema.statics.findByCategory = async function(category) {
  try {
    const products = await this.find({ category: category });
    return products;
  } catch (error) {
    throw new Error(`Error finding products by category: ${error.message}`);
  }
};

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
