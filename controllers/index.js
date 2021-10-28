const { authenticate } = require("./auth.controller");
const {
  sendPackage,
  updatePackageLocation,
  getPackage,
  getUserPackages,
  getPackages,
} = require("./package.controller");
const {
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
} = require("./service.controller");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./user.controller");
module.exports = {
  authenticate,
  sendPackage,
  updatePackageLocation,
  getPackage,
  getUserPackages,
  getPackages,
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
