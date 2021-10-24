const Authorization = require("./controllers/authorization");

module.exports = function (app) {
	app.get("/", function (req, res) {
		res.send("Server is running...");
	});

	app.post("/authorize", Authorization.authorize);
	app.post("/verify", Authorization.verify);
	app.post("/test1", Authorization.test1);
	app.post("/test2", Authorization.test2);
};
