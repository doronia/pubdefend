import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";

import { runningOnBrowser, isBot, isMobile, detectBrowser } from "./pubdefend.environment";
import { documentReady, loadScript, detectPid, getHostName } from "./pubdefend.utils";
import { testcookie, store, getStore } from "./pubdefend.events";
import { gtagHandler } from "./pubdefend.google";
import { fpHardware, fpExtend } from "./pubdefend.fingerprint";
import { bait } from "./pubdefend.bait";

import { MqttClient, createInstance } from "./pubdefend.mqtt";

/* Polyfills*/
//import 'core-js/features/promise';
//Promise.resolve(32).then(x => console.log(x));

pd.testcookie = testcookie;
pd.getStore = getStore;

var w = window;
//g = w.googletag ? w.googletag : false,
//d = document;

var _store = pd.store;

var options = {
	D: ["id=~google_ad", "id=~gpt-ad", "tag=iframe;src=~safeframe", "tag=ins;cl=~dcmads"],
	W: [".banner_slot", ".postad"],
	V: "advertisement",
};

function isReady(callback) {
	gtagApiReady(function (status) {
		console.log("gtag::", status);
	});
	/**
	 *  Browser Fingerprints.
	 *  TODO:
	 *  - follow changes in the fingerprints
	 */
	var fp = {};
	fp["hardware"] = fpHardware;
	fp["extended"] = fpExtend;
	store(_store, "fingerprint", fp);

	/**
	 *  publisher properties.
	 *  TODO:
	 * 	- validate domaian indexof hostname
	 */
	var _p = {};
	_p["hostname"] = getHostName(location.hostname);
	_p["domain"] = pd.domain;
	_p["sameSite"] = -1 !== _p["hostname"].indexOf(_p["domain"].toString());
	_p["pubid"] = detectPid("[pub-defend-property]").id;
	store(_store, "publisher", _p);

	/** generate session id
	 *  Replaced by fingerPrint
	 *  var _sid = uniqueID();
	 *  store(_store, "sid", _sid);
	 */
	var _browser = detectBrowser();
	store(_store, "browser", _browser);

	store(_store, "isMobile", isMobile);

	/** AD blocker bait  */
	var testBait = bait(function (data) {
		store(_store, "blocked", data);
	});

	if (callback) {
		callback("isReady");
	}
	return "isReady";
}

function gtagApiReady(callback) {
	var limit = 5,
		g = window["googletag"];
	var apiReady = setInterval(function () {
		console.log(limit);
		if (g && g["apiReady"]) {
			console.log("googaltag apiReady:", g && g["apiReady"]);
			clearInterval(apiReady);
			gtagHandler(callback);
		}
		if (limit <= 0) {
			clearInterval(apiReady);
		}
		limit -= 1;
	}, 300);
}

if (runningOnBrowser && !isBot) {
	documentReady(function () {
		console.log("pubdefend:: init..");

		/**
		 * Load Paho mqtt lib.
		 * TODO:
		 * - upload mqttws31.min.js to CDN & change loadScript path with {config endpoints}
		 * - create instance of Paho class and raise event to start websocket connection and send method
		 */
		isReady(function (status) {
			console.log("pubdefend::", status);
			console.log("pubdefend:: Loading paho lib");

			loadScript("https://" + config.endpoints.cdn + "." + config.endpoints.domain + "/js/mqttws31.min.js", function () {
				console.log("pubdefend:: paho lib ready");

				var ws = new MqttClient();
				var listenToWs = window.addEventListener(
					"wsLoaded",
					function (e) {
						console.log("listenToWs", e.detail);
						ws.pub(JSON.stringify(getStore()));
					},
					true
				);
			});
		});
	});
}

export default pd;
