const Boom = require("@hapi/boom");

const { User } = require("../models");

const { generateTokens } = require("../utils/jwt");
const { verifyPassword } = require("../utils/password");

async function authenticate(req, res, next) {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser)
      throw Boom.badRequest("User with given email does not exist");
    else if (!verifyPassword(password, foundUser.password))
      throw Boom.unauthorized("Invalid Password");
    else {
      const dataToBeEncrypted = {
        email: foundUser.email,
      };
      const { accessToken, refreshToken } = generateTokens(dataToBeEncrypted);
      return res.status(200).json(accessToken, refreshToken);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticate,
};
