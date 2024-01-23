const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


const {
  getAllProducts,
  getProductByID,
  getProductByCategoryID,
  updateProductByID,
  deleteProductByID,
  addProduct,
  getProductByCategory,



} = require("../controllers/ProductsControllers");
const {
 

  filterCakesByPrice,
  filterCakesByCategory,

} = require("../controllers/filter");


router.get("/getproducts", getAllProducts);
router.get("/filterPrice",  filterCakesByPrice);
router.get('/getcategory/:categoryName', getProductByCategory);
router.get("/getproducts/:productId", getProductByID);
router.get("/getproducts/category/:category_id", getProductByCategoryID);

router.post('/addproduct', upload.single('image'),addProduct);
router.put("/updateproducts/:Id", updateProductByID);
router.delete("/deleteproducts/:Id", deleteProductByID);


module.exports = router;
