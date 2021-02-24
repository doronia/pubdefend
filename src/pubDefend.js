import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";
import { log } from "./pubdefend.debug";
import { runningOnBrowser, isBot, isMobile, detectBrowser } from "./pubdefend.environment";
import { documentReady, loadScript, detectPid, getHostName, uniqueID } from "./pubdefend.utils";
import { googletagHandler } from "./pubdefend.google";
import { fp } from "./pubdefend.fingerprint";
import { bait } from "./pubdefend.bait";
import { customEvent, stateListeners, saveEventQueue, store, getStore } from "./pubdefend.events";
import { MqttClient } from "./pubdefend.mqtt";

/* Polyfills*/
//import 'core-js/features/promise';
//Promise.resolve(32).then(x => logger.log(x));

pd.getStore = getStore;

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

	store(_store, "fp", fp);

	/**
	 *  publisher properties.
	 */
	store(_store, "hos", getHostName());
	var pub = atob(detectPid("[pd-prop]").id);
	store(_store, "pub", JSON.parse(pub));

	/** 
	 * Old method
	 *  
	 _p["d"] = ENV ? ENV : undefined;
	 _p["ss"] = -1 !== _p["h"].indexOf(_p["d"].toString());
	 var _pdPop = parseBase64(_p.p);
	 console.table(_pdPop);
	 * */

	/* generate session id */
	store(_store, "sid", uniqueID());

	var _browser = detectBrowser();
	store(_store, "brw", _browser);

	store(_store, "mob", isMobile);

	if (callback) {
		callback("Ready");
	}
	return "isReady";
}

function gtagApiReady(callback) {
	var limit = 5;
	var gtag = window["googletag"];
	var apiReady = setInterval(function () {
		if (gtag && gtag["apiReady"]) {
			logger.log("pubdefend [g]:: Ready (#" + limit + ")");
			clearInterval(apiReady);
			googletagHandler(callback);
		}
		if (limit <= 0) {
			clearInterval(apiReady);
		}
		limit -= 1;
	}, 100);
}

if (runningOnBrowser && !isBot) {
	log(pd.debug);

	documentReady(function () {
		logger.log("pubdefend:: init..");

		gtagApiReady(function (res) {
			res && logger.log("pubdefend [g]::", res);
		});
		/**
		 * Load Paho mqtt lib.
		 * TODO:
		 * - upload mqttws31.min.js to CDN & change loadScript path with {config endpoints}
		 * - create instance of Paho class and raise event to start websocket connection and send method
		 */
		isReady(function (status) {
			logger.log("pubdefend::", status);
			pd.state[config.constants.ws] = false;
			/** AD blocker bait  */
			var testBait = bait(function (res) {
				if (!res) return;
				store(_store, "ab", res);
				pd.state[config.constants.adblocker] = true;
				customEvent(config.constants.adblocker, res);
			});

			logger.log("pubdefend[ws]:: init..");
			loadScript("https://" + config.endpoints.cdn + "." + config.endpoints.base + "/js/mqttws31.min.js", function () {
				logger.log("pubdefend [ws]:: ready");
				ws = new MqttClient();
			});

			var onImpr = window.addEventListener(config.constants.gtag, stateListeners);
			var onAb = window.addEventListener(config.constants.adblocker, stateListeners);

			window.addEventListener(config.constants.ws, function pub(event) {
				logger.log("pubdefend [ws Listener]::", event.detail.payload);
				logger.log("pubdefend [ws state]::", config.constants.gtag, "isReady?", pd.state.hasOwnProperty(config.constants.gtag));
				logger.log("pubdefend [ws state]::", config.constants.adblocker, "isReady?", pd.state.hasOwnProperty(config.constants.adblocker));
				pd.state[config.constants.ws] = true;

				logger.log(getStore());
				ws.pub(JSON.stringify(getStore(false)));
				window.removeEventListener(config.constants.ws, pub);
			});
		});
	});
}

export default pd;
