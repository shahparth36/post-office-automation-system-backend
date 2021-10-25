const { authenticate } = require("./auth.controller");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./user.controller");
module.exports = {
  authenticate,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
