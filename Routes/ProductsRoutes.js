const express = require("express");
const router = express.Router();
const multer = require("multer");
// const storage = multer.memoryStorage();
const upload = multer({ storage: multer.memoryStorage() });


const {
  getAllProducts,
  getProductByID,
  getProductByCategoryID,
  updateProductByID,
  deleteProductByID,
  addProduct,
} = require("../controllers/ProductsControllers");

router.get("/getproducts", getAllProducts);
router.get("/getproducts/:productId", getProductByID);
router.get("/getproducts/category/:category_id", getProductByCategoryID);
router.post("/addproducts", upload.single('image'),addProduct);
router.put("/updateproducts/:productId", updateProductByID);
router.delete("/deleteproducts/:productId", deleteProductByID);
module.exports = router;
