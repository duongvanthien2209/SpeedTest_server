const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = Schema({
  score: Number,
  accuracy: Number,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreate: Date,
});

const History = mongoose.model('History', schema, 'historys');
module.exports = History;
