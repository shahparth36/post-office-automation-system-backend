const express = require("express");
const router = express.Router();

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers");

router.post("/user", createUser);

router.get("/user", getUser);

router.put("/user", updateUser);

router.delete("/user", deleteUser);

module.exports = router;
