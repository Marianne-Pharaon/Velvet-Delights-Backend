const Product = require("../models/Products");
const { imageUploader } = require('../extra/imageUploader');


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const addProduct = async (req, res) => {
//   try {
//     // Check if req.file is defined
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Image file is required",
//       });
//     }

//     const imageURL = await imageUploader(req);

//     // Check if imageURL is defined
//     if (!imageURL) {
//       return res.status(400).json({
//         success: false,
//         message: "Error uploading image",
//       });
//     }

//     // Create the product with the correct property name (product_image)
//     const product = await Product.create({
//       ...req.body,
//       product_image: imageURL, // Use the correct property name
//     });
//     res.status(200).json({
//       success: true,
//       message: "Product added successfully",
//       data: product,
//     });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(400).json({
//       success: false,
//       message: "Product not added successfully",
//       error: error.message,
//     });
//   }
// };



const addProduct = async (req, res) => {
  try {
    const imageURL = await imageUploader(req);

    const savedProduct = await Product.create({
      ...req.body,
      image: imageURL
    });

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const addProduct = async (req, res,next) => {
//   const {product_id, name, price, category_id, description,image, sizes}=req.body;
//   try {
//     const imageURL = await imageUploader(req.file);
//         const savedProduct = await Product.create({
//       ...req.body,
//       image: imageURL,
//     });
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
// //   }
// };



const getProductByID = async (req, res) => {
  try {
    const product = await Product.find({product_id:req.params.productId});
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve product by ID",
      error: error.message,
    });
  }
};

const getProductByCategoryID = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const products = await Product.find({ category_id: category_id });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Products not found for the given category_id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully by category_id",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve products by category_id",
      error: error.message,
    });
  }
};

const updateProductByID = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {product_id: req.params.productId},
      {$set:req.body},
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product not updated successfully",
      error: error.message,
    });
  }
};

const deleteProductByID = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete(
       {product_id:req.params.productId}
    );
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product not deleted successfully",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductByID,
  getProductByCategoryID,
  // getProductsByCategoryName,
  updateProductByID,
  deleteProductByID,
  addProduct,
};
