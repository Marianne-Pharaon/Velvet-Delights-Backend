const mongoose = require('mongoose');

const Custom_ordersSchema = new mongoose.Schema(
  {
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required:true},
    totalPrice: { type: Number },
    description: { type: String },
    product_image: { type: String, maxlength: 255 },
    flavor: [{ name: String ,price: Number }],
    topping: [{name: String, price: Number }],
    filling: [{name: String, price: Number }],
    size: [{ name: String,price: Number }],
  },
  { timestamps: true }
);

const Custom_Orders = mongoose.model('Custom_Orders', Custom_ordersSchema);

module.exports = Custom_Orders;
