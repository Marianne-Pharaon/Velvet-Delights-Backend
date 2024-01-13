const Carts = require("../models/Cart");

const getAllCarts = async (req, res) => {
  try {
    const data = await Carts.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(404).send("Internal Server Error");
  }
};

const getCartsById = async (req, res) => {
  try {
    const carts = await Carts.find({ user_id: req.params.id });

    if (carts.length === 0) {
      return res.status(404).json({ msg: "No products added by this user" });
    }

    res.json(carts);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server Error");
  }
};

const addCarts = async (req, res) => {
  try {
    const cart = new Carts({
      user_id: req.body.user_id,
      products_id: req.body.products_id,
      quantity_to_purchase: req.body.quantity_to_purchase,
      price: req.body.price,
      product_name: req.body.product_name,
    });
    const savedCart = await cart.save();

    res.status(200).json({
      code: 200,
      message: "Cart added successfully",
      data: savedCart,
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: "Cart not added successfully",
      error: err.message,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Carts.deleteOne({ user_id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
      cart: cart,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Error occurred while deleting cart",
      error: err,
    });
  }
};

const deleteCartsByUserId = async (req, res) => {
  try {
    const result = await Carts.deleteMany({ user_id: req.params.user_id });

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "All carts for the user deleted successfully",
        deletedCount: result.deletedCount,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No carts found for the user",
        deletedCount: result.deletedCount,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting carts",
      error: err.message,
    });
  }
};

module.exports = {
  getAllCarts,
  getCartsById,
  deleteCart,
  deleteCartsByUserId,
  addCarts,
};
