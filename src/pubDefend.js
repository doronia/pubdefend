import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";

import { runningOnBrowser, isBot, isMobile, detectBrowser } from "./pubdefend.environment";
import { documentReady, loadScript, detectPid, getHostName } from "./pubdefend.utils";
import { testcookie, store, getStore } from "./pubdefend.events";
import { gtagHandler } from "./pubdefend.google";
import { fpHardware, fpExtend } from "./pubdefend.fingerprint";
import { bait } from "./pubdefend.bait";
import { customEvent } from "./pubdefend.events";
import { MqttClient, createInstance } from "./pubdefend.mqtt";

/* Polyfills*/
//import 'core-js/features/promise';
//Promise.resolve(32).then(x => console.log(x));

pd.testcookie = testcookie;
pd.getStore = getStore;

var w = window;
var g = window["googletag"] ? window["googletag"] : false;
var ws;
var _store = pd.store;

var options = {
	D: ["id=~google_ad", "id=~gpt-ad", "tag=iframe;src=~safeframe", "tag=ins;cl=~dcmads"],
	W: [".banner_slot", ".postad"],
	V: "advertisement",
};

function isReady(callback) {
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
		customEvent("ab", data);
		store(_store, "blocked", data);
	});

	if (callback) {
		callback("isReady");
	}
	return "isReady";
}

function gtagApiReady(callback) {
	if (g && g["apiReady"]) {
		console.debug("googaltag apiReady:", g && g["apiReady"]);
		clearInterval(apiReady);
		gtagHandler(g, callback);
	} else {
		var limit = 5;
		var gtag = window["googletag"];
		var apiReady = setInterval(function () {
			console.log(limit);
			if (gtag && gtag["apiReady"]) {
				console.debug("googaltag apiReady");
				clearInterval(apiReady);
				gtagHandler(g, callback);
			}
			if (limit <= 0) {
				clearInterval(apiReady);
			}
			limit -= 1;
		}, 100);
	}
}

if (runningOnBrowser && !isBot) {
	documentReady(function () {
		console.log("pubdefend:: init..");

		gtagApiReady(function (status) {
			console.log("gtag::", status);
		});
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

				ws = new MqttClient();
			});

			window.addEventListener(
				"wsLoaded",
				function (e) {
					pd.state.ws = true;
					console.log("listenToWs", e.detail);
					ws.pub(JSON.stringify(getStore()));
				},
				true
			);
			window.addEventListener(
				"impr",
				function (e) {
					pd.state.g = true;
					console.log("impr", e.detail);
				},
				true
			);
			window.addEventListener(
				"ab",
				function (e) {
					pd.state.ab = true;
					console.log("ab", e.detail);
				},
				true
			);
		});
	});
}

export default pd;
