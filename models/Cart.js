const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: { type: Number},
  products_id: {type: Number },
  order_id: { type: Number},
  Custom_orders_id: {type: Number },
  total: { type: Number },
});

cartSchema.pre('save', function(next) {
  this.total = this.price * this.quantity_to_purchase;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
