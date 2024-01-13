const Checkout = require("../models/Checkout");

const getAllCheckouts = async (_, res) => {
  try {
    const data = await Checkout.find({});
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const deleteCheckout = async (req, res) => {
  try {
    const deletedCheckout = await Checkout.deleteOne({
     user_id: req.params.user_id,
    });

    if (deletedCheckout.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found for deletion",
      });
    }

    res.status(200).json({
      success: true,
      message: "Checkout deleted successfully",
      data: deletedCheckout,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting Checkout",
      error: err.message,
    });
  }
};

const addCheckout = async (req, res) => {
  try {
    const {
      user_id,
      order_id,
      product_id,
      custom_orders_id,
      Due_date,
      total,
      address,
      Card,
    } = req.body;

    const checkout = new Checkout({
      user_id,
      order_id,
      product_id,
      custom_orders_id,
      Due_date,
      total,
      address,
      Card,
    });

    const savedCheckout = await checkout.save();

    res.status(201).json({
      success: true,
      message: "Checkout added successfully",
      data: savedCheckout,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Checkout not added successfully",
      error: err.message,
    });
  }
};

module.exports = {
  getAllCheckouts,
  deleteCheckout,
  addCheckout,
};
