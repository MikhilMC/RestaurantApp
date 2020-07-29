const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "userdatas" },
  name: String,
  basicQuantity: Number,
  basicUnit: String,
  basicPrice: Number,
  hasDiscount: Boolean,
  discountPercentage: Number,
  quantity: Number,
  price: Number
});

module.exports = mongoose.model('cartdata', CartSchema);