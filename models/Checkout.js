const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required:true},
  product_id: { type: String },
  fullName:{type:String },
  email:{type:String},
  custom_orders_id: { type: Number },
  Due_date: { type: Date,  },
  total: { type: Number },
  address: { type: String, },
  payment:{type:String},
  Card: {
    NameOnCard: String,
    CardNumber: Number
  }
});

const Checkout= mongoose.model('Checkout',CheckoutSchema);

module.exports = Checkout;
