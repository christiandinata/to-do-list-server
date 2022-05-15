const config = require("../config/db-config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  logging: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user-model.js")(sequelize, Sequelize);
db.group = require("./group-model.js")(sequelize, Sequelize);
db.listgroup = require("./listGroup-model.js")(sequelize, Sequelize);
db.activity = require("./activity-model")(sequelize, Sequelize);
db.log = require("./log-model")(sequelize, Sequelize);

module.exports = db;
