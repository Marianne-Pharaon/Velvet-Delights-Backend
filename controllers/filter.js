const Product = require("../models/Products");

const filterCakesByPrice = async (req, res) => {
    try {
        const { min, max, sort } = req.query;
        const sortOrder = sort === 'desc' ? -1 : 1;
    
        const products = await Product.find({ category_id: 1, price: { $gte: min, $lte: max } })
          .sort({ price: sortOrder });
    
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
  };
  
  const filterProductsByCategory = async (req, res) => {
    try {
      const category = req.params.categoryName;
      const products = await Product.findByCategory(category);
  
      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Products not found for the category: ${category}`,
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully by category',
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Unable to retrieve products by category',
        error: error.message,
      });
    }
  };
  
  

module.exports = {
 
    filterCakesByPrice,
    filterProductsByCategory};
