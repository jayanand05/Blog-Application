require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };
  const token = jwt.sign(payload, secret);
  return token;
}

function validateToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
module.exports = {
  createToken,
  validateToken,
};
