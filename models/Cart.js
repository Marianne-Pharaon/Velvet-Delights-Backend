const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required:true},
  products_id:{type: mongoose.Schema.Types.ObjectId, ref: "Products"},
  Custom_orders_id: {type: mongoose.Schema.Types.ObjectId, ref: "Custom_orders"},
  total: { type: Number },
});

cartSchema.pre('save', function(next) {
  this.total = this.price * this.quantity_to_purchase;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
