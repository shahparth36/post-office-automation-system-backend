const Boom = require("@hapi/boom");

const roles = require("../constants/roles");

const { User } = require("../models");

const { hashPassword } = require("../utils/password");

async function createUser(req, res, next) {
  try {
    const { email, password, name, address, city, contactNo } = req.body;

    const foundUser = await User.findOne({ email });
    if (foundUser)
      throw Boom.badRequest("User with given email already exists");
    else {
      const userDetails = {
        email,
        password: hashPassword(password),
        name,
        address,
        city,
        contactNo,
        accountNo: generateRandomAccountNo(),
        role: roles.user,
      };
      const newUser = await User.create(userDetails);
      return res
        .status(200)
        .json({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = req.user;

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { _id } = req.user;

    if (req.body.role && req.body.role !== roles.user)
      throw Boom.forbidden("You can't edit your role");
    else if (req.body.accountNo)
      throw Boom.forbidden("You can't edit your Account No");
    else {
      const updatedUser = await User.findByIdAnUpdate(_id, req.body, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: "Updated User Successfully", updatedUser });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { _id } = req.user;

    const deletedUser = await User.findByIdAndDelete(_id);
    return res
      .status(200)
      .json({ message: "Deleted User Successfully", deletedUser });
  } catch (error) {
    next(error);
  }
}

function generateRandomAccountNo() {
  return Math.floor(Math.random() * 90000000 + 10000000);
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
