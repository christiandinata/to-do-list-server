const { verifySignUp, verifyGroup, authJwt } = require("./services");
const Authentication = require("./controllers/authentication");
const Activity = require("./controllers/activity");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/", function (req, res) {
    res.send("Server is running on port 8001");
  });

  // POST
  app.post(
    "/register",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    Authentication._register
  );
  app.post("/login", Authentication._login);
  app.post("/addactivity", [authJwt.verifyToken], Activity._addActivity);
  app.post(
    "/addgroup",
    [authJwt.verifyToken, verifyGroup.checkDuplicateGroupName],
    Activity._addGroup
  );
  app.post("/deleteactivity", [authJwt.verifyToken], Activity.deleteActivity);
  app.post("/logout", Authentication.logout);

  // GET
  app.get("/getgroup", [authJwt.verifyToken], Activity.getGroup);
  app.get("/viewactivity", [authJwt.verifyToken], Activity.viewActivity);
};
