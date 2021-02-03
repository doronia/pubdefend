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
      cookieName: '_pbdfndEvents',
      cookieDomain: null,
      endpoints: {
        domain: 'pubdefend.com',
        cdn: "c",
        websocket: 'ws',
        bait: 'ad_banner.js'
      },
      queue: []
    };

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

    var endpoint = config.endpoints;
    function bait(callback) {
      var url = 'https://' + endpoint.cdn + '.' + endpoint.domain + "/js/" + endpoint.bait;
      var xhr = new XMLHttpRequest();
      xhr.open("HEAD", url, true);

      xhr.onload = function (e) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          var status = xhr.status;

          if (status === 0 || status >= 200 && status < 400) {
            if (callback) callback(false);
          }
        }
      };

      xhr.onerror = function (e) {
        if (callback) callback(true);
      };

      xhr.send(null);
    }

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

    /* export const isArray = function(obj) { 
        return Object.prototype.toString.call(obj) === '[object Array]' };
     */

    var isArray = function isArray(obj) {
      if (!Array.isArray) {
        Array.isArray = function (arg) {
          return Object.prototype.toString.call(arg) === '[object Array]';
        };
      } else {
        return Array.isArray;
      }
    };
    /* Returns false for null and undefined, true for everything else. */

    var exists = function exists(val) {
      return val !== undefined && val !== null;
    };
    var isObject = function isObject(val) {
      return _typeof(val) === 'object' && exists(val) && !Array.isArray(val) && !(val instanceof RegExp) && !(val instanceof String) && !(val instanceof Number);
    };
    /* export const loadScript = function(src) {
        let script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
    }
     */

    function loadScript(src, onLoad) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;

      if (script.readyState) {
        script.onreadystatechange = function () {
          var state = this.readyState;

          if (state === 'loaded' || state === 'complete') {
            script.onreadystatechange = null;
            if (onLoad) onLoad();
          }
        };
      } else {
        if (onLoad) script.onload = onLoad;
      }

      document.getElementsByTagName('head')[0].appendChild(script);
    }
    var detectPid = function detectPid() {
      var e = document.querySelector('[pub-defend-property]');
      if (e == null) return;
      var d = e.getAttribute('pub-defend-property');
      var o = e.getAttribute('pubdefend-opts') || '{}';
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

    var getHostName = function getHostName(e) {
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
          a = e,
          r;

      for (; n < o; n++) {
        a = (r = lsplit(a, t[n].key, 2)).length > 1 ? r[t[n].index] : r[0];
      }

      return a;
    };
    function uniqueID() {
      return new Date().getTime().toString().concat(performance.now());
    }

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

      if ('0' === _getStyle(el, 'opacity') || 'none' === _getStyle(el, 'display') || 'hidden' === _getStyle(el, 'visibility')) {
        return false;
      }

      return true;
    }

    var Cookies = {
      set: function set(name, value, ttl, domain) {
        var expires = "";
        var cookieDomain = "";

        if (ttl) {
          var date = new Date();
          date.setTime(date.getTime() + ttl * 60 * 1000);
          expires = "; expires=" + date.toGMTString();
        }

        if (domain) {
          cookieDomain = "; domain=" + domain;
        }

        document.cookie = name + "=" + escape(value) + expires + cookieDomain + "; path=/";
      },
      get: function get(name) {
        var i, c;
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');

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

    function store(obj, prop, val) {
      if (!isObject(obj)) return; //if (!isObject(obj) && !isEmpty(obj)) return;
      //console.log('prop:', prop, obj.hasOwnProperty(prop))

      if (!obj.hasOwnProperty(prop)) {
        obj[prop] = val;
      }

      obj[prop] = val;
    }
    function getStore(encode) {
      var _obj = pd.store;
      var storeItems = JSON.stringify(_obj);

      if (encode) {
        return btoa(storeItems);
      }

      return _obj;
    }
    /*  Dev only */

    function testcookie() {
      var _obj = {};
      var arr = Cookies.get(config.cookieName);
      var storeItems = JSON.parse(arr);

      for (var item in storeItems) {
        _obj[storeItems[item].prop] = storeItems[item].val;
      }

      console.log(_obj);
      console.log(btoa(_obj));
    }

    var _store = pd.store;
    var solts_arr = [],
        solts_req = 0,
        solts_rec = 0;
    function gtagHandler() {
      console.log('pubdefend:: ready');
      var g = googletag.pubads();
      solts_req = g.getSlots().length;
      store(_store, 'gtag_slots', solts_req);
      /* listenForSlots */

      if (!_store.ab) {
        console.debug('No adblocker detected');
        g.addEventListener("slotRenderEnded", listenForSlots.bind(null, forEachElemnt), false);
      }

      console.log('slots:', solts_req);
    }

    var listenForSlots = function listenForSlots(callback, event) {
      var slot = event.slot;
      var id = slot.getSlotElementId();
      var elm = document.getElementById(id);
      var isItVisible = checkIfVisible(elm);
      solts_arr[id] = {
        'render': true,
        "visible": isItVisible
      };
      console.log('Slot', slot.getSlotElementId(), 'finished rendering.'); //console.log('Slot', slot.getSlotElementId(), 'visibility:', isItVisible);
      //console.log('solts_arr', solts_arr)

      if (solts_rec < solts_req) {
        var gtag_elements = domQuery.find('div[id*="google_ad"]');
        solts_rec = gtag_elements.length;
        store(_store, 'gtag_impr', solts_rec);
        if (callback) callback(gtag_elements);
      }

      store(_store, 'slots_arr', solts_arr);
    };

    var forEachElemnt = function forEachElemnt(arr) {
      if (!isArray()) return;
      arr.forEach(function (val) {
        console.log(val.parentElement.id);
      });
    };

    var getFingerprint = function getFingerprint(hardwareOnly, callback) {
      var _window$navigator = window.navigator,
          userAgent = _window$navigator.userAgent,
          language = _window$navigator.language,
          languages = _window$navigator.languages,
          platform = _window$navigator.platform,
          hardwareConcurrency = _window$navigator.hardwareConcurrency,
          deviceMemory = _window$navigator.deviceMemory;
      var plugins = Object.entries(window.navigator.plugins).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            plugin = _ref2[1];

        return plugin.name;
      });
      var _window$screen = window.screen,
          colorDepth = _window$screen.colorDepth,
          availWidth = _window$screen.availWidth,
          availHeight = _window$screen.availHeight;
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

      var data = hardwareOnly ? JSON.stringify({
        platform: platform,
        hardwareConcurrency: hardwareConcurrency,
        deviceMemory: deviceMemory,
        colorDepth: colorDepth,
        availWidth: availWidth,
        availHeight: availHeight,
        touchSupport: touchSupport,
        canvas: canvas
      }) : JSON.stringify({
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

      var murmurhash3_32_gc = function murmurhash3_32_gc(key) {
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
      };

      var result = murmurhash3_32_gc(data);

      if (callback) {
        callback(result);
        return;
      }

      return result;
    };

    var fpHardware = getFingerprint(true);
    var fpExtend = getFingerprint(false);

    //Promise.resolve(32).then(x => console.log(x));

    pd.testcookie = testcookie;
    pd.getStore = getStore;
    var w = window,
        g = w.googletag ? w.googletag : false;
    var _store$1 = pd.store;

    var init = function init() {
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
          store(_store$1, "blocked", data);
        });
        /* fingerprints */

        var fingerprint = {};
        fingerprint.hardware = fpHardware;
        fingerprint.extend = fpExtend;
        store(_store$1, "fingerprint", fingerprint);
        var _property = {};
        _property.hostname = getHostName(location.hostname);
        _property.domain = pd.domain;
        _property.pubid = detectPid().id;

        var _sid = uniqueID();

        var _browser = detectBrowser();
        /* Store data */


        store(_store$1, "publisher", _property);
        store(_store$1, "sid", _sid);
        store(_store$1, "browser", _browser);
        store(_store$1, "mobile", isMobile);
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js");
        init();
      });
    }

    return pd;

}());
