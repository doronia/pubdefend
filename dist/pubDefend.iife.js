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

    var _store$1 = pd.store;
    //Promise.resolve(32).then(x => console.log(x));

    pd.testcookie = testcookie;
    pd.getStore = getStore;
    var w = window,
        g = w.googletag ? w.googletag : false;
    /* AD blocker bait  */

    var testBait = bait(function (data) {
      store(_store$1, 'blocked', data);
    });
    /* function _gtag() {
        if (g) {
            console.log(g.apiReady)
            ready();
        }

    } */

    var init = function init() {
      var apiReady = setInterval(function () {
        if (g && g.apiReady) {
          console.log('apiReady:', g && g.apiReady);
          clearInterval(apiReady);
          gtagHandler();
        }
      }, 100);
    };


    if (runningOnBrowser && !isBot) {
      documentReady(function () {
        var _property = {};
        _property.hostname = getHostName(location.hostname);
        _property.domain = pd.domain;
        _property.pubid = detectPid().id;

        var _sid = uniqueID();

        var _browser = detectBrowser();
        /* Store data */


        store(_store$1, 'publisher', _property);
        store(_store$1, 'sid', _sid);
        store(_store$1, 'browser', _browser);
        store(_store$1, 'mobile', isMobile);
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js');
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

    return pd;

}());
