const mongoose = require("mongoose");

var serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
