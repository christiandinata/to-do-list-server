const db = require("../models");
const Group = db.group;
const User = db.user;
const Op = db.Sequelize.Op;
checkDuplicateGroupName = (req, res, next) => {
  const username = req.body.username.split(",");
  // Grup
  Group.findOne({
    where: {
      nama_grup: req.body.nama_grup,
    },
  })
    .then((group) => {
      if (group) {
        res.status(400).send({
          message: "Failed! Group name is already in use!",
        });
        return;
      }

      User.findAll({ where: { username: { [Op.in]: username } } })
        .then((found) => {
          var foundArray = found.map((x) => x.username);
          var difference = username.filter((x) => !foundArray.includes(x));
          if (difference.length > 0) {
            res.status(400).send({
              message: difference + " are not registered",
            });
            return;
          } else {
            next();
          }
        })
        .catch((err) => console.log({ message: err.message }));
    })
    .catch((err) => console.log({ message: err.message }));
};

const verifyGroup = {
  checkDuplicateGroupName: checkDuplicateGroupName,
};
module.exports = verifyGroup;
