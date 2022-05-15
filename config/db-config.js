module.exports = {
  HOST: "us-cdbr-east-05.cleardb.net",
  USER: "b1fb228be24140",
  PASSWORD: "e95f7903",
  DB: "heroku_c3c91f6305ea96f",
  dialect: "mysql",
  PORT: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
