module.exports = {
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "mysqlforfun01",
  DB: "todolistDB",
  dialect: "mysql",
  PORT: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
