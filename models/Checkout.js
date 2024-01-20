const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
  // user_id: { type: Number, required: true },
  // order_id: { type: Number, required: true },
  FullName:{type: String, required: true},
  product_id: { type: Number, required: true },
  custom_orders_id: { type: Number, required: true },
  Due_date: { type: Date, required: true },
  total: { type: Number },
  address: { type: String, required: true },
  Card: {
    NameOnCard: String,
    CardNumber: Number
  }
});

const Checkout= mongoose.model('Checkout',CheckoutSchema);

module.exports = Checkout;
