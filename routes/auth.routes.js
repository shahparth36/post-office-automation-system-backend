const express = require("express");
const router = express.Router();

const { authenticate } = require("../controllers");

router.post("/login", authenticate);

module.exports = router;
