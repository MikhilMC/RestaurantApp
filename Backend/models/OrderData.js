const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "userdatas" },
  items: Array,
  totalCash: Number,
  timeFrame: { type: mongoose.Types.ObjectId, ref: "timetable"}
});

module.exports = mongoose.model('orderdata', OrderSchema);