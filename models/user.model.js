const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  contactNo: { type: Number, required: true },
  accountNo: { type: Number, required: true },
  role: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
