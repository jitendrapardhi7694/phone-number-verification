const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
