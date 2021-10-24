const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");

const { port } = require("./config");

const router = require("./router");

// require('dotenv').config()
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.enable("trust proxy");

// Serve static file
// app.use("/static", express.static("public"));

router(app);

// Catch errors
// app.use((err, req, res, next) => {
// 	if (err.name === "UnauthorizedError") {
// 		return res.status(err.status).send({ message: err.message });
// 	}

// 	next();
// });

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
