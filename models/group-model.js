module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define(
    "group",
    {
      nama_grup: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    }
  );
  return Group;
};
