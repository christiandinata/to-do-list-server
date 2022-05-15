module.exports = (sequelize, Sequelize) => {
  const Log = sequelize.define(
    "log",
    {
      desc: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false,
      createdAt: "timestamp",
    }
  );
  return Log;
};
