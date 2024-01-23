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
  
  const filterCakesByCategory = async (req, res) => {
    try {
      const categoryName = req.params.categoryName;
      const products = await Product.find({ 'category': categoryName });
  
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  

module.exports = {
 
    filterCakesByPrice,
    filterCakesByCategory,
};
