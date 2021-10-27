const mongoose = require("mongoose");

var packageSchema = new mongoose.Schema({
  packageId: { type: String, required: true },
  status: { type: String, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: { type: Object },
  createdDate: { type: Date, default: Date.now },
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
