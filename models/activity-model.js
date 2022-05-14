module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define(
    "activity",
    {
      username: {
        type: Sequelize.STRING,
      },
      tanggal: {
        type: Sequelize.DATEONLY,
      },
      kegiatan: Sequelize.STRING,
      kategori: Sequelize.STRING,
      nama_grup: Sequelize.STRING,
    },
    {
      timestamps: true,
    },
    {
      freezeTableName: true,
    }
  );
  return Activity;
};
