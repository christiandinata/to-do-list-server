const cron = require("node-cron");
const db = require("./models");
const Op = db.Sequelize.Op;
const Activity = db.activity;
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

// const { port } = require("./config/port-config");
// const PORT = process.env.PORT || 3000;

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => console.log({ message: err.message }));

const router = require("./router");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
// app.use(jwt());
app.enable("trust proxy");

router(app);

app.listen(process.env.PORT || 3000);

// Menghapus aktivitas yang sudah lewat dari 7 hari
cron.schedule("* * * * *", function () {
  Activity.destroy({
    where: {
      tanggal: {
        [Op.lte]: new Date() - 7 * 24 * 60 * 60 * 1000,
      },
    },
  })
    .then((result) => {
      console.log("Activities 1 week old have been removed");
    })
    .catch((err) => console.log({ message: err.message }));
});
