const https = require("https");
const minifier = require("string-minify");

export function getData() {
	var str = request(function (data) {
		return JSON.stringify(data);
	});
	//var min = minifier(str);
	console.log(str);
	return str;
}

function request(cb) {
	var cssUrl = "https://c.pubdefend.com/orgs/sponsercoil/pd.base.css";

	https
		.get(cssUrl, (res) => {
			const { statusCode } = res;
			const contentType = res.headers["content-type"];

			let error;

			if (res.statusCode !== 200) {
				console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
				res.resume();
				return;
			}

			//res.setEncoding("utf8");
			let rawData = "";
			res.on("data", (chunk) => {
				rawData += chunk;
			});
			res.on("end", () => {
				try {
					//const parsedData = JSON.stringify(rawData);
					const parsedData = rawData;
					if (cb) {
						cb(parsedData);
					}
					//console.log(parsedData);
				} catch (e) {
					console.error(e.message);
				}
			});
		})
		.on("error", (e) => {
			console.error(`Got error: ${e.message}`);
		});
}

/* 
export function getData(cb) {
	let data = "";

	let options = {
		host: "c.pubdefend.com/",
		path: "/orgs/sponsercoil/pd.base.css",
		method: "GET",
	};

	callback = function (response) {
		response.on("data", function (chunk) {
			data += chunk;
		});

		response.on("end", function () {
			console.log(JSON.stringify(data));
			if (cb) {
				cb(JSON.stringify(data));
            }
		});
	};

	https.request(options, callback).end();

	return data;
}
 */
//return str;

/* let request = https.get(cssUrl, (res) => {
		if (res.statusCode !== 200) {
			console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
			res.resume();
			return;
		}
		let data = "";

		res.on("data", (chunk) => {
			data += chunk;
		});

		res.on("close", () => {
			//console.log("Retrieved all data");
			//console.log(JSON.stringify(data));
		});
	}).end(); */
//console.log(JSON.stringify(request));

/* 
    var modalCss = fetchOHLC(cssUrl);
    console.log(modalCss); 
    */
//return JSON.stringify(data);

/* module.exports = {
	getData: getdata,
}; */
