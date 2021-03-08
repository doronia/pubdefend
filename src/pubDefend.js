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
import { addStyle } from "./pubdefend.dom";

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
	 *  Add css style to the document.
	 * @__MODAL_CSS generated from the bundler
	 *
	 *  TODO:
	 *  - Handle loading html from the bundler
	 *  - Add modal functions (reload page, instructions how to disable adblock..)
	 *  - Test on: FF, Chrome, IE, Safari and Edge.
	 */
	var _modalCss = __MODAL_CSS;
	if (_modalCss) {
		addStyle(_modalCss);
	}

	/**
	 * FingerPrint
	 * @fp
	 * - Store generated FingerPrint
	 * - Watch FingerPrint value
	 */
	store(_store, "fip", fp);

	/**
	 *  publisher properties.
	 *  @hos Host name
	 *  @Pub Publisher properties from document
	 */
	store(_store, "hos", getHostName());
	var pub = atob(detectPid("[pd-prop]").id);
	store(_store, "pub", JSON.parse(pub));

	/**
	 * Session ID
	 * @sid
	 * - generate session id for uniqe updates on DB
	 *
	 */
	store(_store, "sid", uniqueID());

	/**
	 * Browser and Platform
	 * @brw browser
	 * @mob is mobile device?
	 */
	var _browser = detectBrowser();
	store(_store, "brw", _browser);
	store(_store, "mob", isMobile);

	/** Callback not in use. */
	if (callback) {
		callback("Ready");
	}
	return "isReady";
}

/**
 * Googletag api
 * call googletagHandler when api Ready
 * The callback function not in use at the moment.
 *
 */
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

		if (pd["analytics"]) {
			gtagApiReady(function (res) {
				res && logger.log("pubdefend [g]::", res);
				var onImpr = window.addEventListener(config.constants.gtag, stateListeners);
			});
		}
		/**
		 * Load Paho mqtt lib.
		 * TODO:
		 * - upload mqttws31.min.js to CDN & change loadScript path with {config endpoints}
		 * - create instance of Paho class and raise event to start websocket connection and send method
		 */
		isReady(function (status) {
			logger.log("pubdefend::", status);
			pd.state[config.constants.ws] = false;

			/**
			 * AD blocker bait
			 */
			var testBait = bait(function (res) {
				if (!res) return;
				store(_store, "ab", res);
				pd.state[config.constants.adblocker] = true;
				customEvent(config.constants.adblocker, res);
			});

			var onAb = window.addEventListener(config.constants.adblocker, stateListeners);

			/**
			 * Send analytics to server
			 *
			 */

			if (pd["analytics"]) {
				logger.log("pubdefend:: analytics enabled");
				logger.log("pubdefend[ws]:: init..");
				loadScript("https://" + config.endpoints.cdn + "." + config.endpoints.base + "/js/mqttws31.min.js", function () {
					logger.log("pubdefend [ws]:: ready");
					ws = new MqttClient();
				});

				window.addEventListener(config.constants.ws, function pub(event) {
					logger.log("pubdefend [ws Listener]::", event.detail.payload);
					logger.log("pubdefend [ws state]::", config.constants.gtag, "isReady?", pd.state.hasOwnProperty(config.constants.gtag));
					logger.log("pubdefend [ws state]::", config.constants.adblocker, "isReady?", pd.state.hasOwnProperty(config.constants.adblocker));
					logger.log(getStore(true));

					pd.state[config.constants.ws] = true;
					ws.pub(JSON.stringify(getStore(true)));
					window.removeEventListener(config.constants.ws, pub);
				});
			}
		});
	});
}

export default pd;
