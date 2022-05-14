module.exports = (sequelize, Sequelize) => {
  const listGroup = sequelize.define(
    "listgroup",
    {
      nama_grup: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    }
  );
  return listGroup;
};
