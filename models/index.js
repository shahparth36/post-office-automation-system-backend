const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.User = require("./user.model");
db.Service = require("./service.model");
db.Package = require("./package.model");

module.exports = db;
