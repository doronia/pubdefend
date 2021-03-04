const https = require("https");
const request = require("request");
/* module.exports = function getData(cb) {
	//var cssUrl = "https://c.pubdefend.com/orgs/sponsercoil/pd.base.min.css";
	var cssUrl = "https://www.sponser.co.il/11111.css";
	var res = "";
	axios
		.get(cssUrl)
		.then(function (response) {
			// handle success
			res = response.data;
			//console.log(typeof response.data);
			//console.log(res.toString());
			if (cb) {
				cb(res);
			}
			//return res;
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		});
	return res.toString();
	
};

/* 
export function getData() {
	var str = request(function (data) {
		return data;
	});
	//var min = minifier(str);
	console.log("str", str);
	return str;

}

export function request(cb) {
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

			res.setEncoding("utf8");
			let rawData = "";
			res.on("data", (chunk) => {
				rawData += chunk;
			});
			res.on("end", () => {
				try {
					const parsedData = JSON.stringify(rawData);
					//const parsedData = rawData;
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
} */

var cssUrl = "https://c.pubdefend.com/orgs/sponsercoil/pd.base.min.css";

export const getAccessToken = () => {
	return new Promise((resolve, reject) => {
		const Options = {
			method: "GET",
			url: cssUrl,
		};

		request(Options, function (err, res, body) {
			return resolve(body);
		});
	});
};
