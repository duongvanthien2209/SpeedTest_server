const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name: String,
    avatar: String,
});

const User = mongoose.model('User', schema, 'users');
module.exports = User;