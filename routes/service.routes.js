const express = require("express");
const router = express.Router();

const {
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
} = require("../controllers");

const { authorize } = require("../middleware/authorize");

router.get(
  "/services",
  (req, res, next) => authorize(req, res, next, [roles.user, roles.admin]),
  getServices
);

router.get(
  "/service/:id",
  (req, res, next) => authorize(req, res, next, [roles.user, roles.admin]),
  getService
);

router.post(
  "/service",
  (req, res, next) => authorize(req, res, next, [roles.admin]),
  addService
);

router.put(
  "/service/:id",
  (req, res, next) => authorize(req, res, next, [roles.admin]),
  updateService
);

router.delete(
  "/service",
  (req, res, next) => authorize(req, res, next, [roles.admin]),
  deleteService
);

module.exports = router;
