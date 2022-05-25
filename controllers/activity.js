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
    desc: req.body.username + " - addActivity",
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
    desc: req.body.username + " - viewActivity",
  });

  if (req.body.kategori == "PERSONAL") {
    Activity.findAll({
      where: {
        username: req.body.username,
        tanggal: req.body.tanggal,
        kategori: req.body.kategori,
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
  } else {
    Activity.findAll({
      where: {
        tanggal: req.body.tanggal,
        kategori: req.body.kategori,
        nama_grup: req.body.nama_grup,
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
  }
};

// deleteActivity - fungsi menghapus agenda

exports.deleteActivity = async function (req, res, next) {
  log.create({
    desc: req.body.username + " - deleteActivity",
  });

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

  log.create({
    desc: username[0] + " - addGroup",
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
  log.create({
    desc: req.body.username + " - getGroup",
  });

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

exports.getMember = async function (req, res, next) {
  log.create({
    desc: req.body.username + " - getMember",
  });

  Group.findAll({
    where: {
      nama_grup: req.body.nama_grup,
    },
  })
    .then((member) => {
      if (!member.length) {
        return res.status(404).send({ message: "Group doesn't exist" });
      }
      return res.status(200).send({ member: member });
    })
    .catch((err) => console.log({ message: err.message }));
};
