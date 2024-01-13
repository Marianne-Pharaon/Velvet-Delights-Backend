const mongoose = require('mongoose');

const TemplatesSchema = new mongoose.Schema({
 
  flavor: [{price: Number,}],
  topping: [{price: Number,}],
  filling: [{price: Number,}],
  size: [{price: Number,}],
});

const Templates = mongoose.model('Templates', TemplatesSchema);

module.exports = Templates;
