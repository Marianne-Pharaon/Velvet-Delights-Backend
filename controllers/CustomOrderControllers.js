const Custom_Orders = require("../models/Custom_Orders");

const createCustomOrder = async (req, res) => {
  console.log(req.body);
  try {
    const customOrder = new Custom_Orders({...req.body, flavor: JSON.parse(req.body.flavor), filling: JSON.parse(req.body.filling), size:JSON.parse(req.body.size), topping:JSON.parse(req.body.topping)}
    );
    const savedCustomOrder = await customOrder.save();
    res.status(201).json(savedCustomOrder);
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Custom order not created successfully",
      error: error.message,
    });
  }
};

const getAllCustomOrders = async (req, res) => {
  try {
    const customOrders = await Custom_Orders.find();
    res.status(200).json(customOrders);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error occurred while fetching custom orders",
      error: error.message,
    });
  }
};

const getCustomOrderById = async (req, res) => {
  const { userId } = req.params.userId;
  try {
    const customOrder = await Custom_Orders.findOne(userId);
    console.log(customOrder);
    if (!customOrder) {
      return res.status(404).json({ msg: "Custom order not found" });
    }
    res.status(200).json(customOrder);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error occurred while fetching custom order by ID",
      error: error.message,
    });
  }
};
  


const updateCustomOrderById = async (req, res) => {
  const { user_Id } = req.params;
  try {
    const updatedCustomOrder = await Custom_Orders.findByIdAndUpdate(
     user_Id,
      req.body,
      { new: true }
    );
    if (!updatedCustomOrder) {
      return res.status(404).json({ msg: "Custom order not found" });
    }
    res.status(200).json(updatedCustomOrder);
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error occurred while updating custom order by ID",
      error: error.message,
    });
  }
};

const deleteCustomOrderById = async (req, res) => {
  const { user_Id } = req.params;
  try {
    const deletedCustomOrder = await Custom_Orders.findByIdAndDelete(user_Id);
    if (!deletedCustomOrder) {
      return res.status(404).json({ msg: "Custom order not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error occurred while deleting custom order by ID",
      error: error.message,
    });
  }
};

module.exports = {
  createCustomOrder,
  getAllCustomOrders,
  getCustomOrderById,
  updateCustomOrderById,
  deleteCustomOrderById,
};
