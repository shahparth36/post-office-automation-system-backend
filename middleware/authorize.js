const { UnauthorizedError } = require("../constants/error");

const { accessToken: accessTokenConstant } = require("../constants/jwt");

const { User } = require("../models");

const { extractToken, verifyToken } = require("../utils/jwt");

function authorize(req, res, next, roles) {
  const token = extractToken(req); // extracting token from headers

  // if there is no access or refresh token present inside headers
  if (!token.accessToken)
    return res
      .status(403)
      .json({ type: UnauthorizedError, message: "Please provide a token" });

  // verifying and retreiving data from the token
  const encryptedDataInAccessToken = verifyToken(
    token.accessToken,
    accessTokenConstant
  );

  // accessToken expired
  if (!encryptedDataInAccessToken) {
    return res
      .status(403)
      .json({ type: UnauthorizedError, message: "Invalid JWT token" });
  } else {
    // User with valid access token but does not have access to the endpoint
    if (!isValidRole(roles, encryptedDataInAccessToken.role)) {
      return next(invalidRoleError());
    }
  }

  User.findOne({ email: encryptedDataInAccessToken.email }, (err, user) => {
    // Mongoose Error
    if (err)
      return res
        .status(500)
        .json({ message: "Internal Server Error. Please try again later." });
    // User with given email does not exist
    else if (!user) return res.status(404).json({ message: "No User Found" });
    else {
      req.user = user;
      next();
    }
  });
}

function isValidRole(validRoles, role) {
  return validRoles.includes(role);
}

function invalidRoleError() {
  return {
    type: UnauthorizedError,
    message: "You do not have access to this endpoint",
    statusCode: 403,
  };
}

module.exports = {
  authorize,
};
