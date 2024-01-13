const mongoose = require('mongoose');

const Custom_ordersSchema = new mongoose.Schema({
  customOrder_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  Due_date: { type: Date, required: true },
  totalPrice: { type: Number },
  description: { type: String },
  product_image: {type: String, maxlength: 255},
  status: { type: String, required: true },
 Order:[{ flavor: [{price: Number,}],
  topping: [{price: Number,}],
  filling: [{price: Number,}],
  size: [{price: Number,}]
}]
 
}, {timestamps:true});

const Custom_Orders = mongoose.model('Custom_Orders', Custom_ordersSchema);

module.exports = Custom_Orders;
