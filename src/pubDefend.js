import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";

import { runningOnBrowser, isBot, isMobile, detectBrowser } from "./pubdefend.environment";
import { bait } from "./pubdefend.bait";
import { documentReady, loadScript, detectPid, getHostName, uniqueID } from "./pubdefend.utils";
import { testcookie, store, getStore } from "./pubdefend.events";
import { gtagHandler } from "./pubdefend.google";
import { fpHardware, fpExtend } from "./pubdefend.fingerprint";

/* Polyfills*/
//import 'core-js/features/promise';
//Promise.resolve(32).then(x => console.log(x));

pd.testcookie = testcookie;
pd.getStore = getStore;

var w = window,
	g = w.googletag ? w.googletag : false,
	d = document;

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
	fp.hardware = fpHardware;
	fp.extend = fpExtend;
	store(_store, "fingerprint", fp);

	/**
	 *  publisher properties.
	 *  TODO:
	 * 	- validate domaian indexof hostname
	 */
	var _property = {};
	_property.hostname = getHostName(location.hostname);
	_property.domain = pd.domain;
	_property.pubid = detectPid().id;
	store(_store, "publisher", _property);

	/** generate session id */
	var _sid = uniqueID();
	store(_store, "sid", _sid);

	var _browser = detectBrowser();
	store(_store, "browser", _browser);

	store(_store, "isMobile", isMobile);

	/** AD blocker bait  */
	var testBait = bait(function (data) {
		store(_store, "blocked", data);
	});

	//console.log("pubdefend:: is ready");
	if (callback) {
		callback("isReady");
	}
	return "isReady";
}

function gtagApiReady(callback) {
	var apiReady = setInterval(function () {
		if (g && g.apiReady) {
			console.log("googaltag apiReady:", g && g.apiReady);
			clearInterval(apiReady);

			gtagHandler(callback);
		}
	}, 100);
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
			//console.log(getStore());
			console.log("pubdefend:: Loading paho lib");
			//loadScript("https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js");
			loadScript("https://" + config.endpoints.cdn + "." + config.endpoints.domain + "/js/mqttws31.min.js");
		});

		//gtagApiReady();
	});
}

export default pd;
