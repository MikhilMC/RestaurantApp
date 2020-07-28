const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  name: String,
  isItVeg: Boolean,
  measurement: String,
  quantity: Number,
  unit: String,
  price: Number,
  imageURL: String,
  hasDiscount: Boolean,
  discountPercentage: Number,
  isSpecialToday: Boolean,
  quantityToday: Number,
  soldQuantity: Number
});

module.exports = mongoose.model('todaymenuitem', MenuSchema);
