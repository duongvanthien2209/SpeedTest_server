const mongoose = require('mongoose');

const schema = mongoose.Schema({
  text: String,
});

const Text = mongoose.model('Text', schema, 'texts');
module.exports = Text;
