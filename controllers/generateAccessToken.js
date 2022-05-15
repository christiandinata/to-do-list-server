// Fungsi untuk menyediakan token JWT
const jwt = require("jsonwebtoken");
const config = require("../config/auth-config");
function generateAccessToken(user) {
  return jwt.sign({ user }, config.secret, {
    expiresIn: "15m",
  });
}

module.exports = generateAccessToken;
