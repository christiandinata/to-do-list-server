const db = require("../models");
const config = require("../config/auth-config");
const Group = db.group;
const listGroup = db.listgroup;
const User = db.user;
const Activity = db.activity;
const log = db.log;
const Op = db.Sequelize.Op;
const mysql = require("mysql");
const generateAccessToken = require("./generateAccessToken");

require("dotenv").config();

// addActivity - fungsi menambah agenda

exports._addActivity = async function (req, res, next) {
  const splitKegiatan = req.body.kegiatan.split(",");
  var added = 0;

  log.create({
    desc: "addActivity",
  });

  for (let i = 0; i < splitKegiatan.length; i++) {
    Activity.findOne({
      where: {
        username: req.body.username,
        tanggal: req.body.tanggal,
        kegiatan: splitKegiatan[i],
      },
    })
      .then((kegiatan) => {
        if (!kegiatan) {
          Activity.create({
            username: req.body.username,
            tanggal: req.body.tanggal,
            kegiatan: splitKegiatan[i],
            kategori: req.body.kategori,
            nama_grup: req.body.nama_grup,
          });
          added = added + 1;
          console.log(splitKegiatan[i] + " has been added");
        } else {
          console.log(splitKegiatan[i] + " already exists");
        }
      })
      .catch((err) => res.status(409).send({ message: err.message }));
  }

  res.status(201).send({ message: "activities have been updated" });
};

// viewActivity - fungsi melihat agenda

exports.viewActivity = async function (req, res, next) {
  log.create({
    desc: "viewActivity",
  });

  Activity.findAll({
    where: {
      username: req.body.username,
      tanggal: req.body.tanggal,
    },
  })
    .then((kegiatan) => {
      if (!kegiatan.length) {
        return res.status(404).send({ message: "Not found" });
      }
      return res.status(200).send({
        kegiatan,
      });
    })
    .catch((err) => console.log({ message: err.message }));
};

// deleteActivity - fungsi menghapus agenda

exports.deleteActivity = async function (req, res, next) {
  Activity.destroy({
    where: {
      username: req.body.username,
      tanggal: req.body.tanggal,
      kegiatan: req.body.kegiatan,
    },
  })
    .then((result) => {
      res
        .status(200)
        .send({ message: req.body.kegiatan + " has been removed" });
    })
    .catch((err) => console.log({ message: err.message }));
};

// addGroup - fungsi untuk menambah grup

exports._addGroup = async function (req, res, next) {
  const username = req.body.username.split(",");

  listGroup.create({
    nama_grup: req.body.nama_grup,
  });

  for (let i = 0; i < username.length; i++) {
    Group.create({
      nama_grup: req.body.nama_grup,
      username: username[i],
    });
  }
  res.status(201).send({ message: "Group has been created successfully" });
};

exports.getGroup = async function (req, res, next) {
  Group.findAll({
    where: {
      username: req.body.username,
    },
  })
    .then((group) => {
      if (!group.length) {
        return res
          .status(404)
          .send({ message: "You are not in any groups. Please create one" });
      }
      return res.status(200).send({ group: group });
    })
    .catch((err) => console.log({ message: err.message }));
};
