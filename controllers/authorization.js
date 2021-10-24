const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
exports.authorize = function (req, res, next) {
	fs.readFile("credentials.json", (err, content) => {
		if (err) return console.log("Error loading client secret file:", err);
		// Authorize a client with credentials, then call the Google Drive API.
		// authorize(JSON.parse(content));

		const { client_secret, client_id, redirect_uris } =
			JSON.parse(content).installed;

		//acquire oAuth2Client
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);

		// check previous token
		fs.readFile(TOKEN_PATH, (err, token) => {
			if (err) {
				const authUrl = oAuth2Client.generateAuthUrl({
					access_type: "offline",
					scope: SCOPES,
				});
				res.send({
					authURL: authUrl,
					oAuth2Client: oAuth2Client,
				});
			} else {
				oAuth2Client.setCredentials(JSON.parse(token));
				res.send({
					oAuth2Client: oAuth2Client,
				});
			}
		});
	});
};

exports.verify = function (req, res, next) {
	fs.readFile("credentials.json", (err, content) => {
		if (err) return console.log("Error loading client secret file:", err);

		const { client_secret, client_id, redirect_uris } =
			JSON.parse(content).installed;

		//acquire oAuth2Client
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);

		verifyAgain(oAuth2Client);
	});

	const { code } = req.body;

	function verifyAgain(oAuth2Client) {
		oAuth2Client.getToken(code, (err, token) => {
			if (err) {
				res.send({
					error: err,
				});
			} else {
				oAuth2Client.setCredentials(token);
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
					if (err) {
						res.send({ error: err });
					} else {
						res.send({ success: "Token stored to token.json" });
					}
				});
			}
		});
	}
};

// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */

// function listFiles(auth) {
// 	const drive = google.drive({ version: "v3", auth });
// 	drive.files.list(
// 		{
// 			pageSize: 10,
// 			fields: "nextPageToken, files(id, name)",
// 		},
// 		(err, res) => {
// 			if (err) return console.log("The API returned an error: " + err);
// 			const files = res.data.files;
// 			if (files.length) {
// 				console.log("Files:");
// 				files.map((file) => {
// 					console.log(`${file.name} (${file.id})`);
// 				});
// 			} else {
// 				console.log("No files found.");
// 			}
// 		}
// 	);
// }

exports.test1 = function (req, res, next) {
	const { email } = req.body;
	res.send({
		message: email,
	});
};

exports.test2 = function (req, res, next) {
	const { email } = req.body;
	res.send({
		message: email,
	});
};
