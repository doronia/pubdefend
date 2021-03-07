var pubdefend = (function () {
	'use strict';

	var pd = window.pubDefend || window.pubdefend || {};
	pd.state = {};
	pd.store = {};
	pd.eventQueue = [];
	pd.slotsQueue = [];

	var config = {
	  endpoints: {
	    base: "pubdefend.com",
	    cdn: "c",
	    ws: "ws",
	    bait: "ad_banner.js"
	  },
	  constants: {
	    ws: "___pd_ws",
	    gtag: "___pd_gt",
	    adblocker: "___pd_ab"
	  },
	  dom: {
	    modal: "overlayAdb"
	  },
	  queue: []
	};

	function log(isDebug) {
	  if (isDebug && window.console && typeof console.log === "function") {
	    window.logger = {
	      log: window.console.log.bind(console.log)
	    };
	  } else {
	    window.logger = function () {};
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
	function uniqueID() {
	  var uid = new Date().getTime().toString().concat(performance.now());
	  return murmurhash3_32_gc(uid);
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
	  if (!eventName || !data) return;
	  _eventQueue[eventName] = data;
	  /* if (_eventQueue.indexOf(name) !== -1) {
	  	_eventQueue[name].push(data);
	  } else {
	  	logger.warn("eventQueue duplicate key:", _eventQueue, name, data);
	  } */
	}
	function store(obj, prop, val) {
	  if (!isObject(obj) || !prop || 0 === prop.length || !val || 0 === val.length) return;
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
	function stateListeners(event) {
	  /**
	   TODO: handle ws publish if not connected.
	   */
	  if (!event.type) return;
	  logger.log("pubdefend [" + event.type + " Listener]:: ws", pd.state[config.constants.ws]);
	  pd.state[event.type] = true;

	  if (pd.state[config.constants.ws]) {
	    /* Dev only */
	    saveEventQueue(event.type, event.detail.payload);
	    logger.log("pubdefend [EventQueue]::", event.type, event.detail.payload);
	    logger.log("pubdefend [publish]::", event.type, event.detail.payload);
	    /* publish message to server */

	    ws.pub(JSON.stringify(getStore(false)));
	  }
	  /**
	   * If adblocker active, display modalBox to the user.
	   *
	   * TODO:
	   * Config->dom: update modal element id
	   * CSS: update modal element id name
	   *
	   */


	  if (event.type == config.constants.adblocker && event.detail.payload == "true") {
	    console.log("adblocker active?", event.detail.payload);
	    document.getElementById(config.dom.modal).style.display = "block";
	  }

	  window.removeEventListener(event.type, stateListeners);
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

	function addStyle(styles) {
	  /* Create style document */
	  var css = document.createElement("style");
	  css.type = "text/css";
	  if (css.styleSheet) css.styleSheet.cssText = styles;else css.appendChild(document.createTextNode(styles));
	  /* Append style to the tag name */

	  document.getElementsByTagName("head")[0].appendChild(css);
	}

	var _store = pd.store;
	var solts_req = 0,
	    rendered = false;
	function googletagHandler(callback) {
	  /* googletag defined Slots */
	  function Slots() {
	    return window["googletag"].pubads().getSlots().map(function (slot) {
	      return {
	        id: slot.getSlotElementId()
	      };
	    });
	  }

	  solts_req = Slots();
	  store(_store, "gds", solts_req.length);
	  logger.log("pubdefend [g]:: slots count:", solts_req);
	  window["googletag"].pubads().addEventListener("slotRenderEnded", listenForSlots, false);

	  if (callback) {
	    callback("listen");
	  }

	  return;
	}

	function listenForSlots(event) {
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
	  logger.log("pubdefend [g]:: Slot", slot.getSlotElementId(), "finished rendering.");

	  if (!rendered) {
	    var FindElements = domQuery.find('div[id*="google_ad"]');
	    store(_store, "grs", FindElements.length);
	    customEvent(config.constants.gtag, FindElements.length);
	  }

	  rendered = true;
	}

	function bait(callback) {
	  var endpoint = config.endpoints;
	  var url = "https://" + endpoint.cdn + "." + endpoint.base + "/js/" + endpoint.bait;
	  var xhr = new XMLHttpRequest();
	  xhr.open("HEAD", url, true);

	  xhr.onload = function (e) {
	    if (xhr.readyState === XMLHttpRequest.DONE) {
	      var status = xhr.status;

	      if (status === 0 || status >= 200 && status < 400) {
	        if (callback) callback("false");
	        return;
	      }
	    }
	  };

	  xhr.onerror = function (e) {
	    if (callback) callback("true");
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
	    self.client.subscribe(self.topic, {
	      qos: 1
	    });
	    customEvent(config.constants.ws, "Connected");
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
	    message.destinationName = self.topic;

	    if (callback) {
	      setTimeout(callback);
	    }

	    self.client.send(message);
	    logger.log("pubdefend [ws]:: published");
	  };

	  return self;
	}

	/* Polyfills*/
	//import 'core-js/features/promise';
	//Promise.resolve(32).then(x => logger.log(x));

	pd.getStore = getStore;
	var ws$1;
	var _store$1 = pd.store;

	function isReady(callback) {
	  /**
	   *  Add css style to the document.
	   * @".abd{position:relative;z-index:1111111111}@media only screen and (max-height:840px){.abd{position:static!important}#overlayAdb{position:absolute!important;background:rgba(0,0,0,.4)}#divAdBlocker{outline:10000px rgba(0,0,0,.4) solid}#pianoBottomBanner{z-index:1}#overlayAdb{height:1000%}#article #menu.fixed{display:none}}#divAdbInst,#scInst1,#scInst2,#scInst3{display:none;background-color:#fff;border-radius:5px 5px}#overlayAdb{position:fixed;height:1000%;width:100%;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.9);display:none;z-index:1000;padding-top:50px}.liIns{cursor:pointer}#divAdbInst{padding:50px 50px}#divAdbInst .nav{position:relative}#divAdBlocker{width:460px;margin:0 auto;text-align:center;background-color:#fff;padding:10px 50px;border-radius:5px 5px;z-index:11111}#divAdBlocker .abMain{margin:58px auto 45px}#divAdBlocker h1{font-family:almoniDL900;font-size:48px;font-weight:900;font-style:normal;line-height:1;letter-spacing:normal;text-align:center;color:#1a1a1a;margin:0 auto 43px}#divAdBlocker p{font-family:almoniDL400;font-size:18px;font-weight:400;line-height:1.56;letter-spacing:normal;text-align:right;color:#000}#divAdBlocker .btnWr{display:flex;margin:56px auto 22px}#divAdBlocker .btnWr a,.myAB .close{flex:1 1 120px;text-align:center;display:inline-block;font-family:demibold;padding:0 32px;min-width:64px;font-size:18px;height:46px;line-height:46px}#divAdBlocker .btnWr .close,.myAB .close{border:.5px solid #97133f;border:solid .5px var(--btnBgColor);color:#97133f;color:var(--btnBgColor);margin-left:20px}#divAdBlocker .btnWr .buy{border:.5px solid #97133f;background:#97133f;background:var(--btnBgColor);color:#fff;color:var(--primaryNegativeTxtColor)}#divAdBlocker .btnWr a:hover,.myAB .close:hover{background:#700b2d;background:var(--btnHoverBgColor);color:#fff;color:var(--primaryNegativeTxtColor)}#divAdBlocker .ihave{font-family:almoniDL400;font-size:18px;line-height:1.56;text-align:center;color:#000;border-bottom:1px #000 solid;margin:0 auto 22px;display:inline-block}.myAB{width:750px;margin:0 auto 50px;text-align:center}.myAB h2{font-family:almoniDL900;font-size:30px;font-weight:900;font-style:normal;line-height:1;letter-spacing:normal;text-align:center;color:#1a1a1a;margin:0 auto 50px}.myAB ul{overflow:hidden;border-bottom:1px #cfcfcf solid;margin-bottom:30px}.myAB li{list-style:none;float:right}.myAB .nav li{width:33%;display:inline-block;padding-bottom:10px}.myAB .nav li{font-family:demibold;font-size:18px;font-weight:900;font-style:normal;line-height:135px;letter-spacing:normal;text-align:center;color:#1a1a1a;height:75px}.myAB .Ad1Block{background:url(https://images.globes.co.il/globes/20042020/icon_adblock.png) center 0 no-repeat}.myAB .AdBlockPlus{background:url(https://images.globes.co.il/globes/20042020/icon_adblock_plus.png) center 0 no-repeat}.myAB .uBlock{background:url(https://images.globes.co.il/globes/20042020/icon_ublock.png) center 0 no-repeat}.myAB .main{overflow:hidden;padding:15px 40px 20px}.myAB .main .desrc{float:right;width:65%;text-align:right}.myAB .main h3{margin:-5px 0 0 0;font-family:almoniDL700;font-size:24px;font-style:normal;line-height:36px;color:#1a1a1a}.myAB .desrc ul{margin:20px 0 30px;list-style:decimal;border:0}.myAB .desrc li{font-size:18px;line-height:31px;font-family:almoniDL400;color:#000;margin-right:25px;list-style:decimal;direction:rtl}.myAB .anim{float:left;width:30%}.myAB li span img{width:20px;height:20px;position:relative;top:4px}.myAB li span{margin:0 5px}.slider{position:absolute;bottom:0;left:0;width:33.333%!important;height:2px!important;padding:0!important;background-color:#c00;transition:left .5s}.liIns:nth-child(1).active~.slider{left:66.6666%}.liIns:nth-child(2).active~.slider{left:33.333%}" generated from the bundler
	   *
	   *  TODO:
	   *  - Handle loading html from the bundler
	   *  - Add modal functions (reload page, instructions how to disable adblock..)
	   *  - Test on: FF, Chrome, IE, Safari and Edge.
	   */
	  var _modalCss = ".abd{position:relative;z-index:1111111111}@media only screen and (max-height:840px){.abd{position:static!important}#overlayAdb{position:absolute!important;background:rgba(0,0,0,.4)}#divAdBlocker{outline:10000px rgba(0,0,0,.4) solid}#pianoBottomBanner{z-index:1}#overlayAdb{height:1000%}#article #menu.fixed{display:none}}#divAdbInst,#scInst1,#scInst2,#scInst3{display:none;background-color:#fff;border-radius:5px 5px}#overlayAdb{position:fixed;height:1000%;width:100%;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.9);display:none;z-index:1000;padding-top:50px}.liIns{cursor:pointer}#divAdbInst{padding:50px 50px}#divAdbInst .nav{position:relative}#divAdBlocker{width:460px;margin:0 auto;text-align:center;background-color:#fff;padding:10px 50px;border-radius:5px 5px;z-index:11111}#divAdBlocker .abMain{margin:58px auto 45px}#divAdBlocker h1{font-family:almoniDL900;font-size:48px;font-weight:900;font-style:normal;line-height:1;letter-spacing:normal;text-align:center;color:#1a1a1a;margin:0 auto 43px}#divAdBlocker p{font-family:almoniDL400;font-size:18px;font-weight:400;line-height:1.56;letter-spacing:normal;text-align:right;color:#000}#divAdBlocker .btnWr{display:flex;margin:56px auto 22px}#divAdBlocker .btnWr a,.myAB .close{flex:1 1 120px;text-align:center;display:inline-block;font-family:demibold;padding:0 32px;min-width:64px;font-size:18px;height:46px;line-height:46px}#divAdBlocker .btnWr .close,.myAB .close{border:.5px solid #97133f;border:solid .5px var(--btnBgColor);color:#97133f;color:var(--btnBgColor);margin-left:20px}#divAdBlocker .btnWr .buy{border:.5px solid #97133f;background:#97133f;background:var(--btnBgColor);color:#fff;color:var(--primaryNegativeTxtColor)}#divAdBlocker .btnWr a:hover,.myAB .close:hover{background:#700b2d;background:var(--btnHoverBgColor);color:#fff;color:var(--primaryNegativeTxtColor)}#divAdBlocker .ihave{font-family:almoniDL400;font-size:18px;line-height:1.56;text-align:center;color:#000;border-bottom:1px #000 solid;margin:0 auto 22px;display:inline-block}.myAB{width:750px;margin:0 auto 50px;text-align:center}.myAB h2{font-family:almoniDL900;font-size:30px;font-weight:900;font-style:normal;line-height:1;letter-spacing:normal;text-align:center;color:#1a1a1a;margin:0 auto 50px}.myAB ul{overflow:hidden;border-bottom:1px #cfcfcf solid;margin-bottom:30px}.myAB li{list-style:none;float:right}.myAB .nav li{width:33%;display:inline-block;padding-bottom:10px}.myAB .nav li{font-family:demibold;font-size:18px;font-weight:900;font-style:normal;line-height:135px;letter-spacing:normal;text-align:center;color:#1a1a1a;height:75px}.myAB .Ad1Block{background:url(https://images.globes.co.il/globes/20042020/icon_adblock.png) center 0 no-repeat}.myAB .AdBlockPlus{background:url(https://images.globes.co.il/globes/20042020/icon_adblock_plus.png) center 0 no-repeat}.myAB .uBlock{background:url(https://images.globes.co.il/globes/20042020/icon_ublock.png) center 0 no-repeat}.myAB .main{overflow:hidden;padding:15px 40px 20px}.myAB .main .desrc{float:right;width:65%;text-align:right}.myAB .main h3{margin:-5px 0 0 0;font-family:almoniDL700;font-size:24px;font-style:normal;line-height:36px;color:#1a1a1a}.myAB .desrc ul{margin:20px 0 30px;list-style:decimal;border:0}.myAB .desrc li{font-size:18px;line-height:31px;font-family:almoniDL400;color:#000;margin-right:25px;list-style:decimal;direction:rtl}.myAB .anim{float:left;width:30%}.myAB li span img{width:20px;height:20px;position:relative;top:4px}.myAB li span{margin:0 5px}.slider{position:absolute;bottom:0;left:0;width:33.333%!important;height:2px!important;padding:0!important;background-color:#c00;transition:left .5s}.liIns:nth-child(1).active~.slider{left:66.6666%}.liIns:nth-child(2).active~.slider{left:33.333%}";

	  {
	    addStyle(_modalCss);
	  }
	  /**
	   * FingerPrint
	   * @fp
	   * - Store generated FingerPrint
	   * - Watch FingerPrint value
	   */


	  store(_store$1, "fip", fp);
	  /**
	   *  publisher properties.
	   *  @hos Host name
	   *  @Pub Publisher properties from document
	   */

	  store(_store$1, "hos", getHostName());
	  var pub = atob(detectPid("[pd-prop]").id);
	  store(_store$1, "pub", JSON.parse(pub));
	  /**
	   * Session ID
	   * @sid
	   * - generate session id for uniqe updates on DB
	   *
	   */

	  store(_store$1, "sid", uniqueID());
	  /**
	   * Browser and Platform
	   * @brw browser
	   * @mob is mobile device?
	   */

	  var _browser = detectBrowser();

	  store(_store$1, "brw", _browser);
	  store(_store$1, "mob", isMobile);
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
	        store(_store$1, "ab", res);
	        pd.state[config.constants.adblocker] = true;
	        customEvent(config.constants.adblocker, res);
	      });
	      logger.log("pubdefend[ws]:: init..");
	      loadScript("https://" + config.endpoints.cdn + "." + config.endpoints.base + "/js/mqttws31.min.js", function () {
	        logger.log("pubdefend [ws]:: ready");
	        ws$1 = new MqttClient();
	      });
	      var onImpr = window.addEventListener(config.constants.gtag, stateListeners);
	      var onAb = window.addEventListener(config.constants.adblocker, stateListeners);
	      window.addEventListener(config.constants.ws, function pub(event) {
	        logger.log("pubdefend [ws Listener]::", event.detail.payload);
	        logger.log("pubdefend [ws state]::", config.constants.gtag, "isReady?", pd.state.hasOwnProperty(config.constants.gtag));
	        logger.log("pubdefend [ws state]::", config.constants.adblocker, "isReady?", pd.state.hasOwnProperty(config.constants.adblocker));
	        logger.log(getStore(true));
	        pd.state[config.constants.ws] = true;
	        ws$1.pub(JSON.stringify(getStore(true)));
	        window.removeEventListener(config.constants.ws, pub);
	      });
	    });
	  });
	}

	return pd;

}());
