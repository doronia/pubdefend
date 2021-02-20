import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";
import { log } from "./pubdefend.debug";
import { runningOnBrowser, isBot, isMobile, detectBrowser } from "./pubdefend.environment";
import { documentReady, loadScript, detectPid, getHostName } from "./pubdefend.utils";
import { googletagHandler } from "./pubdefend.google";
import { fpHardware, fpExtend } from "./pubdefend.fingerprint";
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
	_p["domain"] = ENV ? ENV : undefined;
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
				pd.state["ab"] = true;
				customEvent("ab", e.toString());
			});

			logger.log("pubdefend:: Loading paho lib");
			loadScript("https://" + config.endpoints.cdn + "." + config.endpoints.base + "/js/mqttws31.min.js", function () {
				logger.info("pubdefend:: paho lib ready");
				ws = new MqttClient();
			});

			window.addEventListener(
				"impr",
				function (e) {
					pd.state["g"] = true;
					console.log("pubdefend[impr Listener]:: ws", pd.state["ws"]);

					if (pd.state["ws"]) {
						saveEventQueue("impr", e.detail.payload);
						console.log("pubdefend[EventQueue]:: impr", e.detail.payload);
					}
				},
				true
			);
			window.addEventListener(
				"ab",
				function (e) {
					console.log("pubdefend[ab Listener]:: ws", pd.state["ws"]);

					if (pd.state["ws"]) {
						saveEventQueue("ab", e.detail.payload);
						console.log("pubdefend[EventQueue]:: ab", e.detail.payload);
					}
				},
				true
			);
			window.addEventListener(
				"wsLoaded",
				function (e) {
					console.info("pubdefend[ws Listener]::", e.detail.payload);
					console.info("pubdefend[ws]::", "is g?", pd.store.hasOwnProperty("g"));
					console.info("pubdefend[ws]::", "is ab?", pd.store.hasOwnProperty("ab"));

					logger.info(getStore());
					ws.pub(JSON.stringify(getStore(true)));
					pd.state["ws"] = true;
					logger.log("pubdefend[status]:: ws", pd.state["ws"]);
				},
				true
			);
		});
	});
}

export default pd;
