import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";

import { runningOnBrowser, isBot, isMobile, detectBrowser } from "./pubdefend.environment";
import { bait } from "./pubdefend.bait";
import { isObject, isEmpty, documentReady, loadScript, detectPid, getHostName, uniqueID } from "./pubdefend.utils";
import { domQuery } from "./pubdefend.dom";
import { testcookie, store, getStore } from "./pubdefend.events";
import { gtagHandler } from "./pubdefend.google";
import { fpHardware, fpExtend } from "./pubdefend.fingerprint";

//import 'core-js/features/promise';
//Promise.resolve(32).then(x => console.log(x));

pd.testcookie = testcookie;
pd.getStore = getStore;

var w = window,
	g = w.googletag ? w.googletag : false,
	d = document;

var _store = pd.store;

/* AD blocker bait  */
var testBait = bait(function (data) {
	store(_store, "blocked", data);
});

var options = {
	D: ["id=~google_ad", "id=~gpt-ad", "tag=iframe;src=~safeframe", "tag=ins;cl=~dcmads"],
	W: [".banner_slot", ".postad"],
	V: "advertisement",
};

/* fingerprints */
var fingerprint = {};
fingerprint.hardware = fpHardware;
fingerprint.extend = fpExtend;
store(_store, "fingerprint", fingerprint);

var init = function () {
	var apiReady = setInterval(function () {
		if (g && g.apiReady) {
			console.log("apiReady:", g && g.apiReady);
			clearInterval(apiReady);
			gtagHandler();
		}
	}, 100);
};

var arrayIterator = function (options) {
	//var r = Object.prototype.toString.call(n).slice(8, -1);
	const obj = options;

	if (isObject(obj) && Object.keys(obj).length > 0) {
		console.log("options length:", Object.keys(obj).length);
	}

	if (!options || options.length == 0) return;
	/* var o = options;
    for (var i = 0; i < o.length; i++) {
        console.log('o:', o[i], 'length:', o.length)
    } */

	//options.forEach(options => console.log(options));
};

var QueuePush = function (arr, item) {};

// Automatic instances creation if required (useful for async script loading)
if (runningOnBrowser && !isBot) {
	documentReady(function () {
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

		loadScript("https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js");

		/* window.addEventListener('load', (event) => {
            if ("undefined" != typeof window.adsbygoogle) {
                _gtag();
                console.log('adsense loaded');
            }

            if ("undefined" != typeof window.googletag) {
                ready();
                console.log('googletag loaded');
            }
        }, false); */

		init();
	});
}

export default pd;
