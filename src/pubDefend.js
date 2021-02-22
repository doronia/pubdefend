import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";
import { log } from "./pubdefend.debug";
import { runningOnBrowser, isBot, isMobile, detectBrowser } from "./pubdefend.environment";
import { documentReady, loadScript, detectPid, getHostName, parseBase64 } from "./pubdefend.utils";
import { googletagHandler } from "./pubdefend.google";
import { fp } from "./pubdefend.fingerprint";
import { bait } from "./pubdefend.bait";
import { customEvent, saveEventQueue, store, getStore } from "./pubdefend.events";
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

	store(_store, "vid", fp);

	/**
	 *  publisher properties.
	 */
	store(_store, "host", getHostName());
	var pub = atob(detectPid("[pd-prop]").id);
	var pubify = JSON.stringify(pub);

	console.log(JSON.parse(pubify));
	store(_store, "pub", JSON.parse(pubify));

	/** 
	 * Old method
	 *  
	 _p["d"] = ENV ? ENV : undefined;
	 _p["ss"] = -1 !== _p["h"].indexOf(_p["d"].toString());
	 var _pdPop = parseBase64(_p.p);
	 console.table(_pdPop);
	 * */

	/** generate session id
	 *  Replaced by fingerPrint
	 *  var _sid = uniqueID();
	 *  store(_store, "sid", _sid);
	 */
	var _browser = detectBrowser();
	store(_store, "browser", _browser);

	store(_store, "isMobile", isMobile);

	if (callback) {
		callback("isReady");
	}
	return "isReady";
}

function gtagApiReady(callback) {
	var limit = 5;
	var gtag = window["googletag"];
	var apiReady = setInterval(function () {
		if (gtag && gtag["apiReady"]) {
			logger.log("googaltag:: apiReady (#" + limit + ")");
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
			if (res) logger.log("googaltag::", res);
		});
		/**
		 * Load Paho mqtt lib.
		 * TODO:
		 * - upload mqttws31.min.js to CDN & change loadScript path with {config endpoints}
		 * - create instance of Paho class and raise event to start websocket connection and send method
		 */
		isReady(function (status) {
			logger.log("pubdefend::", status);

			/** AD blocker bait  */
			var testBait = bait(function (e) {
				if (!e.toString()) return;
				store(_store, "ab", e);
				pd.state[config.constants.adblocker] = true;
				customEvent(config.constants.adblocker, e.toString());
			});

			logger.log("pubdefend:: Loading paho lib");
			loadScript("https://" + config.endpoints.cdn + "." + config.endpoints.base + "/js/mqttws31.min.js", function () {
				logger.info("pubdefend[ws]:: ready");
				ws = new MqttClient();
			});

			function stateQueueHandler(prop, event) {
				/**
				 TODO: handle ws publish if not connected.
			 	*/
				if (!prop) return;

				console.log("pubdefend[" + prop + " Listener]:: ws", pd.state[config.constants.ws]);

				pd.state[prop] = true;

				if (pd.state[config.constants.ws]) {
					saveEventQueue(prop, event.detail.payload);
					console.log("pubdefend[EventQueue]::", prop, event.detail.payload);
				}
				window.removeEventListener(event.type, stateQueueHandler, false);
			}

			var onImpr = window.addEventListener(config.constants.gtag, stateQueueHandler.bind(null, config.constants.gtag), false);
			var onAb = window.addEventListener(config.constants.adblocker, stateQueueHandler.bind(null, config.constants.adblocker), false);

			window.addEventListener(
				config.constants.ws,
				function (event) {
					console.info("pubdefend[ws Listener]::", event.detail.payload);
					console.info("pubdefend[ws state]::", config.constants.gtag, "isReady?", pd.state.hasOwnProperty(config.constants.gtag));
					console.info("pubdefend[ws staet]::", config.constants.adblocker, "isReady?", pd.state.hasOwnProperty(config.constants.adblocker));
					console.table(pd.state);
					pd.state[config.constants.ws] = true;

					logger.info(getStore());
					ws.pub(JSON.stringify(getStore(true)));
					console.table(pd.store);
					logger.log("pubdefend[status]:: ws", pd.state[config.constants.ws]);
				},
				true
			);
		});
	});
}

export default pd;
