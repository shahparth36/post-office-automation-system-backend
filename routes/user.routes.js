const express = require("express");
const roles = require("../constants/roles");
const router = express.Router();

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers");

const { authorize } = require("../middleware/authorize");

router.post("/user", createUser);

router.get(
  "/user",
  (req, res, next) => authorize(req, res, next, [roles.user, roles.admin]),
  getUser
);

router.put(
  "/user",
  (req, res, next) => authorize(req, res, next, [roles.user, roles.admin]),
  updateUser
);

router.delete(
  "/user",
  (req, res, next) => authorize(req, res, next, [roles.user, roles.admin]),
  deleteUser
);

module.exports = router;
