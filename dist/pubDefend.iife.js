var pubdefend = (function () {
	'use strict';

	var pd = window.pubDefend || window.pubdefend || {};
	pd.state = {
	  ws: false
	};
	pd.store = {};
	pd.eventQueue = [];
	pd.slotsQueue = [];

	var config = {
	  cookies: true,
	  cookieName: "_pbdfndEvents",
	  cookieDomain: null,
	  endpoints: {
	    base: "pubdefend.com",
	    cdn: "c",
	    ws: "ws",
	    bait: "ad_banner.js"
	  },
	  queue: []
	};

	function log(isDebug) {
	  if (isDebug && window.console && typeof console.log === "function") {
	    window.logger = {
	      log: window.console.log.bind(console.log),
	      error: window.console.error.bind(console.error),
	      info: window.console.info.bind(console.info),
	      warn: window.console.warn.bind(console.warn),
	      //table: window.console.table.bind(console.table),
	      group: window.console.group.bind(console.group),
	      groupEnd: window.console.groupEnd.bind(console.groupEnd),
	      debug: window.console.debug.bind(console.debug)
	    };
	  } else {
	    var __no_op = function __no_op() {};

	    window.logger = {
	      log: __no_op,
	      error: __no_op,
	      warn: __no_op,
	      info: __no_op,
	      //table: __no_op,
	      group: __no_op,
	      groupEnd: __no_op,
	      debug: __no_op
	    };
	  }
	}

	var runningOnBrowser = typeof window !== "undefined"; //export const isBot = runningOnBrowser || (typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

	var isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
	var supportsClassList = runningOnBrowser && "classList" in document.createElement("p");
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	var detectBrowser = function detectBrowser() {
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

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _createForOfIteratorHelper(o, allowArrayLike) {
	  var it;

	  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
	    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	      if (it) o = it;
	      var i = 0;

	      var F = function () {};

	      return {
	        s: F,
	        n: function () {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function (e) {
	          throw e;
	        },
	        f: F
	      };
	    }

	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  var normalCompletion = true,
	      didErr = false,
	      err;
	  return {
	    s: function () {
	      it = o[Symbol.iterator]();
	    },
	    n: function () {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function (e) {
	      didErr = true;
	      err = e;
	    },
	    f: function () {
	      try {
	        if (!normalCompletion && it.return != null) it.return();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}

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
	var isArray = function isArray(obj) {
	  if (!Array.isArray) {
	    Array.isArray = function (arg) {
	      return Object.prototype.toString.call(arg) === "[object Array]";
	    };
	  } else {
	    return Array.isArray;
	  }
	};

	function murmurhash3_32_gc(key) {
	  var remainder = key.length & 3; // key.length % 4

	  var bytes = key.length - remainder;
	  var c1 = 0xcc9e2d51;
	  var c2 = 0x1b873593;
	  var h1, h1b, k1;

	  for (var _i = 0; _i < bytes; _i++) {
	    k1 = key.charCodeAt(_i) & 0xff | (key.charCodeAt(++_i) & 0xff) << 8 | (key.charCodeAt(++_i) & 0xff) << 16 | (key.charCodeAt(++_i) & 0xff) << 24;
	    ++_i;
	    k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
	    k1 = k1 << 15 | k1 >>> 17;
	    k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
	    h1 ^= k1;
	    h1 = h1 << 13 | h1 >>> 19;
	    h1b = (h1 & 0xffff) * 5 + (((h1 >>> 16) * 5 & 0xffff) << 16) & 0xffffffff;
	    h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654 & 0xffff) << 16);
	  }

	  var i = bytes - 1;
	  k1 = 0;

	  switch (remainder) {
	    case 3:
	      {
	        k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
	        break;
	      }

	    case 2:
	      {
	        k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
	        break;
	      }

	    case 1:
	      {
	        k1 ^= key.charCodeAt(i) & 0xff;
	        break;
	      }
	  }

	  k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
	  k1 = k1 << 15 | k1 >>> 17;
	  k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
	  h1 ^= k1;
	  h1 ^= key.length;
	  h1 ^= h1 >>> 16;
	  h1 = (h1 & 0xffff) * 0x85ebca6b + (((h1 >>> 16) * 0x85ebca6b & 0xffff) << 16) & 0xffffffff;
	  h1 ^= h1 >>> 13;
	  h1 = (h1 & 0xffff) * 0xc2b2ae35 + (((h1 >>> 16) * 0xc2b2ae35 & 0xffff) << 16) & 0xffffffff;
	  h1 ^= h1 >>> 16;
	  return h1 >>> 0;
	}

	var getFingerprint = function getFingerprint(hardwareOnly, callback) {
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
	  var plugins = entries(w.navigator.plugins).map(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        plugin = _ref2[1];

	    return plugin.name;
	  });
	  var timezoneOffset = new Date().getTimezoneOffset();
	  var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	  var touchSupport = ("ontouchstart" in window);

	  var canvas = function () {
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
	  }();

	  var doNotTrack = function () {
	    if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || "msTrackingProtectionEnabled" in window.external) {
	      if (window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" || window.external.msTrackingProtectionEnabled()) {
	        return true;
	      } else {
	        return false;
	      }
	    } else {
	      return undefined;
	    }
	  }();

	  var hardware = JSON.stringify({
	    platform: platform,
	    hardwareConcurrency: hardwareConcurrency,
	    deviceMemory: deviceMemory,
	    colorDepth: colorDepth,
	    availWidth: availWidth,
	    availHeight: availHeight,
	    touchSupport: touchSupport,
	    canvas: canvas
	  });
	  var extended = JSON.stringify({
	    userAgent: userAgent,
	    language: language,
	    languages: languages,
	    platform: platform,
	    hardwareConcurrency: hardwareConcurrency,
	    deviceMemory: deviceMemory,
	    plugins: plugins,
	    colorDepth: colorDepth,
	    availWidth: availWidth,
	    availHeight: availHeight,
	    timezoneOffset: timezoneOffset,
	    timezone: timezone,
	    touchSupport: touchSupport,
	    canvas: canvas,
	    doNotTrack: doNotTrack
	  });
	  /* var data = hardwareOnly
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
	  	  */

	  var resultHardware = murmurhash3_32_gc(hardware);
	  var resultExtended = murmurhash3_32_gc(extended);
	  var result = resultHardware + "." + resultExtended;

	  if (callback) {
	    callback(result);
	    return;
	  }

	  return result;
	};

	var fp = getFingerprint();

	/* Returns false for null and undefined, true for everything else. */

	var exists = function exists(val) {
	  return val !== undefined && val !== null;
	};
	var isObject = function isObject(val) {
	  return _typeof(val) === "object" && exists(val) && !Array.isArray(val) && !(val instanceof RegExp) && !(val instanceof String) && !(val instanceof Number);
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
	var detectPid = function detectPid(str) {
	  var e = document.querySelector(str);
	  if (e == null) return;
	  var d = e.getAttribute("pd-prop");
	  var o = e.getAttribute("pubdefend-opts") || "{}";
	  return {
	    id: d,
	    options: o
	  };
	};
	function parseBase64(str) {
	  if (!str) return;
	  var decodeStr = JSON.stringify(atob(str));
	  decodeStr = JSON.parse(decodeStr);
	  var properties = decodeStr.split(",");
	  var obj = {};
	  properties.forEach(function (property) {
	    var prop = property.split(":");
	    obj[prop[0]] = prop[1];
	  });
	  return obj;
	}
	var documentReady = function documentReady(callback) {
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

	function getHostName() {
	  var t = [{
	    key: "?",
	    index: 0
	  }, {
	    key: "://",
	    index: 1
	  }, {
	    key: "//",
	    index: 1
	  }, {
	    key: "/",
	    index: 0
	  }, {
	    key: ":",
	    index: 0
	  }],
	      n = 0,
	      o = t.length,
	      a = location.hostname,
	      r;

	  for (; n < o; n++) {
	    a = (r = lsplit(a, t[n].key, 2)).length > 1 ? r[t[n].index] : r[0];
	  }

	  return a;
	}

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

	var _eventQueue = pd.eventQueue;
	/* 
	import Cookies from "./pubdefend.cookies";

	export const setCookie = function (name, value, ttl) {
		Cookies.set(name, value, ttl, config.cookieDomain || config.endpoints.base);
	};

	export const getCookie = function (name) {
		return Cookies.get(name);
	};

	export const destroyCookie = function (name) {
		Cookies.set(name, "", -1);
	};

	export const saveEventQueue = function (eventQueue) {
		if (canStringify) {
			setCookie(config.cookieName, JSON.stringify(eventQueue), 60);
		}
	};
	 */

	/* export function addEventListener(element, eventType, eventHandler, useCapture) {
		if (element.addEventListener) {
			element.addEventListener(eventType, eventHandler, useCapture);
			return true;
		}
		if (element.attachEvent) {
			return element.attachEvent(eventType, eventHandler);
		}
		element["on" + eventType] = eventHandler;
	} */

	function saveEventQueue(eventName, data) {
	  if (!eventName) _eventQueue[eventName] = data;
	  /* if (_eventQueue.indexOf(name) !== -1) {
	  	_eventQueue[name].push(data);
	  } else {
	  	logger.warn("eventQueue duplicate key:", _eventQueue, name, data);
	  } */
	}
	function store(obj, prop, val) {
	  if (!isObject(obj)) return;
	  obj[prop] = val;
	  /* <Dev Only> */

	  if (isObject(val)) {
	    var _iterator = _createForOfIteratorHelper(entries(val)),
	        _step;

	    try {
	      for (_iterator.s(); !(_step = _iterator.n()).done;) {
	        var _step$value = _slicedToArray(_step.value, 2),
	            key = _step$value[0],
	            value = _step$value[1];

	        appendLog(prop + "::" + key + ": " + value);
	      }
	    } catch (err) {
	      _iterator.e(err);
	    } finally {
	      _iterator.f();
	    }
	  } else {
	    appendLog(prop + ": " + val);
	  }
	  /* </Dev Only> */

	}
	function getStore(encode) {
	  var _obj = pd.store;
	  var storeItems = JSON.stringify(_obj);

	  if (encode) {
	    return btoa(storeItems);
	  }

	  return _obj;
	}
	function customEvent(eventName, payload) {
	  if (!eventName) return;
	  var payload = payload ? payload : "none";
	  var event;
	  var eventString = eventName;

	  try {
	    event = new CustomEvent(eventString, {
	      detail: {
	        payload: payload
	      }
	    });
	  } catch (err) {
	    event = document.createEvent("CustomEvent");
	    event.initCustomEvent(eventString, false, false, {
	      payload: payload
	    });
	  }

	  window.dispatchEvent(event);
	}
	/*
	// Dev only
	export function testcookie() {
		var _obj = {};
		var arr = Cookies.get(config.cookieName);
		var storeItems = JSON.parse(arr);

		for (let item in storeItems) {
			_obj[storeItems[item].prop] = storeItems[item].val;
		}
		console.log(_obj);
		console.log(btoa(_obj));
	}
	*/

	var domQuery = {
	  htmlCollectionToArray: function htmlCollectionToArray(foundNodes) {
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
	  find: function find(selector) {
	    // we use querySelectorAll only on document, not on nodes because of its unexpected behavior. See for
	    // instance http://stackoverflow.com/questions/11503534/jquery-vs-document-queryselectorall and
	    // http://jsfiddle.net/QdMc5/ and http://ejohn.org/blog/thoughts-on-queryselectorall
	    if (!document.querySelectorAll || !selector) {
	      return []; // we do not support all browsers
	    }

	    var foundNodes = document.querySelectorAll(selector);
	    return this.htmlCollectionToArray(foundNodes);
	  },
	  findMultiple: function findMultiple(selectors) {
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
	  findNodesByTagName: function findNodesByTagName(node, tagName) {
	    if (!node || !tagName || !node.getElementsByTagName) {
	      return [];
	    }

	    var foundNodes = node.getElementsByTagName(tagName);
	    return this.htmlCollectionToArray(foundNodes);
	  }
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
	function googletagHandler(callback) {
	  var gtag = window["googletag"];
	  /* googletag defined Slots */

	  function Slots() {
	    return window.googletag.pubads().getSlots().map(function (slot) {
	      return {
	        id: slot.getSlotElementId()
	      };
	    });
	  }

	  solts_req = Slots();
	  store(_store, "gtag_slots", solts_req.length);
	  logger.log("googaltag:: slots count:", solts_req);
	  gtag.pubads().addEventListener("slotRenderEnded", listenForSlots.bind(null, listenForSlotsCallback), false);

	  if (callback) {
	    callback(Slots());
	  }

	  return;
	}

	function listenForSlots(callback, event) {
	  var slot = event.slot;
	  var slotId = slot.getSlotElementId();
	  var slotElm = document.getElementById(slotId);
	  var slotIsVisible = checkIfVisible(slotElm);
	  ({
	    0: true,
	    1: slotIsVisible,
	    2: event.isEmpty,
	    3: event.size
	  });
	  logger.log("googaltag:: Slot", slot.getSlotElementId(), "finished rendering.");

	  if (!rendered) {
	    var FindElements = domQuery.find('div[id*="google_ad"]');
	    store(_store, "gtag_impr", FindElements.length);
	    customEvent("impr", FindElements.length);

	    if (callback) {
	      callback(FindElements);
	    }
	  }

	  rendered = true;
	}

	var listenForSlotsCallback = function listenForSlotsCallback(arr) {
	  if (isArray()) ;
	};

	function bait(callback) {
	  var endpoint = config.endpoints;
	  var url = "https://" + endpoint.cdn + "." + endpoint.base + "/js/" + endpoint.bait;
	  var xhr = new XMLHttpRequest();
	  xhr.open("HEAD", url, true);

	  xhr.onload = function (e) {
	    if (xhr.readyState === XMLHttpRequest.DONE) {
	      var status = xhr.status;

	      if (status === 0 || status >= 200 && status < 400) {
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
	  var host = "wss://" + config.endpoints.ws + "." + config.endpoints.base + "/ws";
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
	      timeout: 3
	    });
	  }
	  /*Callback for successful MQTT connection */


	  function Connected() {
	    logger.log("pubdefend:: ws Connected");
	    self.client.subscribe(self.topic, {
	      qos: 1
	    });
	    customEvent("wsLoaded", "Connected");
	  }
	  /*Callback for failed connection*/


	  function ConnectionFailed(res) {
	    logger.log("Connect failed:" + res.errorMessage);
	  }
	  /*Callback for lost connection*/


	  function ConnectionLost(res) {
	    if (res.errorCode !== 0) {
	      logger.log("Connection lost:" + res.errorMessage);
	      Connect();
	    }
	  }
	  /*Callback for incoming message processing */


	  function MessageArrived(message) {//logger.log(message.destinationName + " : " + message.payloadString);

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
	    message.destinationName = self.topic; //debug("SEND ON " + message.destinationName + " PAYLOAD " + data);
	    //logger.log("SEND ON " + message.destinationName + " PAYLOAD " + data);

	    if (callback) {
	      setTimeout(callback);
	    }

	    self.client.send(message);
	  };

	  return self;
	}

	/* Polyfills*/
	//import 'core-js/features/promise';
	//Promise.resolve(32).then(x => logger.log(x));

	pd.getStore = getStore;
	var ws;
	var _store$1 = pd.store;

	function isReady(callback) {
	  /**
	   *  Browser Fingerprints.
	   *  TODO:
	   *  - follow changes in the fingerprints
	   */
	  store(_store$1, "vid", fp);
	  /**
	   *  publisher properties.
	   *  TODO:
	   * 	- validate domaian indexof hostname
	   */

	  var _p = {};
	  _p["h"] = getHostName(); //_p["d"] = "sponser.co.il" ? "sponser.co.il" : undefined;
	  //_p["ss"] = -1 !== _p["h"].indexOf(_p["d"].toString());

	  _p["p"] = detectPid("[pd-prop]").id;
	  console.table(parseBase64(_p.p));
	  store(_store$1, "pub", _p);
	  /** generate session id
	   *  Replaced by fingerPrint
	   *  var _sid = uniqueID();
	   *  store(_store, "sid", _sid);
	   */

	  var _browser = detectBrowser();

	  store(_store$1, "browser", _browser);
	  store(_store$1, "isMobile", isMobile);

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
	        store(_store$1, "ab", e);
	        pd.state["ab"] = true;
	        customEvent("ab", e.toString());
	      });
	      logger.log("pubdefend:: Loading paho lib");
	      loadScript("https://" + config.endpoints.cdn + "." + config.endpoints.base + "/js/mqttws31.min.js", function () {
	        logger.info("pubdefend:: paho lib ready");
	        ws = new MqttClient();
	      });

	      function eventQueueHandler(prop, event) {
	        /**
	         TODO: handle ws publish if not connected.
	        	*/
	        if (!prop) return;
	        console.log("pubdefend[" + prop + " Listener]:: ws", pd.state["ws"]);
	        pd.state[prop] = true;

	        if (pd.state["ws"]) {
	          saveEventQueue(prop, event.detail.payload);
	          console.log("pubdefend[EventQueue]::", prop, e.detail.payload);
	        }

	        window.removeEventListener(event.type, eventQueueHandler, false);
	      }

	      var onImpr = window.addEventListener("impr", eventQueueHandler.bind(null, "impr"), false);
	      var onAb = window.addEventListener("ab", eventQueueHandler.bind(null, "ab"), false);
	      /* window.addEventListener(
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
	      ); */

	      /* window.addEventListener(
	      	"ab",
	      	function (e) {
	      		console.log("pubdefend[ab Listener]:: ws", pd.state["ws"]);
	      				if (pd.state["ws"]) {
	      			saveEventQueue("ab", e.detail.payload);
	      			console.log("pubdefend[EventQueue]:: ab", e.detail.payload);
	      		}
	      	},
	      	true
	      ); */

	      window.addEventListener("wsLoaded", function (e) {
	        console.info("pubdefend[ws Listener]::", e.detail.payload);
	        console.table(pd.state); //console.table(pd.store);

	        console.info("pubdefend[ws]::", "is impr?", pd.state.hasOwnProperty("impr"));
	        console.info("pubdefend[ws]::", "is ab?", pd.state.hasOwnProperty("ab"));
	        pd.state["ws"] = true;
	        logger.info(getStore());
	        ws.pub(JSON.stringify(getStore(true)));
	        console.table(pd.store);
	        logger.log("pubdefend[status]:: ws", pd.state["ws"]);
	      }, true);
	    });
	  });
	}

	return pd;

}());
