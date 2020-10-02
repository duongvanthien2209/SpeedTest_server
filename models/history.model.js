const mongoose = require('mongoose');
const schema = mongoose.Schema({
    score: Number,
    userId: String,
    dateCreate: Date
});

const History = mongoose.model('History', schema, 'historys');
module.exports = History;