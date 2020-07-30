const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TimeTableSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  start: {
    hour: Number,
    minute: Number
  },
  end: {
    hour: Number,
    minute: Number,
  },
  orders: {type: Array, default: []},
  hasClosed: {type: Boolean, default: false}
});

module.exports = mongoose.model('timetable', TimeTableSchema, 'timetable');