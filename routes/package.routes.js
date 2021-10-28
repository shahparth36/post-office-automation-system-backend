const express = require("express");
const router = express.Router();

const {
  sendPackage,
  updatePackageLocation,
  getPackage,
  getUserPackages,
  getPackages,
} = require("../controllers");

const roles = require("../constants/roles");

const { authorize } = require("../middleware/authorize");

router.post(
  "/send-package",
  (req, res, next) => authorize(req, res, next, [roles.user, roles.admin]),
  sendPackage
);

router.put(
  "/update-package-location",
  (req, res, next) => authorize(req, res, next, [roles.admin]),
  updatePackageLocation
);

router.get(
  "/package/:packageId",
  (req, res, next) => authorize(req, res, next, [roles.user, roles.admin]),
  getPackage
);

router.get(
  "/user-packages",
  (req, res, next) => authorize(req, res, next, [roles.user, roles.admin]),
  getUserPackages
);

router.get(
  "/packages",
  (req, res, next) => authorize(req, res, next, [roles.admin]),
  getPackages
);

module.exports = router;
