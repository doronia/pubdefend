var pubdefend = (function () {
	'use strict';

	var pd = window.pubDefend || window.pubdefend || {};

	pd.debug = true;
	pd.store = {};
	pd.eventQueue = [];
	pd.slotsQueue = [];
	pd.domain =  "sponser.co.il" ;

	var config = {
		cookies: true,
		cookieName: "_pbdfndEvents",
		cookieDomain: null,
		endpoints: {
			domain: "pubdefend.com",
			cdn: "c",
			websocket: "ws",
			bait: "ad_banner.js",
		},
		queue: [],
	};

	const runningOnBrowser = typeof window !== "undefined";

	//export const isBot = runningOnBrowser || (typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

	const isBot = (runningOnBrowser && !("onscroll" in window)) || (typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

	const supportsClassList = runningOnBrowser && "classList" in document.createElement("p");

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	const detectBrowser = function() {
	    if (runningOnBrowser) {
	        var agent = window.navigator.userAgent.toLowerCase();

	        switch (true) {
	            case agent.indexOf("edge") > -1:
	                return "Edge (EdgeHtml)";
	            case agent.indexOf("edg") > -1:
	                return "Edge Chromium";
	            case agent.indexOf("opr") > -1 && !!window.opr:
	                return "opera";
	            case agent.indexOf("chrome") > -1 && !!window.chrome:
	                return "chrome";
	            case agent.indexOf("trident") > -1:
	                return "IE";
	            case agent.indexOf("firefox") > -1:
	                return "Firefox";
	            case agent.indexOf("safari") > -1:
	                return "Safari";
	            case agent.indexOf("Opera") || agent.indexOf("OPR") > -1:
	                return "Opera";
	            default:
	                return "other";
	        }
	    }
	};

	/**
	 * Object.entries
	 */
	function entriesPolyFill(obj) {
		return Object.keys(obj).reduce(function (arr, key) {
			arr.push([key, obj[key]]);
			return arr;
		}, []);
	}
	var entries = Object.entries ? Object.entries : entriesPolyFill;

	function murmurhash3_32_gc(key) {
		var remainder = key.length & 3; // key.length % 4
		var bytes = key.length - remainder;
		var c1 = 0xcc9e2d51;
		var c2 = 0x1b873593;

		let h1, h1b, k1;

		for (let i = 0; i < bytes; i++) {
			k1 = (key.charCodeAt(i) & 0xff) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) | ((key.charCodeAt(++i) & 0xff) << 24);
			++i;

			k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
			k1 = (k1 << 15) | (k1 >>> 17);
			k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;

			h1 ^= k1;
			h1 = (h1 << 13) | (h1 >>> 19);
			h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
			h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
		}

		var i = bytes - 1;

		k1 = 0;

		switch (remainder) {
			case 3: {
				k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
				break;
			}
			case 2: {
				k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
				break;
			}
			case 1: {
				k1 ^= key.charCodeAt(i) & 0xff;
				break;
			}
		}

		k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
		h1 ^= k1;

		h1 ^= key.length;

		h1 ^= h1 >>> 16;
		h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
		h1 ^= h1 >>> 13;
		h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff;
		h1 ^= h1 >>> 16;

		return h1 >>> 0;
	}

	var getFingerprint = function (hardwareOnly, callback) {
		var w = window;
		var s = w.screen;
		var userAgent = w.userAgent,
			language = w.language,
			languages = w.languages,
			platform = w.platform,
			hardwareConcurrency = w.hardwareConcurrency,
			deviceMemory = w.deviceMemory,
			colorDepth = s.colorDepth,
			availHeight = s.availHeight,
			availWidth = s.availWidth;

		var plugins = entries(w.navigator.plugins).map(([, plugin]) => plugin.name);

		var timezoneOffset = new Date().getTimezoneOffset();
		var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		var touchSupport = "ontouchstart" in window;
		var canvas = (function () {
			try {
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");
				ctx.textBaseline = "top";
				ctx.font = "14px 'Arial'";
				ctx.textBaseline = "alphabetic";
				ctx.fillStyle = "#f60";
				ctx.fillRect(125, 1, 62, 20);
				ctx.fillStyle = "#069";
				ctx.fillText("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?", 2, 15);
				ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
				ctx.fillText("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?", 4, 17);
				var result = canvas.toDataURL();
				return result;
			} catch (error) {
				return error;
			}
		})();

		var doNotTrack = (function () {
			if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || "msTrackingProtectionEnabled" in window.external) {
				if (window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" || window.external.msTrackingProtectionEnabled()) {
					return true;
				} else {
					return false;
				}
			} else {
				return undefined;
			}
		})();

		var data = hardwareOnly
			? JSON.stringify({
					platform,
					hardwareConcurrency,
					deviceMemory,
					colorDepth,
					availWidth,
					availHeight,
					touchSupport,
					canvas,
			  })
			: JSON.stringify({
					userAgent,
					language,
					languages,
					platform,
					hardwareConcurrency,
					deviceMemory,
					plugins,
					colorDepth,
					availWidth,
					availHeight,
					timezoneOffset,
					timezone,
					touchSupport,
					canvas,
					doNotTrack,
			  });

		var result = murmurhash3_32_gc(data);

		if (callback) {
			callback(result);
			return;
		}

		return result;
	};

	var fpHardware = getFingerprint(true);
	var fpExtend = getFingerprint(false);

	/* Returns false for null and undefined, true for everything else. */
	const exists = (val) => {
		return val !== undefined && val !== null;
	};

	const isObject = function (val) {
		return typeof val === "object" && exists(val) && !Array.isArray(val) && !(val instanceof RegExp) && !(val instanceof String) && !(val instanceof Number);
	};

	function loadScript(src, onLoad) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = src;
		if (script.readyState) {
			script.onreadystatechange = function () {
				var state = this.readyState;
				if (state === "loaded" || state === "complete") {
					script.onreadystatechange = null;
					if (onLoad) onLoad();
				}
			};
		} else {
			if (onLoad) script.onload = onLoad;
		}

		document.getElementsByTagName("head")[0].appendChild(script);
	}

	const detectPid = function (str) {
		const e = document.querySelector(str);
		if (e == null) return;

		const d = e.getAttribute("pub-defend-property");
		const o = e.getAttribute("pubdefend-opts") || "{}";

		return {
			id: d,
			options: o,
		};
	};

	const documentReady = function (callback) {
		if (document.readyState === "interactive" || document.readyState === "complete") {
			setTimeout(callback, 0);
		} else {
			document.addEventListener("DOMContentLoaded", callback);
		}
	};

	function lsplit(e, t, n) {
		var o = e.split(t);
		return o.slice(0, n - 1).concat(o.length >= n ? o.slice(n - 1).join(t) : []);
	}

	const getHostName = function (e) {
		var t = [
				{ key: "?", index: 0 },
				{ key: "://", index: 1 },
				{ key: "//", index: 1 },
				{ key: "/", index: 0 },
				{ key: ":", index: 0 },
			],
			n = 0,
			o = t.length,
			a = e,
			r;
		for (; n < o; n++) {
			a = (r = lsplit(a, t[n].key, 2)).length > 1 ? r[t[n].index] : r[0];
		}
		return a;
	};

	var Cookies = {
	    set: function(name, value, ttl, domain) {
	        let expires = "";
	        let cookieDomain = "";
	        if (ttl) {
	            let date = new Date();
	            date.setTime(date.getTime() + (ttl * 60 * 1000));
	            expires = "; expires=" + date.toGMTString();
	        }
	        if (domain) {
	            cookieDomain = "; domain=" + domain;
	        }
	        document.cookie = name + "=" + escape(value) + expires + cookieDomain + "; path=/";
	    },
	    get: function(name) {
	        let i, c;
	        let nameEQ = name + "=";
	        let ca = document.cookie.split(';');
	        for (i = 0; i < ca.length; i++) {
	            c = ca[i];
	            while (c.charAt(0) === ' ') {
	                c = c.substring(1, c.length);
	            }
	            if (c.indexOf(nameEQ) === 0) {
	                return unescape(c.substring(nameEQ.length, c.length));
	            }
	        }
	        return null;
	    }
	};

	var LOG_ELEMENT = "log";

	function appendLog(text) {
		if (!text) {
			return;
		}

		if (document.getElementById(LOG_ELEMENT)) {
			var node = document.createElement("li");
			node.className = "text-small font-normal";
			node.style.cssText = "color: #99b8fd";
			var textnode = document.createTextNode(text);
			node.appendChild(textnode);
			document.getElementById(LOG_ELEMENT).appendChild(node);
		}
		return;
	}

	function store(obj, prop, val) {
		if (!isObject(obj)) return;
		if (!obj.hasOwnProperty(prop)) {
			obj[prop] = val;
		}
		obj[prop] = val;

		if (isObject(val)) {
			for (const [key, value] of entries(val)) {
				appendLog(prop + "::" + key + ": " + value);
			}
		} else {
			appendLog(prop + ": " + val);
		}
	}

	function getStore(encode) {
		var _obj = pd.store;
		var storeItems = JSON.stringify(_obj);
		if (encode) {
			return btoa(storeItems);
		}
		return _obj;
	}

	function customEvent(name, details) {
		if (!name) return;
		var data = details ? details : "none";
		var event;
		let eventString = name;
		try {
			event = new CustomEvent(eventString, { detail: { data } });
		} catch (err) {
			event = document.createEvent("CustomEvent");
			event.initCustomEvent(eventString, false, false, { instance });
		}
		window.dispatchEvent(event);
	}

	/*  Dev only */
	function testcookie() {
		var _obj = {};
		var arr = Cookies.get(config.cookieName);
		var storeItems = JSON.parse(arr);

		for (let item in storeItems) {
			_obj[storeItems[item].prop] = storeItems[item].val;
		}
		console.log(_obj);
		console.log(btoa(_obj));
	}

	var domQuery = {
		htmlCollectionToArray: function (foundNodes) {
			var nodes = [],
				index;

			if (!foundNodes || !foundNodes.length) {
				return nodes;
			}

			for (index = 0; index < foundNodes.length; index++) {
				nodes.push(foundNodes[index]);
			}

			return nodes;
		},
		find: function (selector) {
			// we use querySelectorAll only on document, not on nodes because of its unexpected behavior. See for
			// instance http://stackoverflow.com/questions/11503534/jquery-vs-document-queryselectorall and
			// http://jsfiddle.net/QdMc5/ and http://ejohn.org/blog/thoughts-on-queryselectorall
			if (!document.querySelectorAll || !selector) {
				return []; // we do not support all browsers
			}

			var foundNodes = document.querySelectorAll(selector);

			return this.htmlCollectionToArray(foundNodes);
		},
		findMultiple: function (selectors) {
			if (!selectors || !selectors.length) {
				return [];
			}

			var index, foundNodes;
			var nodes = [];
			for (index = 0; index < selectors.length; index++) {
				foundNodes = this.find(selectors[index]);
				nodes = nodes.concat(foundNodes);
			}

			nodes = this.makeNodesUnique(nodes);

			return nodes;
		},
		findNodesByTagName: function (node, tagName) {
			if (!node || !tagName || !node.getElementsByTagName) {
				return [];
			}

			var foundNodes = node.getElementsByTagName(tagName);

			return this.htmlCollectionToArray(foundNodes);
		},
	};

	function checkIfVisible(el) {
		if (!el) {
			return false;
		}

		function _getStyle(el, property) {
			if (window.getComputedStyle) {
				return document.defaultView.getComputedStyle(el, null)[property];
			}
			if (el.currentStyle) {
				return el.currentStyle[property];
			}
		}

		if ("0" === _getStyle(el, "opacity") || "none" === _getStyle(el, "display") || "hidden" === _getStyle(el, "visibility")) {
			return false;
		}

		return true;
	}

	var _store = pd.store;
	var solts_req = 0,
		rendered = false;

	function gtagHandler(callback) {
		var g = window["googletag"].pubads();
		solts_req = g.getSlots().length;
		store(_store, "gtag_slots", solts_req);

		/* listenForSlots */
		if (!_store.ab) {
			console.debug("pubdefend:: No adblocker detected. listen to gtag");
			g.addEventListener("slotRenderEnded", listenForSlots.bind(null, listenForSlotsCallback), false);
		} else {
			if (callback) {
				callback("blocked");
			}
		}
		console.log("googaltag slots:", solts_req);
		return;
	}

	var listenForSlots = function (callback, event) {
		var slot = event.slot;
		var id = slot.getSlotElementId();
		var elm = document.getElementById(id);
		var isItVisible = checkIfVisible(elm);
		//solts_arr[id] = { render: true, visible: isItVisible };

		console.log("googaltag Slot", slot.getSlotElementId(), "finished rendering.");
		//console.log('Slot', slot.getSlotElementId(), 'visibility:', isItVisible);
		//console.log("solts_arr", solts_arr);

		if (!rendered) {
			var gtagFindElements = domQuery.find('div[id*="google_ad"]');
			store(_store, "gtag_impr", gtagFindElements.length);
			if (callback) {
				callback(gtagFindElements);
			}
		}
		rendered = true;
	};

	var listenForSlotsCallback = function (arr) {
		/* if (!isArray(arr)) return;
		arr.forEach(function (val) {
			console.log(val.parentElement.id);
		}); */
		//console.log(getStore());
	};

	var endpoint = config.endpoints;

	function bait(callback) {
		var url = "https://" + endpoint.cdn + "." + endpoint.domain + "/js/" + endpoint.bait;
		var xhr = new XMLHttpRequest();
		xhr.open("HEAD", url, true);
		xhr.onload = function (e) {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				var status = xhr.status;
				if (status === 0 || (status >= 200 && status < 400)) {
					if (callback) callback(false);
					return;
				}
			}
		};
		xhr.onerror = function (e) {
			if (callback) callback(true);
		};
		xhr.send(null);
	}

	/* 
	https://www.eclipse.org/paho/index.php?page=clients/js/index.php
	https://www.eclipse.org/paho/files/jsdoc/Paho.MQTT.Client.html
	 */

	function MqttClient() {
		var host = "wss://ws.pubdefend.com/ws"; //config.endpoints.websocket + "." + config.endpoints.domain;
		var cid = "cid_" + parseInt(Math.random() * 100, 10);
		var self = this;

		self.topic = "test";
		self.client = new Paho.MQTT.Client(host, cid);
		self.client.onMessageArrived = MessageArrived;
		self.client.onConnectionLost = ConnectionLost;
		Connect();

		/*Initiates a connection to the MQTT broker*/
		function Connect() {
			self.client.connect({
				onSuccess: Connected,
				onFailure: ConnectionFailed,
				keepAliveInterval: 30,
				useSSL: true,
				timeout: 3,
			});
		}

		/*Callback for successful MQTT connection */
		function Connected() {
			console.log("pubdefend:: ws Connected");
			self.client.subscribe(self.topic, {
				qos: 1,
			});

			customEvent("wsLoaded");
		}

		/*Callback for failed connection*/
		function ConnectionFailed(res) {
			console.log("Connect failed:" + res.errorMessage);
		}

		/*Callback for lost connection*/
		function ConnectionLost(res) {
			if (res.errorCode !== 0) {
				console.log("Connection lost:" + res.errorMessage);
				Connect();
			}
		}

		/*Callback for incoming message processing */

		function MessageArrived(message) {
			//console.log(message.destinationName + " : " + message.payloadString);
			/* switch (message.payloadString) {
				case "ON":
					displayClass = "on";
					break;
				case "OFF":
					displayClass = "off";
					break;
				default:
					displayClass = "unknown";
			}
			var topic = message.destinationName.split("/");
			if (topic.length == 3) {
				var ioname = topic[1];
				UpdateElement(ioname, displayClass);
			} */
		}

		function createMessage(topic, payload, qos, retain) {
			var message = new Paho.MQTT.Message(payload);
			message.destinationName = topic;
			message.qos = Number(qos) || 0;
			message.retained = !!retain;

			return message;
		}

		self.publish = function (topic, payload, options, callback) {
			var message = createMessage(topic, payload, options && options.qos, options && options.retain);
			if (callback) {
				if (message.qos < 1) {
					setTimeout(callback);
				} else {
					message.callback = callback;
					messageCache.push(message);
				}
			}
			self.client.send(message);
		};

		self.pub = function (data, callback) {
			if (!data) return;

			var message = new Paho.MQTT.Message(data);
			message.destinationName = self.topic;
			//debug("SEND ON " + message.destinationName + " PAYLOAD " + data);
			//console.log("SEND ON " + message.destinationName + " PAYLOAD " + data);
			if (callback) {
				setTimeout(callback);
			}
			self.client.send(message);
		};

		return self;
	}

	/**
	 * Polyfills
	 * import 'core-js/features/promise';
	 * Promise.resolve(32).then(x => console.log(x));
	 * */

	pd.testcookie = testcookie;
	pd.getStore = getStore;
	pd.wsIsReady = false;

	function isReady(callback) {
		gtagApiReady(function (status) {
			console.log("gtagHandler::", status);
		});
		/**
		 *  Browser Fingerprints.
		 *  TODO:
		 *  - follow changes in the fingerprints
		 */
		var fp = {};
		fp["hardware"] = fpHardware;
		fp["extended"] = fpExtend;
		store(pd.store, "fingerprint", fp);

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
		store(pd.store, "publisher", _p);

		/** generate session id
		 *  Replaced by fingerPrint
		 *  var _sid = uniqueID();
		 *  store(pd.store, "sid", _sid);
		 */
		var _browser = detectBrowser();
		store(pd.store, "browser", _browser);

		store(pd.store, "isMobile", isMobile);

		/** AD blocker bait  */
		var testBait = bait(function (data) {
			store(pd.store, "blocked", data);
		});

		if (callback) {
			callback("isReady");
		}
		return "isReady";
	}

	function gtagApiReady(callback) {
		var limit = 5;
		var g = window["googletag"];

		var apiReady = setInterval(function () {
			console.debug("googaltag apiReady check", limit);

			if (g && g["apiReady"]) {
				console.debug("googaltag apiReady:", g && g["apiReady"]);
				gtagHandler(callback);
				clearInterval(apiReady);
			} else if (limit <= 0) {
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

					try {
						var ws = new MqttClient();
						var listenToWs = window.addEventListener(
							"wsLoaded",
							function (e) {
								pd.wsIsReady = true;
								console.log("listenToWs", e.detail);
								ws.pub(JSON.stringify(getStore()));
							},
							{ once: true }
						);
					} catch (err) {}
				});
			});
		});
	}

	return pd;

}());
