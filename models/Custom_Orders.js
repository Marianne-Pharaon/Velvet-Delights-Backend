const mongoose = require('mongoose');

const Custom_ordersSchema = new mongoose.Schema(
  {
    user_id: { type: Number},
    totalPrice: { type: Number },
    description: { type: String },
    product_image: { type: String, maxlength: 255 },
    flavor: [{ price: Number }],
    topping: [{ price: Number }],
    filling: [{ price: Number }],
    size: [{ price: Number }],
  },
  { timestamps: true }
);

const Custom_Orders = mongoose.model('Custom_Orders', Custom_ordersSchema);

module.exports = Custom_Orders;
