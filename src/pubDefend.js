import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";

import { runningOnBrowser, isBot, isMobile, detectBrowser } from "./pubdefend.environment";
import { bait } from "./pubdefend.bait";
import { isObject, isEmpty, documentReady, loadScript, detectPid, getHostName, uniqueID } from "./pubdefend.utils";
import { domQuery } from "./pubdefend.dom";
import { testcookie, store, getStore } from "./pubdefend.events";
import { gtagHandler } from "./pubdefend.google";
import { fpHardware, fpExtend } from "./pubdefend.fingerprint";

/* Polyfills*/
//import 'core-js/features/promise';
//import "core-js/features//object/entries";

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

var init = function () {
	var apiReady = setInterval(function () {
		if (g && g.apiReady) {
			console.log("apiReady:", g && g.apiReady);
			clearInterval(apiReady);
			gtagHandler();
		}
	}, 100);
};

if (runningOnBrowser && !isBot) {
	documentReady(function () {
		/* AD blocker bait  */
		var testBait = bait(function (data) {
			store(_store, "blocked", data);
		});

		/**
		 *  Browser Fingerprints.
		 *  TODO:
		 *  - follow changes in the fingerprints
		 */
		var fingerprint = {};
		fingerprint.hardware = fpHardware;
		fingerprint.extend = fpExtend;
		store(_store, "fingerprint", fingerprint);

		/**
		 *  publisher properties.
		 *  TODO:
		 * 	- validate domaian indexof hostname
		 */
		var _property = {};
		_property.hostname = getHostName(location.hostname);
		_property.domain = pd.domain;
		_property.pubid = detectPid().id;

		var _sid = uniqueID();
		var _browser = detectBrowser();

		/* Store data */
		store(_store, "publisher", _property);
		store(_store, "sid", _sid);
		store(_store, "browser", _browser);
		store(_store, "mobile", isMobile);

		/**
		 * Load Paho mqtt lib.
		 * TODO:
		 * - create instance of Paho class and raise event to start websocket connection and send method
		 */
		loadScript("https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js");

		init();
	});
}

export default pd;
