const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  name: String,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('cartdata', CartSchema);