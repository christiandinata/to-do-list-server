const jwt = require("jsonwebtoken");
const db = require("../models");
const config = require("../config/auth-config");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const generateAccessToken = require("./generateAccessToken");
const { JsonWebTokenError } = require("jsonwebtoken");

require("dotenv").config();

exports._register = async function (req, res, next) {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  console.log(User);
};

exports._login = async function (req, res, next) {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Password is wrong" });
      }
      var token = generateAccessToken({ user: user });
      return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => console.log({ message: err.message }));
};

// LOGOUT
exports.logout = async function (req, res, next) {
  let token = req.headers["x-access-token"];
  jwt.sign(token, config.secret, { expiresIn: 1 }, (err, decoded) => {
    return res.status(200).send({ message: "You have been logged out" });
  });
};
