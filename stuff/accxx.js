! function(t) {
    var e = {};

    function n(r) {
      if (e[r]) return e[r].exports;
      var s = e[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(s.exports, s, s.exports, n), s.l = !0, s.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: r
      })
    }, n.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      })
    }, n.t = function(t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
          enumerable: !0,
          value: t
        }), 2 & e && "string" != typeof t)
        for (var s in t) n.d(r, s, function(e) {
          return t[e]
        }.bind(null, s));
      return r
    }, n.n = function(t) {
      var e = t && t.__esModule ? function() {
        return t.default
      } : function() {
        return t
      };
      return n.d(e, "a", e), e
    }, n.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 148)
  }([function(t, e, n) {
    "use strict";
    n.d(e, "o", (function() {
      return r
    })), n.d(e, "q", (function() {
      return s
    })), n.d(e, "p", (function() {
      return i
    })), n.d(e, "l", (function() {
      return o
    })), n.d(e, "f", (function() {
      return c
    })), n.d(e, "n", (function() {
      return a
    })), n.d(e, "h", (function() {
      return u
    })), n.d(e, "e", (function() {
      return d
    })), n.d(e, "c", (function() {
      return l
    })), n.d(e, "d", (function() {
      return h
    })), n.d(e, "b", (function() {
      return g
    })), n.d(e, "m", (function() {
      return p
    })), n.d(e, "a", (function() {
      return f
    })), n.d(e, "g", (function() {
      return b
    })), n.d(e, "i", (function() {
      return m
    })), n.d(e, "k", (function() {
      return v
    })), n.d(e, "j", (function() {
      return w
    }));
    n(7);

    function r(t) {
      return null != t
    }

    function s(t) {
      return r(t) && "string" == typeof t && "" !== t
    }

    function i(t) {
      return r(t) && "string" == typeof t
    }

    function o(t) {
      return r(t) && "number" == typeof t
    }

    function c(t) {
      return r(t) && "boolean" == typeof t
    }

    function a(t) {
      return "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t
    }

    function u(t) {
      return "function" == typeof t
    }

    function d(t) {
      return "[object Array]" === Object.prototype.toString.call(t)
    }

    function l(t, e) {
      for (const n in t) t.hasOwnProperty(n) && e.call(t[n], t[n], n)
    }

    function h(t, e) {
      return !(!r(t) || !r(e)) && (i(t) ? -1 !== t.indexOf(e.toString()) : !!d(t) && t.some(t => t === e))
    }

    function g(t, e) {
      try {
        return t.some(t => new RegExp(t).test(e))
      } catch (t) {
        throw new Error("Error while parsing url regex, to disable url for header bidding: " + t.message)
      }
      return !1
    }

    function p(t) {
      return !(!r(t) || a(t) || d(t))
    }

    function f(t, e) {
      return !!s(t) && -1 !== t.indexOf(e)
    }

    function b(t, e) {
      return t === e
    }

    function m(t, e) {
      return t > e
    }

    function v(t, e) {
      return t !== e
    }

    function w(t, e) {
      return t < e
    }
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "metrics", (function() {
      return u
    })), n.d(e, "app", (function() {
      return d
    })), n.d(e, "locator", (function() {
      return l
    })), n.d(e, "log", (function() {
      return h
    }));
    var r = n(0);
    var s = n(27),
      i = n(14);
    const o = new class {
        constructor() {
          this.enabledModules = new Map
        }
        register(t, e) {
          this.enabledModules.set(t, e)
        }
        resolve(t) {
          return this.enabledModules.get(t) || null
        }
      },
      c = {
        addEvent: (t, e, n = !1) => {
          const r = o.resolve(t);
          null !== r && r.handleEvent(e, n)
        }
      };
    class a extends s.a {
      constructor(t) {
        super(), this.appVersion = t
      }
      get version() {
        return this.appVersion
      }
      get envProperties() {
        return this.envProps
      }
      overrideEnvProperties(t) {
        Object(i.a)(this.envProperties, t)
      }
      isServiceEnabled(t) {
        return !!a.locator.resolve(t)
      }
      env(t) {
        this.envProps = t
      }
      start() {
        window.aax && window.aax.isLoaded || (window.aax.isLoaded = !0, u.mark("appStart"), d.emit("start"))
      }
    }
    a.locator = o, a.log = c;
    const u = new class {
        constructor() {
          this.savedMarks = new Map, this.savedMeasurements = new Map, this.started = Date.now(), this.clientTimezone = (new Date).getTimezoneOffset()
        }
        get origin() {
          return this.started
        }
        get timezone() {
          return this.clientTimezone
        }
        get now() {
          return Date.now() - this.started
        }
        get marks() {
          const t = [];
          return this.savedMarks.forEach((e, n) => {
            t.push({
              cost: e,
              name: n
            })
          }), t
        }
        mark(t) {
          this.savedMarks.set(t, this.now)
        }
        markStart(t) {
          this.mark("start" + t)
        }
        markEnd(t) {
          this.mark("end" + t)
        }
        getMark(t) {
          return this.savedMarks.get(t)
        }
        clearMarks(t) {
          t ? this.savedMarks.delete(t) : this.savedMarks.clear()
        }
        get measurements() {
          const t = [];
          return this.savedMeasurements.forEach((e, n) => {
            t.push({
              cost: e,
              name: n
            })
          }), t
        }
        measure(t, e, n) {
          Object(r.o)(e) || (e = "start" + t), Object(r.o)(n) || (n = "end" + t);
          const s = this.getMark(e),
            i = this.getMark(n);
          let o;
          return o = s && i ? i - s : -1, this.savedMeasurements.set(t, o), o
        }
        getMeasurement(t) {
          return this.savedMeasurements.get(t)
        }
        clearMeasurements(t) {
          t ? this.savedMeasurements.delete(t) : this.savedMeasurements.clear()
        }
      },
      d = new a("0.1.0"),
      l = a.locator,
      h = a.log;
    window.aax = window.aax || {}, window.aax.app = d
  }, function(t, e, n) {
    "use strict";
    n.d(e, "D", (function() {
      return c
    })), n.d(e, "b", (function() {
      return a
    })), n.d(e, "x", (function() {
      return u
    })), n.d(e, "w", (function() {
      return d
    })), n.d(e, "t", (function() {
      return l
    })), n.d(e, "a", (function() {
      return h
    })), n.d(e, "F", (function() {
      return g
    })), n.d(e, "s", (function() {
      return f
    })), n.d(e, "h", (function() {
      return b
    })), n.d(e, "y", (function() {
      return v
    })), n.d(e, "j", (function() {
      return w
    })), n.d(e, "e", (function() {
      return O
    })), n.d(e, "d", (function() {
      return y
    })), n.d(e, "c", (function() {
      return E
    })), n.d(e, "n", (function() {
      return j
    })), n.d(e, "E", (function() {
      return S
    })), n.d(e, "f", (function() {
      return I
    })), n.d(e, "v", (function() {
      return C
    })), n.d(e, "z", (function() {
      return A
    })), n.d(e, "o", (function() {
      return P
    })), n.d(e, "k", (function() {
      return R
    })), n.d(e, "i", (function() {
      return T
    })), n.d(e, "p", (function() {
      return x
    })), n.d(e, "u", (function() {
      return D
    })), n.d(e, "m", (function() {
      return _
    })), n.d(e, "q", (function() {
      return M
    })), n.d(e, "A", (function() {
      return k
    })), n.d(e, "B", (function() {
      return L
    })), n.d(e, "r", (function() {
      return N
    })), n.d(e, "g", (function() {
      return B
    })), n.d(e, "C", (function() {
      return F
    })), n.d(e, "l", (function() {
      return q
    }));
    var r = n(0),
      s = n(5),
      i = n(14),
      o = n(7);
    const c = navigator.userAgent;

    function a(t, e, n) {
      Object(r.o)(t) && t.addEventListener ? t.addEventListener(e, n, !1) : Object(r.o)(t) && t.attachEvent && t.attachEvent("on" + e, n), t = null
    }

    function u(t, e, n) {
      Object(r.o)(t) && t.removeEventListener ? t.removeEventListener(e, n, !1) : Object(r.o)(t) && t.detachEvent && t.detachEvent("on" + e, n), t = null
    }
    const d = t => {
      try {
        const e = t.charAt(0),
          n = t.substr(1).split(":"),
          s = n[0],
          i = Object(r.q)(n[1]) && parseInt(n[1], 10);
        let o;
        switch (e) {
          case "@":
            o = document.getElementsByTagName(s);
            break;
          case "#":
            o = document.getElementById(s);
            break;
          case "$":
            o = document.getElementsByName(s);
            break;
          default:
            o = document.getElementById(t)
        }
        return !o || "boolean" == typeof i || o instanceof HTMLElement ? o : o.item(i)
      } catch (t) {
        return null
      }
    };

    function l() {
      try {
        return "object" == typeof window && "object" == typeof window.top && window === window.top
      } catch (t) {
        return !1
      }
    }
    class h {
      constructor(t) {
        this.frame = t ? t.document.createElement("iframe") : document.createElement("iframe")
      }
      set(t, e) {
        return this.frame.setAttribute(t, e), this
      }
      overrideStyle(t) {
        return this.frame.style.cssText = t, this
      }
      done() {
        return this.frame
      }
    }
    const g = (t, e) => {
        if (!t) return;
        const [n, r] = p(t);
        try {
          if (r) throw r;
          !n || "string" == typeof n || "boolean" == typeof n || n instanceof Window || (n.open(), n.write(e), n.close())
        } catch (n) {
          const r = "javascript:var d=document.open();d.domain='" + document.domain + "';";
          t.src = r + "void(0);";
          try {
            const n = t.contentWindow.document;
            n.write(e), n.close()
          } catch (n) {
            t.src = r + 'd.write("' + e.replace(/"/g, '\\"') + ");d.close();", Object(o.c)(n)
          }
        }
      },
      p = t => {
        try {
          const e = t.contentWindow;
          return [e && e.document || t.contentDocument, null]
        } catch (t) {
          return [!1, "Access Denied"]
        }
      },
      f = () => !!window.EventSource,
      b = t => {
        const e = d("#" + t),
          n = {};
        if (!Object(r.o)(e)) return n;
        const i = m().X,
          o = m().Y;
        let c = {};
        return Object(r.o)(e) && Object(r.h)(e.getBoundingClientRect) && (c = e.getBoundingClientRect()), n.top_r = Object(s.b)(c.top, 0), n.bottom_r = Object(s.b)(c.bottom, 0), n.left_r = Object(s.b)(c.left, 0), n.right_r = Object(s.b)(c.right, 0), n.top = Object(s.b)(c.top + o, 0), n.bottom = Object(s.b)(c.bottom + o, 0), n.left = Object(s.b)(c.left + i, 0), n.right = Object(s.b)(c.right + i, 0), n.offsetX = Object(s.b)(i, 0), n.offsetY = Object(s.b)(o, 0), n
      };

    function m() {
      return {
        X: window.pageXOffset || window.scrollX,
        Y: window.pageYOffset || window.scrollY
      }
    }
    const v = t => {
        if (t) {
          const e = t.parentNode;
          e && e.removeChild(t)
        }
      },
      w = (t, e) => {
        if (t && t.style[e]) return t.style[e];
        if (t && document.defaultView && document.defaultView.getComputedStyle) {
          e = (e = e.replace(/([A-Z])/g, "-$1")).toLowerCase();
          const n = document.defaultView.getComputedStyle(t, "");
          return n && n.getPropertyValue(e)
        }
        return null
      },
      O = (t, e) => {
        const n = t.cloneNode(e);
        return e || (n.innerHTML = ""), n
      },
      y = (t, e) => {
        t.firstChild && e ? t.insertBefore(e, t.firstChild) : e && t.appendChild(e)
      },
      E = (t, e) => {
        const n = t.parentElement;
        n && y(n, e)
      },
      j = () => {
        try {
          return /loaded|complete/.test(document.readyState)
        } catch (t) {
          return !1
        }
      },
      S = (t, e, n, r) => {
        try {
          const s = d(t),
            i = j();
          if (!s && !r && i) return;
          if (s || !r && i) return void n(s);
          setTimeout(S.bind(null, t, e, n, r), e)
        } catch (s) {
          setTimeout(S.bind(null, t, e, n, r), e)
        }
      },
      I = (t, e, n) => new h(window).set("marginWidth", 0).set("marginHeight", 0).set("scrolling", "no").set("frameBorder", 0).set("height", n || 0).set("width", e || 0).set("id", t).set("allowtransparency", "true").done(),
      C = t => {
        setTimeout(t, 0)
      },
      A = t => {
        Object(r.o)(t) && (t.style.cssText = (t.style.cssText || "") + ";display:block!important;")
      },
      P = t => {
        Object(r.o)(t) && (t.style.cssText = (t.style.cssText || "") + ";display:none!important;")
      },
      R = t => {
        const e = t.id,
          n = document.getElementById(e);
        return Object(r.o)(n) && (null !== (s = n) && "IFRAME" === s.tagName) ? n : t;
        var s
      };

    function T(t, e) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(t)[e]
      }
      return t.currentStyle ? t.currentStyle[e] : null
    }
    const x = () => {
        let t = !1;
        try {
          "object" == typeof window.top && "object" == typeof window && (t = window.top != window)
        } catch (e) {
          t = !0
        }
        return t
      },
      D = () => {
        const t = "supportStorageMnTest";
        try {
          if ("localStorage" in window && null !== window.localStorage) return window.localStorage.setItem(t, t), window.localStorage.removeItem(t), Object(i.c)()
        } catch (t) {
          return !1
        }
        return !1
      },
      _ = t => {
        try {
          return t.contentWindow || t.contentDocument
        } catch (t) {
          return null
        }
      };
    const M = t => {
        if (!Object(r.q)(t)) return;
        const e = document.createElement("script"),
          n = document.getElementsByTagName("script")[0];
        e.type = "text/javascript", e.appendChild(document.createTextNode(t)), Object(r.o)(n.parentNode) && n.parentNode.insertBefore(e, n)
      },
      k = (t, e, n) => {
        const s = Object(r.h)(n) ? n : Date.now;
        let i = s();
        return () => {
          const n = s();
          n - i >= t && (i = n, e.apply(null))
        }
      },
      L = (t, e) => {
        let n = !0;
        return (...r) => {
          n && (n = !1, e.apply(null, r), setTimeout(() => n = !0, t))
        }
      };

    function N(t) {
      return Object(r.o)(t) && t instanceof Element
    }

    function B(t, e, n) {
      return Object(r.o)(t) && clearInterval(t), window.setTimeout(n, e)
    }
    const F = function() {
      const t = window.top;
      let e = window;
      try {
        let n = 0;
        for (; e !== t && n < 20;) {
          e.parent.innerWidth;
          e = e.parent, n++
        }
      } catch (t) {}
      return e
    }();

    function q(t) {
      let e, n = window;
      for (; n;) {
        try {
          if (n.frames[t]) {
            e = n;
            break
          }
        } catch (t) {}
        if (n === window.top) break;
        n = n.parent
      }
      return e
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "d", (function() {
      return c
    })), n.d(e, "c", (function() {
      return a
    })), n.d(e, "a", (function() {
      return u
    })), n.d(e, "b", (function() {
      return d
    }));
    var r = n(0),
      s = n(98),
      i = n(53),
      o = n(5);

    function c(t, e, n) {
      return Object(r.c)(e, e => {
        const r = new t(e);
        n.add(r)
      }), n
    }

    function a(t, e, n) {
      return e.forEach(e => {
        const r = new t(e);
        n.push(r)
      }), n
    }
    class u {
      constructor(t) {
        this.properties = t
      }
      get(t) {
        return this.properties[t]
      }
    }

    function d() {
      return Object(s.a)("" + Object(i.b)(Object(i.a)()), 10) + "" + Object(o.c)(1e6, 9999999) + Date.now().toString()
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "e", (function() {
      return u
    })), n.d(e, "f", (function() {
      return d
    })), n.d(e, "a", (function() {
      return l
    })), n.d(e, "b", (function() {
      return h
    })), n.d(e, "d", (function() {
      return g
    })), n.d(e, "g", (function() {
      return p
    })), n.d(e, "c", (function() {
      return f
    }));
    var r = n(22),
      s = n(3),
      i = n(12);
    class o extends i.a {
      constructor(t) {
        super(t)
      }
      get isNative() {
        return 1 === this.get("nat")
      }
      get needsUserSyncAfterRequest() {
        return !0 === this.get("usaf")
      }
      get bidderGroup() {
        return this.get("bg")
      }
      get isPmpEnabled() {
        return !1 === this.get("mnet") || !0 === this.get("pmp")
      }
      get isDefault() {
        return 1 === this.get("def")
      }
    }
    var c = n(77);
    class a extends i.a {
      constructor(t) {
        super(t)
      }
      get id() {
        return this.get("bgid")
      }
      get alias() {
        return this.get("bgals")
      }
    }
    const u = new r.a,
      d = Object(s.d)(o, {
        "-1": {
          "adn": "",
          "adapter": "",
          "cs": true,
          "eid": "38",
          "mnet": false,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "",
          "id": "-1",
          "pnm": "",
          "alias": "",
          "adc": false,
          "bidttl": 0,
          "sch": false,
          "usaf": false
        },
        "10000": {
          "adn": "unknown",
          "adapter": "ybncaadapter",
          "cs": false,
          "eid": "31",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "10000",
          "pnm": "YBNCA-AUTO",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "101": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "27",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "101",
          "pnm": "TEST_BIDDER",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "102": {
          "adn": "unknown",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3042",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "102",
          "pnm": "AYL_NATIVE",
          "alias": "",
          "adc": true,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "108": {
          "adn": "unknown",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3009",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "108",
          "pnm": "CRITEO_NATIVE",
          "alias": "crt",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "109": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "43",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "109",
          "pnm": "BIDSWITCH",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "117": {
          "adn": "unknown",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3043",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "117",
          "pnm": "BIDSWITCH_NATIVE",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "122": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "45",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "122",
          "pnm": "Sharethrough-Native_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "128": {
          "adn": "",
          "adapter": "",
          "cs": true,
          "eid": "38",
          "mnet": false,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "",
          "id": "128",
          "pnm": "",
          "alias": "",
          "adc": false,
          "bidttl": 0,
          "sch": false,
          "usaf": false
        },
        "145": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "50",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "145",
          "pnm": "DMX*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "157": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "55",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "157",
          "pnm": "Sociomantic*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "159": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "43",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "159",
          "pnm": "Bidswitch - E1*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "161": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "54",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "161",
          "pnm": "Adpushup*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "167": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "57",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "167",
          "pnm": "NativeAds*-Display_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "170": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "60",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "170",
          "pnm": "Adiant*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "172": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "4",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "172",
          "pnm": "EMX_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "173": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "62",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "173",
          "pnm": "SmartyAds*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "174": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "63",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "174",
          "pnm": "Gotham Ads*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "175": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "64",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "175",
          "pnm": "Media Force*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "178": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "65",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "178",
          "pnm": "Zeta*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "201": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "78",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "201",
          "pnm": "Amobee*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "203": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "43",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "203",
          "pnm": "Bidswitch Tier 3*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "206": {
          "adn": "null",
          "adapter": "apuRtbAdapter",
          "cs": true,
          "eid": "54",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "206",
          "pnm": "APU-Rtb(c)*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "208": {
          "adn": "null",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "80",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "208",
          "pnm": "RevContent*_Native_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "209": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "21",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "209",
          "pnm": "Pubmatic AAX*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "211": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "82",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "211",
          "pnm": "Synacor AAX_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "212": {
          "adn": "null",
          "adapter": "apuRtbAdapterv2",
          "cs": true,
          "eid": "54",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "212",
          "pnm": "APU-Rtb-P2(c)*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "214": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "84",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "214",
          "pnm": "RTB House*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "222": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "87",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "222",
          "pnm": "Deep Intent*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "225": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "88",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "225",
          "pnm": "Bidtellect_Display_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "23": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "4",
          "mnet": false,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "23",
          "pnm": "APPNEXUS_PRIVATE",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "241": {
          "adn": "null",
          "adapter": "prebidadapters",
          "cs": true,
          "eid": "15",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "241",
          "pnm": "Index AAX_FP_D",
          "alias": "",
          "adc": true,
          "bidttl": 180000,
          "sch": true,
          "usaf": false
        },
        "245": {
          "adn": "",
          "adapter": "",
          "cs": true,
          "eid": "38",
          "mnet": false,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "",
          "id": "245",
          "pnm": "",
          "alias": "",
          "adc": false,
          "bidttl": 0,
          "sch": false,
          "usaf": false
        },
        "249": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "99",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "249",
          "pnm": "152Media_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "250": {
          "adn": "null",
          "adapter": "roibidderadapter",
          "cs": true,
          "eid": "101",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 1,
          "pm": "${AUCTION_PRICE}",
          "id": "250",
          "pnm": "ROI Media_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "26": {
          "adn": "unknown",
          "adapter": "adxfailoverbidderadapter",
          "cs": true,
          "eid": "31",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 1,
          "pm": "${AUCTION_PRICE}",
          "id": "26",
          "pnm": "YBNCA-ADX-FAILOVER",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "265": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "20",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "265",
          "pnm": "Openx AAX*_FP_D",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "3004": {
          "adn": "null",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3048",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "3004",
          "pnm": "NativeAds*_FP_N",
          "alias": "",
          "adc": true,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "3007": {
          "adn": "null",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3051",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "3007",
          "pnm": "Media Force Native*_FP_N",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "3010": {
          "adn": "null",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3054",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "3010",
          "pnm": "Zeta* Native_FP_N",
          "alias": "",
          "adc": true,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "3012": {
          "adn": "null",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3009",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "3012",
          "pnm": "Criteo*_Textads_FP_N",
          "alias": "crt",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "3014": {
          "adn": "null",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3056",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "3014",
          "pnm": "Bidtellect_Native E1_FP_N",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "3015": {
          "adn": "null",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3052",
          "mnet": true,
          "tb": false,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "3015",
          "pnm": "MAX - Lazy Native_FP_N",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "33": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "4",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "33",
          "pnm": "CPXI",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "38": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "25",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "38",
          "pnm": "SONOBI",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "4": {
          "adn": "unknown",
          "adapter": "ybncaadapter",
          "cs": false,
          "eid": "31",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "4",
          "pnm": "YBNCA-AUTO",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "41": {
          "adn": "unknown",
          "adapter": "nativeadapter",
          "cs": false,
          "eid": "3005",
          "mnet": true,
          "tb": true,
          "nat": 1,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "41",
          "pnm": "BIDTELLECT",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "51": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "4",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "51",
          "pnm": "DISTRICTM_DIRECT",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "55": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "20",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "55",
          "pnm": "OPENXS2S_MNET",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "76": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "26",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "76",
          "pnm": "SOVRN",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "79": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "21",
          "mnet": false,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "79",
          "pnm": "PUBMATIC_S2S",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "80": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "36",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "80",
          "pnm": "DATAXU",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "89": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": true,
          "eid": "100",
          "mnet": false,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "None",
          "id": "89",
          "pnm": "",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "9": {
          "adn": "unknown",
          "adapter": "ybncaadapter",
          "cs": false,
          "eid": "31",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "9",
          "pnm": "YBNCA",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "90": {
          "adn": "null",
          "adapter": "hbclientadapter",
          "cs": true,
          "eid": "38",
          "mnet": false,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "None",
          "id": "90",
          "pnm": "",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "97": {
          "adn": "unknown",
          "adapter": "hbclientadapter",
          "cs": false,
          "eid": "9",
          "mnet": true,
          "tb": false,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "97",
          "pnm": "CRITEO",
          "alias": "crt",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        },
        "99": {
          "adn": "unknown",
          "adapter": "testprovideradapter",
          "cs": true,
          "eid": "27",
          "mnet": true,
          "tb": true,
          "nat": 0,
          "def": 0,
          "pm": "${AUCTION_PRICE}",
          "id": "99",
          "pnm": "TEST_BIDDER",
          "alias": "",
          "adc": false,
          "bidttl": 180000,
          "sch": false,
          "usaf": false
        }
      }, new r.a),
      l = Object(s.d)(c.a, {
        "-1": {
          "id": "-1",
          "csh": 0,
          "dsh": 0,
          "psh": 0
        },
        "101": {
          "id": "101",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "102": {
          "id": "102",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "108": {
          "id": "108",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "109": {
          "id": "109",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "117": {
          "id": "117",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "128": {
          "id": "128",
          "csh": 0,
          "dsh": 0,
          "psh": 0
        },
        "145": {
          "id": "145",
          "csh": 70,
          "dsh": 0,
          "psh": 5
        },
        "157": {
          "id": "157",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "159": {
          "id": "159",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "167": {
          "id": "167",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "170": {
          "id": "170",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "172": {
          "id": "172",
          "csh": 70,
          "dsh": 5,
          "psh": 0
        },
        "173": {
          "id": "173",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "174": {
          "id": "174",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "175": {
          "id": "175",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "178": {
          "id": "178",
          "csh": 40,
          "dsh": 0,
          "psh": 0
        },
        "201": {
          "id": "201",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "203": {
          "id": "203",
          "csh": 70,
          "dsh": 0,
          "psh": 0,
          "ssh": {
            "44": 7,
            "151": 4,
            "16": 9,
            "165": 9,
            "200": 4
          }
        },
        "206": {
          "id": "206",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "208": {
          "id": "208",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "209": {
          "id": "209",
          "csh": 70,
          "dsh": 5,
          "psh": 0
        },
        "214": {
          "id": "214",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "222": {
          "id": "222",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "23": {
          "id": "23",
          "csh": 85,
          "dsh": 0,
          "psh": 0
        },
        "241": {
          "id": "241",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "245": {
          "id": "245",
          "csh": 0,
          "dsh": 0,
          "psh": 0
        },
        "249": {
          "id": "249",
          "csh": 70,
          "dsh": 0,
          "psh": 10
        },
        "26": {
          "id": "26",
          "csh": 100,
          "dsh": 0,
          "psh": 0,
          "ex": true
        },
        "265": {
          "id": "265",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "3004": {
          "id": "3004",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "3007": {
          "id": "3007",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "3010": {
          "id": "3010",
          "csh": 40,
          "dsh": 0,
          "psh": 0
        },
        "3012": {
          "id": "3012",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "3015": {
          "id": "3015",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "33": {
          "id": "33",
          "csh": 70,
          "dsh": 0,
          "psh": 10
        },
        "38": {
          "id": "38",
          "csh": 70,
          "dsh": 0,
          "psh": 15
        },
        "41": {
          "id": "41",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "51": {
          "id": "51",
          "csh": 70,
          "dsh": 0,
          "psh": 10
        },
        "76": {
          "id": "76",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "79": {
          "id": "79",
          "csh": 85,
          "dsh": 0,
          "psh": 0
        },
        "80": {
          "id": "80",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "89": {
          "id": "89",
          "csh": 100,
          "dsh": 0,
          "psh": 0
        },
        "90": {
          "id": "90",
          "csh": 100,
          "dsh": 0,
          "psh": 0
        },
        "97": {
          "id": "97",
          "csh": 70,
          "dsh": 0,
          "psh": 0
        },
        "99": {
          "id": "99",
          "csh": 100,
          "dsh": 0,
          "psh": 0,
          "ex": true
        }
      }, new r.a),
      h = new s.a({
        "aucAll": true,
        "bBidTgt": false,
        "ch": false,
        "disTimoutAp": true,
        "enGdpr": true,
        "hta": true,
        "resetApi": false
      }),
      g = new s.a({
        "cid": "AAX763KC6",
        "iType": "AAX",
        "partner": "8PR6YK195",
        "ptid": "20",
        "scav": "",
        "sver": "",
        "servname": "rtb-nv-dcos-ssp-10-6-36-9-24100",
        "ypartner": "8PR2A8D53",
        "controlDfp": true
      }),
      p = new s.a({
        "ard": 0,
        "ngfd": 1200,
        "gfd": 1200,
        "grd": 800,
        "gptrd": 100,
        "prfd": 0,
        "dat": 1000
      }),
      f = new s.a({
        "mode": "disabled"
      });
    Object(s.d)(a, {
      "7001": {
        "id": "7001",
        "bgid": "7001",
        "bgals": "mn"
      },
      "7002": {
        "id": "7002",
        "bgid": "7002",
        "bgals": "apx"
      },
      "7003": {
        "id": "7003",
        "bgid": "7003",
        "bgals": "rbn"
      },
      "7004": {
        "id": "7004",
        "bgid": "7004",
        "bgals": "fb"
      },
      "7005": {
        "id": "7005",
        "bgid": "7005",
        "bgals": "opx"
      },
      "7006": {
        "id": "7006",
        "bgid": "7006",
        "bgals": "dstm"
      },
      "7007": {
        "id": "7007",
        "bgid": "7007",
        "bgals": "brlt"
      },
      "7008": {
        "id": "7008",
        "bgid": "7008",
        "bgals": "conv"
      },
      "7009": {
        "id": "7009",
        "bgid": "7009",
        "bgals": "trx"
      },
      "7010": {
        "id": "7010",
        "bgid": "7010",
        "bgals": "pbm"
      },
      "7011": {
        "id": "7011",
        "bgid": "7011",
        "bgals": "tlf"
      },
      "7012": {
        "id": "7012",
        "bgid": "7012",
        "bgals": "emx"
      },
      "7013": {
        "id": "7013",
        "bgid": "7013",
        "bgals": "rhy"
      },
      "7014": {
        "id": "7014",
        "bgid": "7014",
        "bgals": "sov"
      },
      "7015": {
        "id": "7015",
        "bgid": "7015",
        "bgals": "ppt"
      },
      "7016": {
        "id": "7016",
        "bgid": "7016",
        "bgals": "apnat"
      }
    }, new r.a)
  }, function(t, e, n) {
    "use strict";

    function r(t, e) {
      let n = Math.floor(Math.random() * (e - t + 1) + t);
      return n > e && (n = e), n
    }

    function s(t, e) {
      return !isFinite(t) || isNaN(t) ? e : t
    }

    function i(t) {
      const e = t.toString(),
        n = e.indexOf(".");
      return -1 !== n ? parseFloat(e.substr(0, Math.min(n + 3, e.length))).toFixed(2) : parseFloat(e).toFixed(2)
    }
    n.d(e, "c", (function() {
      return r
    })), n.d(e, "b", (function() {
      return s
    })), n.d(e, "a", (function() {
      return i
    }))
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return r
    }));
    class r {
      constructor(t) {
        this.decoratorItem = t
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "c", (function() {
      return g
    })), n.d(e, "a", (function() {
      return p
    })), n.d(e, "b", (function() {
      return f
    }));
    var r = n(0),
      s = n(14),
      i = n(8),
      o = n(2);
    const c = [],
      a = encodeURIComponent(navigator.userAgent),
      u = Object(i.d)() > 0 ? 1200 : 7e3;

    function d(t) {
      return {
        errorVal: {
          message: t.message,
          name: t.name,
          servername: "rtb-nv-dcos-ssp-10-6-36-9-24100",
          stack: t.stack,
          svr: "011310_169_011310_125_ssp",
          type: "AAX"
        }
      }
    }

    function l(t, e) {
      return t.length + e.length <= u || !e.length
    }

    function h(t) {
      if (Object(s.c)()) return JSON.stringify(t)
    }

    function g(t) {
      c.push(t)
    }

    function p(t, e = [], n, s) {
      try {
        if (Object(r.h)(t)) return t.apply(n, e)
      } catch (t) {
        s && (t.name = s.name + " (" + t.name + ")", t.message = s.message + " (" + t.message + ")"), g(t)
      }
    }

    function f(t, e) {
      return (...n) => p(t, n, e)
    }
    Object(o.b)(window, "load", (function t() {
      ! function() {
        const t = new Image;
        let e, n = c.length,
          s = "";
        for (; n--;) {
          if (e = h(d(c[n])) || "", !l(e, s)) break;
          Object(r.q)(s) && (s += ","), s += e, c.pop()
        }
        Object(r.q)(s) && (s = encodeURIComponent("[" + s + "]"), t.src = "https://l3.aaxads.com/nerrping.php?d=" + s + "&userAgent=" + a + "&requrl=" + encodeURIComponent(window.location.href))
      }(), setTimeout(t, 2500)
    })), window.aax = window.aax || {}, window.aax.getSafeFunction = f
  }, function(t, e, n) {
    "use strict";
    n.d(e, "b", (function() {
      return a
    })), n.d(e, "a", (function() {
      return u
    })), n.d(e, "e", (function() {
      return d
    })), n.d(e, "i", (function() {
      return l
    })), n.d(e, "k", (function() {
      return h
    })), n.d(e, "c", (function() {
      return g
    })), n.d(e, "h", (function() {
      return p
    })), n.d(e, "d", (function() {
      return f
    })), n.d(e, "f", (function() {
      return b
    })), n.d(e, "g", (function() {
      return m
    })), n.d(e, "m", (function() {
      return v
    })), n.d(e, "n", (function() {
      return w
    })), n.d(e, "j", (function() {
      return O
    })), n.d(e, "l", (function() {
      return y
    }));
    var r = n(9),
      s = n(0),
      i = n(2),
      o = n(53),
      c = n(5);

    function a() {
      return h(window).width
    }

    function u() {
      return h(window).height
    }

    function d() {
      try {
        return window.innerHeight
      } catch (t) {
        return 0
      }
    }

    function l() {
      try {
        return window.screen.width + "x" + window.screen.height
      } catch (t) {
        return ""
      }
    }
    const h = t => {
      const e = t && t.document,
        n = e && e.documentElement,
        r = e && e.body;
      return {
        height: t.innerHeight || n && n.clientHeight || r && r.clientHeight,
        width: t.innerWidth || n && n.clientWidth || r && r.clientWidth
      }
    };

    function g(t) {
      t = Object(r.c)(t);
      const e = new RegExp("^http(?:s)?://([^/]+)", "im"),
        n = t.match(e);
      return n ? n[1].toString() : ""
    }

    function p(t) {
      return 0 === t.indexOf("https:") ? "https" : "http"
    }

    function f() {
      let t;
      return (Object(s.d)(navigator.userAgent, "Trident") || Object(s.d)(navigator.userAgent, "MSIE")) && (t = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(navigator.userAgent), Object(s.o)(t) && Object(s.o)(t[1])) ? parseFloat(t[1]) : -1
    }

    function b() {
      return ("https:" === document.location.protocol ? "https" : "http") + "://" + window.location.hostname
    }

    function m() {
      return document.referrer
    }

    function v() {
      return /msie|rv:11\.0/.test(i.D.toLowerCase())
    }

    function w() {
      return Object(s.o)(i.D) && /ip(hone|od|ad)|android|blackberry|kindle|symbian|wap|windows (ce|phone)|palm( os)|iemobile|nokia|mobile/i.test(i.D) && !Object(i.u)()
    }

    function O(t) {
      Object(s.o)(t) || (t = Object(o.a)());
      return ("000000" + Date.now() + ("000" + Object(o.b)(t)).slice(-11) + Object(c.c)(1e3, 9999)).slice(-32)
    }

    function y() {
      const t = navigator.userAgent;
      if (Object(s.d)(t, "Gecko") && !Object(s.d)(t, "Trident") && !Object(s.d)(t, "MSIE")) return !0;
      if (Object(s.d)(t, "webkit")) return !0;
      if (Object(s.d)(t, "Trident") || Object(s.d)(t, "MSIE")) {
        if (f() >= 11) return !0
      }
      return !1
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    })), n.d(e, "e", (function() {
      return i
    })), n.d(e, "d", (function() {
      return o
    })), n.d(e, "c", (function() {
      return c
    })), n.d(e, "f", (function() {
      return a
    })), n.d(e, "g", (function() {
      return u
    })), n.d(e, "b", (function() {
      return l
    })), n.d(e, "h", (function() {
      return h
    }));
    var r = n(0);

    function s(t, e = !1) {
      let n = "";
      return t.forEach((t, s) => {
        Object(r.o)(t) && "" !== t && "{}" !== t && (n += i(s, t, e))
      }), n
    }

    function i(t, e, n) {
      return t ? (n && "string" == typeof e && (e = o(e)), "&" + t + "=" + e) : ""
    }

    function o(t) {
      return t ? encodeURIComponent(t) : ""
    }

    function c(t) {
      if (!t) return "";
      try {
        return decodeURIComponent(t)
      } catch (e) {
        return t
      }
    }

    function a(t, e) {
      if (!Object(r.o)(t) && Object(r.o)(e)) return null;
      const n = new RegExp("[?&]" + e + "=([^&#]*)", "i").exec(t);
      return n ? n[1] : null
    }

    function u(t, e) {
      if (!Object(r.o)(t) && !Object(r.o)(e)) return !1;
      return !!new RegExp("[?&]" + e + "([^&#]*)", "i").exec(t)
    }

    function d(t) {
      const e = t.split("&"),
        n = [];
      return e.forEach(t => {
        -1 !== t.indexOf("=") && "" !== t && "action_object_map=" !== t.substring(0, 18) && "action_type_map=" !== t.substring(0, 16) && "action_ref_map=" !== t.substring(0, 15) && "action_action_map=" !== t.substring(0, 18) && "fb_" !== t.substring(0, 3) && "fbclid" !== t.substring(0, 6) && "lcid=" !== t.substring(0, 5) && "force_hbtest=" !== t.substring(0, 13) && "mnet_test=" !== t.substring(0, 10) && "force_hbprv=" !== t.substring(0, 12) && "a=" !== t.substring(0, 2) && "kwp_0" !== t.substring(0, 6) && "utm_" !== t.substring(0, 4) && "code=" !== t.substring(0, 5) && "bcmt" !== t.substring(0, 4) && n.push(t)
      }), 0 === n.length ? "" : n.join("&")
    }

    function l(t) {
      if (!Object(r.q)(t)) return "";
      let e = t.split("?")[0].split("#")[0];
      if (!Object(r.q)(e)) return "";
      e = e.replace(/\/$/, "");
      const n = t.indexOf("#");
      let s = "";
      n > 0 && (s = t.substring(n + 1));
      const i = t.indexOf("?"),
        o = n > 0 ? n : t.length;
      let c = "";
      i > 0 && (c = t.substring(i + 1, o));
      const a = d(c);
      Object(r.q)(a) && (e = e + "?" + a);
      const u = d(s);
      return Object(r.q)(u) && (e = e + "#" + u), e
    }

    function h(t) {
      return (t = t || "").replace(/\/$/, "")
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return a
    }));
    var r = n(68),
      s = n(29),
      i = n(0),
      o = n(26);
    class c extends r.a {
      constructor(t) {
        super(t), this.consentSetEventsTimerStarted = !1, this.purposeStringForLogging = "", this.isTcfV2Enabled = !1, this.isTcfV2Enabled = Object(i.h)(window.__tcfapi)
      }
      isApplicable() {
        if (Object(i.o)(this.tcfApiResponse)) {
          const t = this.tcfApiResponse.gdprApplies;
          if (Object(i.o)(t)) return t
        }
        return o.a.isApplicable()
      }
      setIABApiInfo(t) {
        if (this.tcfApiResponse = t, !Object(i.o)(this.tcfApiResponse)) return void this.triggerConsentSetEvents();
        const e = this.tcfApiResponse.tcString;
        this.setConsent(e), this.triggerConsentSetEvents()
      }
      getIABApiInfo() {
        return this.tcfApiResponse
      }
      get cmpId() {
        return Object(i.o)(this.tcfApiResponse) ? this.tcfApiResponse.cmpId : ""
      }
      get cmpStatus() {
        return Object(i.o)(this.tcfApiResponse) ? this.tcfApiResponse.cmpStatus : ""
      }
      set purposeString(t) {
        this.purposeStringForLogging = t
      }
      get purposeString() {
        return this.purposeStringForLogging
      }
      setConsent(t) {
        this.consentString = t
      }
      get consent() {
        return this.isTcfV2Enabled ? this.consentString : o.a.consent
      }
      setBlanketConsent(t) {
        throw new Error("Method not implemented.")
      }
      setFinalConsent() {
        throw new Error("Method not implemented.")
      }
      triggerConsentSetEvents() {
        this.consentSetEventsTimerStarted || setTimeout(() => {
          this.emit("cschange"), this.consentSetEventsTimerStarted = !1
        }, 100), this.consentSetEventsTimerStarted = !0
      }
    }
    const a = new c(s.a.getConfigOf("tcf"))
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(7),
      s = n(0);

    function i(t) {
      for (const e in t)
        if (t.hasOwnProperty(e) && Object(s.h)(t[e])) {
          const n = t[e],
            s = Object(r.b)(n, t);
          t[e] = s
        } return t
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return r
    }));
    class r {
      constructor(t) {
        return this.ID_STRING = "id", this.properties = t, this
      }
      get id() {
        return this.get(this.ID_STRING)
      }
      get(t) {
        return this.properties[t]
      }
      match(t) {
        const e = Object.keys(t);
        if (0 === e.length) return !0;
        let n = !0;
        return e.forEach(e => {
          n = n && this.get(e) === t[e]
        }), n
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "c", (function() {
      return c
    })), n.d(e, "a", (function() {
      return a
    })), n.d(e, "b", (function() {
      return u
    }));
    var r = n(32),
      s = n(0),
      i = n(9),
      o = n(23);

    function c(t) {
      return !o.a.url.includes("aax_test") && (0 === t || Object(r.b)(t))
    }

    function a(t, e = !1) {
      let n = "";
      return t.forEach((t, r) => {
        if (Object(s.o)(t) || (t = ""), Object(s.e)(t)) return n += Object(i.e)(r + "<>", t.join("##"), e), n;
        n += Object(i.e)(r, t, e)
      }), n
    }

    function u(t, e) {
      if (0 === t.size()) return [];
      const n = [];
      let r = "";
      return t.logs.forEach(t => {
        if (null == t) return;
        const s = a(t, !0);
        (function(t, e, n) {
          return n + e > t
        })(e, s.length, r.length) && (r.length > 0 && n.push(r), r = ""), r += s
      }), n.push(r), n
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "c", (function() {
      return s
    })), n.d(e, "b", (function() {
      return i
    })), n.d(e, "a", (function() {
      return o
    })), n.d(e, "d", (function() {
      return c
    }));
    var r = n(0);

    function s() {
      return !!(window.JSON && window.JSON.parse && "function" == typeof JSON.parse && window.JSON.stringify && "function" == typeof JSON.stringify)
    }

    function i(t) {
      return t && s() ? JSON.parse(t) : new Function("return " + t)()
    }

    function o(t, e) {
      for (const n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
      return t
    }

    function c(t, e) {
      return Object(r.o)(t) && Object(r.m)(e) ? (Object(r.c)(e, (e, n) => {
        Object(r.n)(e) || Object(r.e)(e) || !(n in t) ? t[n] = e : t[n] = c(t[n], e)
      }), t) : e
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "f", (function() {
      return c
    })), n.d(e, "b", (function() {
      return a
    })), n.d(e, "g", (function() {
      return u
    })), n.d(e, "a", (function() {
      return d
    })), n.d(e, "c", (function() {
      return l
    })), n.d(e, "d", (function() {
      return h
    })), n.d(e, "e", (function() {
      return g
    }));
    var r = n(0),
      s = n(25),
      i = n(8);
    const o = {};

    function c(t) {
      if (!Object(r.h)(t.getContentUrl)) return !1;
      const e = t.getContentUrl();
      return Object(r.q)(e) && e.includes("gampad")
    }

    function a(t) {
      const e = [];
      if (!Object(r.h)(t.getSizes)) return [];
      const n = t.getSizes(Object(i.b)(), Object(i.a)());
      return Object(r.o)(n) && Object(r.e)(n) && 0 !== n.length ? (n.forEach(t => {
        Object(r.p)(t) || Object(r.h)(t.getWidth) && Object(r.h)(t.getHeight) && e.push(new s.a([t.getWidth(), t.getHeight()]))
      }), e) : []
    }

    function u(t) {
      return !!t && "string" != typeof t && Object(r.h)(t.getSlotElementId)
    }

    function d() {
      try {
        return window.googletag.pubads().getSlots()
      } catch (t) {
        return []
      }
    }

    function l(t) {
      if (!u(t)) return "";
      const e = t && t.getSlotElementId();
      return o[e] = t, e
    }

    function h(t) {
      return d().find(e => t === l(e))
    }

    function g(t) {
      const e = {};
      return t.getTargetingKeys().forEach(n => {
        e[n] = t.getTargeting(n)
      }), e
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return c
    }));
    var r = n(12),
      s = n(3),
      i = n(22);
    class o extends r.a {
      constructor(t) {
        super(t)
      }
      get meta() {
        return this.get("meta") || ""
      }
      get loggingPercentage() {
        return this.get("lper") || 1
      }
      get method() {
        return !0 === this.get("post") ? "POST" : "GET"
      }
    }
    const c = Object(s.d)(o, {
      "abd": {
        "id": "abd",
        "lper": 1,
        "meta": "___stu13p=aveoaamactga5dnnuee25ti2rm86bcrodqacb&lwbsh=AAX",
        "post": false
      },
      "ad": {
        "id": "ad",
        "lper": 1,
        "meta": "___stu13p=rw9mukut7rfp9c4oge731h386c3q3&lwbsh=AAX",
        "post": false
      },
      "adc": {
        "id": "adc",
        "lper": 1,
        "meta": "___stu13p=e4zfzmng4i7g13pbam2t4pz&lwbsh=AAX",
        "post": true
      },
      "adp": {
        "id": "adp",
        "lper": 1,
        "meta": "___stu13p=e4zfzmng4i7g1jj0yqcqc34&lwbsh=AAX",
        "post": false
      },
      "adx": {
        "id": "adx",
        "lper": 0,
        "meta": "___stu13p=136npfg3yypei0x0xbbpay2x3cvydaxw8&lwbsh=AAX",
        "post": false
      },
      "ap": {
        "id": "ap",
        "lper": 100,
        "meta": "___stu13p=1zkqfp4f7dt6l1ivxfqe28&lwbsh=AAX",
        "post": false
      },
      "ar": {
        "id": "ar",
        "lper": 1,
        "meta": "___stu13p=1j1i1g49bxe3odqe1gncoldjeorqjn0a6acb&lwbsh=AAX",
        "post": false
      },
      "aw": {
        "id": "aw",
        "lper": 1,
        "meta": "___stu13p=1zkqfp4f7dt6tkajzqm46j&lwbsh=AAX",
        "post": false
      },
      "awp": {
        "id": "awp",
        "lper": 1,
        "meta": "",
        "post": false
      },
      "axadc": {
        "id": "axadc",
        "lper": 1,
        "meta": "___stu13p=e4zfzmng4i7g13pbam2t4pz&lwbsh=AAX",
        "post": true
      },
      "el": {
        "id": "el",
        "lper": 0,
        "meta": "___stu13p=1j1i1g49bxe3odqe1gncqvgbtbu1qf26wycb&lwbsh=AAX",
        "post": false
      },
      "fd": {
        "id": "fd",
        "lper": 1,
        "meta": "___stu13p=1zkqfp4f7dudgmgjih2yl0&lwbsh=AAX",
        "post": false
      },
      "fl": {
        "id": "fl",
        "lper": 1,
        "meta": "___stu13p=7qncktuk8msn46iukwj9n0pj5dqcimbpi3&lwbsh=AAX",
        "post": false
      },
      "gpts": {
        "id": "gpts",
        "lper": 100,
        "meta": "___stu13p=25bccp7ihn5fs6949k6cjst5iltv5zda4r85fx7&lwbsh=AAX",
        "post": false
      },
      "na": {
        "id": "na",
        "lper": 100,
        "meta": "___stu13p=5idgihgb3r73nr56xnkzux7bu6yxwxo&lwbsh=AAX",
        "post": false
      },
      "pr": {
        "id": "pr",
        "lper": 100,
        "meta": "___stu13p=1zkqfp4f7dwsi1n711pgui&lwbsh=AAX",
        "post": false
      },
      "prf": {
        "id": "prf",
        "lper": 1,
        "meta": "___stu13p=5idgihgb3r73ntje5a5e3s12ofov93v&lwbsh=AAX",
        "post": false
      },
      "psi": {
        "id": "psi",
        "lper": 10,
        "meta": "___stu13p=1zkqfp4f7dt6l1ivxfqe28&lwbsh=AAX",
        "post": false
      },
      "re": {
        "id": "re",
        "lper": 1,
        "meta": "",
        "post": false
      },
      "wops": {
        "id": "wops",
        "lper": 100,
        "meta": "___stu13p=7qncktuk8msn46iukwjfdvjc0yohkl80l3&lwbsh=AAX",
        "post": false
      }
    }, new i.a)
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    const r = [],
      s = {
        register(t) {
          r.push(t)
        },
        isActionApplicable(t) {
          let e = !1;
          return r.forEach(n => {
            n.isActionApplicable(t) && (e = !0)
          }), e
        }
      }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return r
    }));
    class r {
      constructor(t, e = !0) {
        this.logName = t, this.commonParams = e, this.logsArray = []
      }
      get enableCommonParams() {
        return this.commonParams
      }
      add(t) {
        this.logsArray.push(t)
      }
      size() {
        return this.logsArray.length
      }
      get logs() {
        return this.logsArray
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return x
    }));
    const r = new(n(3).a)({
      "og": "https://l3.aaxads.com/log",
      "pog": "https://p.aaxads.com/log"
    });
    var s = n(1),
      i = n(0),
      o = n(13),
      c = n(79),
      a = n(8),
      u = n(26),
      d = n(20),
      l = n(10),
      h = n(17),
      g = n(4);
    var p = {
      compatibility: s.locator.resolve("compatibility"),
      ruleEngineConfig: s.locator.resolve("ruleEngineConfig")
    };
    class f {
      constructor() {
        this.configs = new Map
      }
      add(t, e) {
        return this.configs.set(t, e), this
      }
      get(t) {
        return this.configs.get(t)
      }
    }
    var b = new class {
      constructor() {
        this.isStorageAccessible() ? (this.sessionStorage = window.sessionStorage, this.length = window.sessionStorage.length) : (this.sessionStorage = null, this.length = 0)
      }
      isStorageAccessible() {
        const t = "ecsstest";
        try {
          if ("sessionStorage" in window && null !== window.sessionStorage) return window.sessionStorage.setItem(t, t), window.sessionStorage.removeItem(t), !0
        } catch (t) {
          return !1
        }
        return !1
      }
      setItem(t, e) {
        Object(i.o)(this.sessionStorage) && (this.sessionStorage.setItem(t, e), this.length = this.sessionStorage.length)
      }
      getItem(t) {
        return Object(i.o)(this.sessionStorage) ? this.sessionStorage.getItem(t) : null
      }
      removeItem(t) {
        Object(i.o)(this.sessionStorage) && (this.sessionStorage.removeItem(t), this.length = this.sessionStorage.length)
      }
      clear() {
        Object(i.o)(this.sessionStorage) && this.sessionStorage.clear()
      }
    };
    const m = s.locator.resolve("abtestconfig"),
      v = new class {
        constructor(t, e) {
          this.abTestBucketName = "";
          const n = this.overrideAbTest(t, e);
          this.configRepo = new f,
            function(t, e) {
              Object(i.c)(e, (n, r) => {
                e.hasOwnProperty(r) && Object(i.p)(r) && t.add(r, n)
              })
            }(this.configRepo, n)
        }
        overrideAbTest(t, e) {
          const n = s.locator.resolve("abtestservice");
          if (null != n && null != e) {
            const r = new n(e, b);
            return this.abTestBucketName = r.getBucketName(), r.test(t, this.abTestBucketName)
          }
          return t
        }
      }(p, m);
    v.configRepo;
    var w = n(23),
      O = n(69),
      y = n(58);
    class E {
      static getGoogleFunctionDelays() {
        const t = s.locator.resolve("clientconfigrule");
        if (!Object(i.o)(t) || !Object(i.o)(t.getRule())) return null;
        const e = t.getRule().actions;
        return Object(i.o)(e) && Object(i.o)(e.delays) ? e.delays : null
      }
      static getCustomGuaranteedDelay() {
        const t = E.getGoogleFunctionDelays();
        if (Object(i.o)(t)) return t.gfd
      }
      static getCustomNonGuaranteedDelay() {
        const t = E.getGoogleFunctionDelays();
        if (Object(i.o)(t)) return t.ngfd
      }
    }
    var j = n(70);
    let S, I;
    var C = {
      getEndParams: function() {
        return I = new Map, I.set("sf", Object(j.a)() || ""), I.set("uhtxuo", w.a.url), I.set("nzui", O.a.cleaned), I
      },
      getStartParams: function() {
        S = new Map;
        const t = s.app.envProperties,
          e = Object(a.a)() || 0,
          n = Object(a.b)() || 0,
          r = h.a.isActionApplicable("NON_PERSONALIZED_ADS") ? "1" : "0";
        var o;
        return S.set("dewh", function() {
            let t = "SSP_CLIENT";
            return Object(i.q)(v.abTestBucketName) && (t += "_" + v.abTestBucketName), t
          }()), S.set("dgeg", (() => {
            const t = s.locator.resolve("abpdetectionservice");
            return !!t && t.isAbpDetected("high")
          })() ? "1" : "0"), S.set("dgw", t.sugd), S.set("flg", t.cid), S.set("fw", t.ip2ct), S.set("ff", t.ip2c), S.set("xjg", t.cugd), S.set("dss", "0"), S.set("skw", Object(a.e)()), S.set("slg", t.pid), S.set("gq", t.dn.replace(/^www\./, "")), S.set("vhuyqdph", t.servname), S.set("vg", Object(c.a)()), S.set("vyu", t.sver), S.set("vf", t.ip2sc), S.set("yhuvlrq", t.version), S.set("yk", e), S.set("yz", n), S.set("yvlg", t.mNVsid), S.set("ylg", t.visitId), S.set("vvsDeExfnhw", t.sspAbTestBucket), S.set("qsd", r), S.set("oz", "1"), S.set("gdss", t.app), S.set("uwbsh", window.aax && Object(i.h)(window.aax.getRType) ? window.aax.getRType() : ""), o = S, l.a.isTcfV2Enabled || (o.set("jgsu_hqi", u.a.isEnforcementEnabled() ? "1" : "0"), o.set("fvha", u.a.consentExists ? "1" : "0"), o.set("jgivwu", u.a.finalConsent)), o.set("jgsu", l.a.isApplicable() ? "1" : "0"), o.set("fvvwu", l.a.consent), o.set("wfi_fps", l.a.cmpId), o.set("wfi_vwdwxv", l.a.cmpStatus), o.set("wfi_sus", l.a.purposeString), o.set("vxf", u.a.unknownConsentStance()),
          function(t) {
            const e = d.a.finalConsentIndex,
              n = d.a.blanketConsent;
            t.set("xvs_hqi", d.a.isEnforcementEnabled() ? "1" : "0"), t.set("xvs_vwdwxv", d.a.isApplicable() ? "1" : "0"), t.set("xvs_ogi", Object(i.o)(n) ? n : ""), t.set("xvs_vwulqj", d.a.consent), t.set("xifd", Object(i.o)(e) ? e : "-1")
          }(S),
          function(t) {
            const e = y.a.blanketConsent;
            t.set("frssd_vwdwxv", Object(i.o)(e) ? e : ""), t.set("frssd_dssolhg", y.a.finalConsent)
          }(S),
          function(t) {
            const e = E.getCustomNonGuaranteedDelay(),
              n = E.getCustomGuaranteedDelay();
            t.set("jixqgo", n || g.g.get("gfd") || ""), t.set("jwg", g.g.get("gptrd") || ""), t.set("lqlg", g.g.get("inid") || ""), t.set("qjixqgo", e || g.g.get("ngfd") || ""), t.set("ugo", g.g.get("grd") || "")
          }(S), S
      }
    };
    const A = Object(a.d)() > 0 ? 1600 : 7e3;
    class P {
      constructor(t, e) {
        this.method = "GET", this.host = r.get("og"), this.logTopic = "", this.eventId = t, this.logTopic = e
      }
      fire(t, e, n) {
        const r = {
          method: this.method,
          tags: [e],
          type: "image"
        };
        let c = "",
          a = "";
        t.enableCommonParams && (c = Object(o.a)(C.getStartParams(), !0), a = Object(o.a)(C.getEndParams(), !0));
        const u = Object(o.b)(t, A),
          d = s.locator.resolve("simplenetworkservice");
        if (!Object(i.o)(d)) throw new Error("Failed to fire logs as network service was not resolved");
        u.forEach(t => {
          const e = {
            payload: this.logTopic + c + t + a,
            url: this.host
          };
          d.submit([e], r)
        })
      }
    }
    var R = n(14);
    class T {
      constructor(t, e) {
        this.method = "POST", this.host = r.get("pog"), this.logTopic = "", this.defaultRequestOptions = {
          method: this.method,
          tags: [this.eventId],
          type: "xhr"
        }, this.eventId = t, this.logTopic = e
      }
      updateRequestOptions(t) {
        const e = Object(R.a)({}, this.defaultRequestOptions);
        return Object(i.o)(t) ? t = Object(R.a)(e, t) : e
      }
      fire(t, e, n) {
        const r = s.locator.resolve("simplenetworkservice");
        if (!Object(i.o)(r)) throw new Error("Failed to fire logs as network service was not resolved");
        const c = this.updateRequestOptions(n);
        let a = "",
          u = "";
        t.enableCommonParams && (a = Object(o.a)(C.getStartParams(), !0), u = Object(o.a)(C.getEndParams(), !0));
        Object(o.b)(t, 1e20).forEach(t => {
          const e = {
            payload: this.logTopic + a + t + u,
            url: this.host
          };
          r.submit([e], c)
        })
      }
    }
    class x {
      static getDispatcher(t, e, n) {
        switch (t) {
          case "GET":
            return new P(e, n);
          case "POST":
            return new T(e, n)
        }
        return new P(e, n)
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return a
    }));
    var r, s = n(68),
      i = n(29);
    ! function(t) {
      t.VERSION = "1", t.NOT_APPLICABLE = "-", t.YES = "Y", t.NO = "N"
    }(r || (r = {}));
    class o extends s.a {
      constructor(t) {
        super(t), this.isApplicable() && (this.finalConsentString = this.config.defaultConsentString)
      }
      isApplicable() {
        return !!this.isEnforcementEnabled() && !(!this.isPrivacyUser() && !this.blanketConsent)
      }
      static isValidConsent(t) {
        if (4 !== t.length || !t.startsWith(r.VERSION)) return !1;
        for (let e = 1; e < t.length; e++) {
          switch (t[e]) {
            case r.YES:
            case r.NO:
            case r.NOT_APPLICABLE:
              continue;
            default:
              return !1
          }
        }
        return !0
      }
      setBlanketConsent(t) {
        this.blanketConsentFlag = t, this.consentString = t ? "1YY-" : "1YN-", this.setFinalConsent()
      }
      setConsent(t) {
        o.isValidConsent(t) && (this.consentString = t, this.setFinalConsent())
      }
      setFinalConsent() {
        let t = this.consentString;
        this.config.honourPublisher || (t = this.config.defaultConsentString), this.finalConsentString = t, this.emit("cschange", this.finalConsent)
      }
    }
    const c = i.a.getConfigOf("ccpa"),
      a = new o(c)
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return r
    }));
    class r {
      constructor() {
        this.logParameters = new Map
      }
      set(t, e) {
        return this.logParameters.set(t, e), this
      }
      getAll() {
        return this.logParameters
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    class r extends Error {
      constructor(t) {
        super(t)
      }
    }
    class s {
      constructor() {
        this.configs = new Map
      }
      add(t) {
        return this.configs.set(t.id, t), this
      }
      remove(t) {
        return this.configs.delete(t.id), this
      }
      find(t) {
        const e = this.configs.get(t);
        if (void 0 === e) throw new r("Config Not Found " + t);
        return e
      }
      each(t) {
        this.configs.forEach(t)
      }
      getConfigOf(t) {
        return this.find(t)
      }
      where(t) {
        const e = [];
        return this.configs.forEach((n, r) => {
          n.match(t) && e.push(n)
        }), e
      }
      length() {
        return this.configs.size
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return d
    }));
    var r = n(0),
      s = n(2),
      i = n(8),
      o = (n(94), n(71));

    function c(t) {
      if (!Object(r.o)(t)) return "";
      const e = /^(fb_|utm_|bcmt|action_object_map|action_type_map|action_ref_map|action_action_map|code)/;
      return t.split("&").filter(t => t.length > 0 && ("#" === t || !e.test(t))).join("&")
    }
    const a = [o.b, o.c, function(t) {
      return t.replace(/;[^\?]*/, "")
    }, function(t) {
      const {
        url: e,
        hash: n,
        query: r
      } = Object(o.a)(t);
      if (0 === r.length && 0 === n.length) return t;
      const s = c(n),
        i = c(r);
      let a = "";
      return i.length > 0 && (a = "?" + i), s.length > 0 && (a = a + "#" + s), e + a
    }];
    class u {
      constructor() {
        this.baseUrl = "", this.urlScheme = "", this.cleanedUrl = "", this.urlHost = "", this.init()
      }
      static extractPageUrlFromMacro() {
        return Object(r.q)(window.aaxPublisherURL) ? window.aaxPublisherURL : Object(r.q)(window.aax.pageUrl) ? window.aax.pageUrl : void 0
      }
      static extractPageUrlFromDOM() {
        if (!Object(s.p)()) return window.location.href;
        try {
          const t = window.top.location.href;
          if (Object(r.q)(t)) return t
        } catch (t) {}
        return Object(r.q)(document.referrer) ? document.referrer : void 0
      }
      static getFinalPageUrl() {
        const t = u.extractPageUrlFromMacro();
        return Object(r.q)(t) ? t : u.extractPageUrlFromDOM()
      }
      init() {
        var t;
        this.baseUrl = u.getFinalPageUrl() || "", Object(r.h)(window.aax.getCustomPublisherUrl) && (this.baseUrl = window.aax.getCustomPublisherUrl(this.baseUrl) || ""), this.urlHost = Object(i.c)(this.baseUrl), this.urlScheme = Object(i.h)(this.baseUrl), this.cleanedUrl = (t = this.baseUrl, Object(r.o)(t) ? a.reduce((t, e) => e.call(null, t), t) : "")
      }
      resetUrl() {
        this.init()
      }
      get url() {
        return this.baseUrl
      }
      get scheme() {
        return this.urlScheme
      }
      get cleaned() {
        return this.cleanedUrl
      }
      get host() {
        return this.urlHost
      }
    }
    const d = new u
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(27);
    class s extends r.a {
      constructor() {
        return super(), this
      }
      timer(t, e) {
        this.emit(t), setTimeout(() => {
          this.timer(t, e)
        }, e)
      }
    }
    const i = new s
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    })), n.d(e, "b", (function() {
      return c
    }));
    var r = n(0);

    function s(t, e) {
      return t < e ? -1 : t > e ? 1 : 0
    }
    class i {
      constructor(t) {
        if (this.size = [], Object(r.e)(t)) this.size = t;
        else {
          const e = t.split(i.sizeSeparator),
            n = parseInt(e[i.widthIndex], 10),
            r = parseInt(e[i.heightIndex], 10);
          this.size = [n, r]
        }
      }
      get width() {
        return this.size[i.widthIndex]
      }
      get height() {
        return this.size[i.heightIndex]
      }
      toArray() {
        return this.size
      }
      toString() {
        return this.size.join(i.sizeSeparator)
      }
    }

    function o(t, e) {
      const n = s(t.width, e.width);
      return 0 === n ? n : s(t.height, e.height)
    }

    function c(t) {
      return (t = t.sort(o))[0]
    }
    i.widthIndex = 0, i.heightIndex = 1, i.sizeSeparator = "x"
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return j
    }));
    var r, s, i = n(68),
      o = n(0),
      c = n(29);
    ! function(t) {
      t[t.BitField = 0] = "BitField", t[t.Range = 1] = "Range"
    }(r || (r = {})),
    function(t) {
      t.NOT_APPLICABLE = "-", t.YES = "Y", t.NO = "N"
    }(s || (s = {}));
    var a = n(98);
    class u {
      constructor(t, e) {
        this.parsedConsentString = e, this.Success = t
      }
      get success() {
        return this.Success
      }
      isVendorAllowed(t) {
        if (!this.success) return 2;
        return this.parsedConsentString.get("allowedVendors").indexOf(t) > -1 ? 1 : 0
      }
      isPurposesAllowed(t, e) {
        return this.success && this.isVendorAllowed(t) ? e.filter(t => this.parsedConsentString.get("purposes").indexOf(t) > -1) : []
      }
    }
    const d = (new Map).set("purposes", 24).set("maxVendorId", 16).set("encodingType", 1).set("defaultConsent", 1).set("numEntries", 12).set("singleOrRange", 1).set("singleVendorId", 16).set("startVendorId", 16).set("endVendorId", 16),
      l = (new Map).set("versionBit", 6).set("createdBit", 36).set("lastUpdated", 36).set("consentManagerId", 12).set("cpmVersion", 12).set("consentScreen", 6).set("consentLanguage", 12).set("vendorListVersion", 12);
    let h = "";
    const g = new Map;

    function p(t) {
      const e = h.slice(0, t);
      return h = h.slice(t, h.length), e
    }

    function f(t) {
      const e = p(t);
      return parseInt(e, 2)
    }

    function b(t) {
      return d.get(t)
    }

    function m(t) {
      const e = f(b("startVendorId")),
        n = f(b("endVendorId"));
      for (let r = e; r <= n; r++) t[e] ^= 1
    }

    function v(t) {
      t[f(b("singleVendorId"))] ^= 1
    }

    function w() {
      const t = f(b("maxVendorId"));
      f(b("encodingType")) !== r.Range ? function(t) {
        const e = p(t),
          n = [];
        for (let r = 0; r < t; r++) {
          1 === parseInt(e.charAt(r), 10) && n.push(r + 1)
        }
        g.set("allowedVendors", n)
      }(t) : function(t) {
        const e = f(b("defaultConsent")),
          n = f(b("numEntries")),
          s = {};
        for (let n = 1; n <= t; n++) s[n] = e;
        for (let t = 1; t <= n; t++) {
          f(b("singleOrRange")) === r.Range ? m(s) : v(s)
        }
        const i = Object.keys(s);
        g.set("allowedVendors", i.filter(t => 1 === s[parseInt(t, 10)]).map(t => parseInt(t, 10)))
      }(t)
    }

    function O(t) {
      const e = function(t) {
        try {
          return atob(t.replace(/-/g, "+").replace(/_/g, "/"))
        } catch (t) {
          return ""
        }
      }(t);
      return Object(o.o)(e) ? function(t) {
        let e = "";
        for (let n = 0; n < t.length; n++) {
          const r = t.charCodeAt(n).toString(2);
          e += Object(a.a)(r, 8)
        }
        return e
      }(e) : ""
    }

    function y(t) {
      return h = O(t), Object(o.o)(h) ? (l.forEach((t, e) => {
        g.set(e, f(t))
      }), 1 !== g.get("versionBit") ? new u(!1, new Map) : (function() {
        const t = [],
          e = p(b("purposes"));
        for (let n = 0; n < e.length; n++) "1" === e.charAt(n) && t.push(n + 1);
        g.set("purposes", t)
      }(), w(), new u(!0, g))) : new u(!1, new Map)
    }
    class E extends i.a {
      constructor(t) {
        super(t), this.consentSetEventsTimerStarted = !1, this.isApplicable() && (this.finalConsentString = this.config.defaultConsentString || this.getConsentStringMap())
      }
      isApplicable() {
        return Object(o.o)(window.aax_isGDPR) ? !0 === window.aax_isGDPR : !!this.isEnforcementEnabled() && (!!this.isPrivacyUser() || (this.config.honourPublisher && this.publisherDetected || !1))
      }
      setPublisherDetected(t) {
        this.publisherDetected = t, this.setFinalConsent()
      }
      get consentExists() {
        return this.consentExistsFlag || !1
      }
      get consentForExternalServices() {
        return Object(o.o)(this.consentExistsFlag) ? this.consentExistsFlag ? 1 : 0 : this.unknownConsentStance()
      }
      unknownConsentStance() {
        return c.a.getConfigOf("gdpr").stanceUnknownConsent
      }
      setConsent(t) {
        this.consentString = t;
        const e = this.config.vendorId;
        if (!Object(o.o)(e)) return;
        const n = y(t).isVendorAllowed(e);
        1 !== n && 0 !== n || (this.consentExistsFlag = 1 === n), this.setFinalConsent()
      }
      setBlanketConsent(t) {
        this.blanketConsentFlag = t, this.consentExistsFlag = t, this.setFinalConsent()
      }
      setFinalConsent() {
        let t = this.getConsentStringMap();
        this.config.honourPublisher || (t = this.config.defaultConsentString), this.finalConsentString = t, this.triggerConsentSetEvents()
      }
      triggerConsentSetEvents() {
        this.consentSetEventsTimerStarted || setTimeout(() => {
          this.emit("cschange"), this.consentSetEventsTimerStarted = !1
        }, 100), this.consentSetEventsTimerStarted = !0
      }
      getConsentStringMap() {
        let t = "";
        if (t += this.isPrivacyUser() ? s.YES : s.NO, Object(o.o)(this.publisherDetected) ? t += this.publisherDetected ? s.YES : s.NO : t += s.NOT_APPLICABLE, Object(o.o)(this.consentExistsFlag)) t += this.consentExistsFlag ? s.YES : s.NO;
        else {
          let e = s.NOT_APPLICABLE;
          switch (this.unknownConsentStance()) {
            case 0:
              e = s.NO;
              break;
            case 1:
              e = s.YES;
              break;
            case 2:
              e = s.NOT_APPLICABLE
          }
          t += e
        }
        return t
      }
    }
    const j = new E(c.a.getConfigOf("gdpr"))
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(7);
    class s {
      constructor(t) {
        this.eventName = t, this.listeners = new Array
      }
      addListener(t, e = !1) {
        const n = {
          callback: t,
          once: e
        };
        this.listeners.push(n)
      }
      removeListener(t) {
        const e = this.findListener(t);
        if (e) {
          const t = this.listeners.indexOf(e);
          this.listeners.splice(t, 1)
        }
      }
      triggerListeners(t, e) {
        this.listeners.slice(0).forEach(n => {
          e || t ? e ? Object(r.a)(n.callback, [void 0, e]) : t && Object(r.a)(n.callback, [t]) : Object(r.a)(n.callback), n.once && this.removeListener(n.callback)
        })
      }
      findListener(t) {
        return this.listeners.find(e => e.callback === t)
      }
    }
    class i {
      constructor() {
        this.events = new Map
      }
      on(t, e, n = !0) {
        let r = this.events.get(t);
        r || (r = new s(t), this.events.set(t, r)), r.addListener(e, n)
      }
      off(t, e) {
        const n = this.events.get(t);
        n && (n.removeListener(e), 0 === n.listeners.length && this.events.delete(t))
      }
      emit(t, e, n) {
        const r = this.events.get(t);
        r && (void 0 === e && void 0 === n ? r.triggerListeners() : void 0 === e || "number" == typeof e || e instanceof Error || void 0 !== n ? "number" == typeof e && void 0 === n ? setTimeout(() => {
          r.triggerListeners()
        }, e) : void 0 === e || "number" == typeof e || e instanceof Error || "number" != typeof n ? void 0 !== e && "number" != typeof e && e instanceof Error && void 0 === n ? r.triggerListeners(e, void 0) : void 0 !== e && "number" != typeof e && e instanceof Error && "number" == typeof n && setTimeout(() => {
          r.triggerListeners(e, void 0)
        }, n) : setTimeout(() => {
          r.triggerListeners(void 0, e)
        }, n) : r.triggerListeners(void 0, e))
      }
      destroy(t) {
        this.events.get(t) && this.events.delete(t)
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(40);
    const s = (new r.a).where("cpm", ">", 0).where("status", "===", 1).get();
    (new r.a).where("cpm", ">", 0).where("status", "===", 1).where("bidType", "===", "internal").get(), (new r.a).where("cpm", ">", 0).where("status", "===", 1).where("bidType", "===", "external").get(), (new r.a).where("cpm", ">", 0).where("status", "===", 1).where("dealType", "===", "P").where("dealId", "!==", "").get(), (new r.a).where("cpm", ">", 0).where("status", "===", 1).where("dealType", "===", "O").get(), (new r.a).where("cpm", ">", 0).where("status", "===", 1).get()
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return a
    }));
    var r = n(3),
      s = n(22),
      i = n(12),
      o = n(0);
    class c extends i.a {
      constructor(t) {
        super(t)
      }
      get honourPublisher() {
        return this.get("psp")
      }
      get stateActionMap() {
        return this.get("sam")
      }
      get enforcementEnabled() {
        return this.get("enf")
      }
      get defaultConsentString() {
        return this.get("dfcnst")
      }
      get cookieValue() {
        return this.get("prtusr")
      }
      get consentStates() {
        return this.get("cssp")
      }
      get vendorId() {
        const t = this.get("vnid");
        return Object(o.o)(t) ? t : 0
      }
      get stanceUnknownConsent() {
        return this.get("suc") || 0
      }
    }
    const a = Object(r.d)(c, {
      "ccpa": {
        "id": "ccpa",
        "cssp": [{
          "cstr": "1---",
          "st": "S0",
          "idx": 0
        }, {
          "cstr": "1N--",
          "st": "S99",
          "idx": 1
        }, {
          "cstr": "1NYY",
          "st": "S1",
          "idx": 2
        }, {
          "cstr": "1NYN",
          "st": "S1",
          "idx": 3
        }, {
          "cstr": "1NNY",
          "st": "S2",
          "idx": 4
        }, {
          "cstr": "1NNN",
          "st": "S2",
          "idx": 5
        }, {
          "cstr": "1NY-",
          "st": "S1",
          "idx": 6
        }, {
          "cstr": "1N-Y",
          "st": "S99",
          "idx": 7
        }, {
          "cstr": "1N-N",
          "st": "S99",
          "idx": 8
        }, {
          "cstr": "1NN-",
          "st": "S2",
          "idx": 9
        }, {
          "cstr": "1YYN",
          "st": "S1",
          "idx": 10
        }, {
          "cstr": "1YY-",
          "st": "S1",
          "idx": 11
        }, {
          "cstr": "1YN-",
          "st": "S2",
          "idx": 12
        }, {
          "cstr": "1YNN",
          "st": "S2",
          "idx": 13
        }, {
          "cstr": "1YNY",
          "st": "S2",
          "idx": 14
        }, {
          "cstr": "1YYY",
          "st": "S3",
          "idx": 15
        }, {
          "cstr": "1-YY",
          "st": "S3",
          "idx": 16
        }, {
          "cstr": "1-YN",
          "st": "S1",
          "idx": 17
        }, {
          "cstr": "1-NY",
          "st": "S2",
          "idx": 18
        }, {
          "cstr": "1-NN",
          "st": "S2",
          "idx": 19
        }, {
          "cstr": "1--Y",
          "st": "S99",
          "idx": 20
        }, {
          "cstr": "1--N",
          "st": "S99",
          "idx": 21
        }, {
          "cstr": "1Y--",
          "st": "S99",
          "idx": 22
        }, {
          "cstr": "1Y-N",
          "st": "S99",
          "idx": 23
        }, {
          "cstr": "1Y-Y",
          "st": "S99",
          "idx": 24
        }, {
          "cstr": "1-Y-",
          "st": "S4",
          "idx": 25
        }, {
          "cstr": "1-N-",
          "st": "S2",
          "idx": 26
        }],
        "psp": true,
        "enf": true,
        "dfcnst": "1-N-",
        "sam": {
          "S0": [],
          "S1": ["TRIM_LAST_OCTET", "APPLY_GOOGLE_RESTRICTION", "STOP_SPAM", "STOP_WHITEOPS", "STOP_LOGGING_VISITOR_ID", "DISABLE_COOKIESYNC"],
          "S2": [],
          "S3": ["TRIM_LAST_OCTET", "STOP_LOGGING_VISITOR_ID", "APPLY_GOOGLE_RESTRICTION", "ENABLE_COOKIESYNC_FOR_SIGNATORIES"],
          "S4": ["TRIM_LAST_OCTET", "APPLY_GOOGLE_RESTRICTION", "STOP_SPAM", "STOP_WHITEOPS"],
          "S99": []
        },
        "prtusr": "0"
      },
      "coppa": {
        "id": "coppa",
        "cssp": [{
          "cstr": "Y",
          "st": "S1",
          "idx": 0
        }, {
          "cstr": "N",
          "st": "S8",
          "idx": 1
        }],
        "psp": true,
        "enf": true,
        "dfcnst": "",
        "sam": {
          "S6": ["REGS_COPPA", "DISABLE_COOKIESYNC"],
          "S7": ["REGS_COPPA", "APPLY_GOOGLE_TFCD_RESTRICTION"],
          "S8": [],
          "S1": ["REGS_COPPA", "TRIM_LAST_OCTET", "APPLY_GOOGLE_TFCD_RESTRICTION", "DISABLE_COOKIESYNC"],
          "S2": ["REGS_COPPA", "TRIM_LAST_OCTET", "DISABLE_COOKIESYNC"],
          "S3": ["REGS_COPPA", "TRIM_LAST_OCTET", "APPLY_GOOGLE_TFCD_RESTRICTION"],
          "S4": ["REGS_COPPA", "TRIM_LAST_OCTET"],
          "S5": ["REGS_COPPA", "APPLY_GOOGLE_TFCD_RESTRICTION", "DISABLE_COOKIESYNC"]
        },
        "prtusr": ""
      },
      "gdpr": {
        "id": "gdpr",
        "cssp": [{
          "cstr": "YN-",
          "st": "S2",
          "idx": 0
        }, {
          "cstr": "YYN",
          "st": "S0",
          "idx": 1
        }, {
          "cstr": "YYY",
          "st": "S1",
          "idx": 2
        }, {
          "cstr": "YY-",
          "st": "S2",
          "idx": 3
        }, {
          "cstr": "NYN",
          "st": "S0",
          "idx": 4
        }, {
          "cstr": "NYY",
          "st": "S1",
          "idx": 5
        }, {
          "cstr": "NY-",
          "st": "S2",
          "idx": 6
        }, {
          "cstr": "NN-",
          "st": "S1",
          "idx": 7
        }, {
          "cstr": "y-",
          "st": "S2",
          "idx": 8
        }],
        "psp": true,
        "enf": true,
        "dfcnst": "",
        "sam": {
          "S0": ["DISABLE_COOKIESYNC", "STOP_WHITEOPS", "STOP_SPAM", "APPLY_GOOGLE_RESTRICTION", "STOP_LOGGING_VISITOR_ID", "TRIM_LAST_OCTET"],
          "S1": [],
          "S2": ["ENABLE_COOKIESYNC_FOR_COCONTROLLERS", "STOP_WHITEOPS", "STOP_SPAM", "APPLY_GOOGLE_RESTRICTION", "STOP_LOGGING_VISITOR_ID", "TRIM_LAST_OCTET"],
          "S99": ["ENABLE_COOKIESYNC_FOR_COCONTROLLERS", "STOP_WHITEOPS", "STOP_SPAM", "APPLY_GOOGLE_RESTRICTION", "STOP_LOGGING_VISITOR_ID", "TRIM_LAST_OCTET"]
        },
        "prtusr": "0",
        "vnid": 720
      },
      "tcf": {
        "id": "tcf",
        "cssp": [{
          "cstr": "",
          "st": "C3",
          "idx": 1
        }, {
          "cstr": "",
          "st": "C4",
          "idx": 2
        }, {
          "cstr": "",
          "st": "F7",
          "idx": 3
        }, {
          "cstr": "",
          "st": "C1",
          "idx": 4
        }, {
          "cstr": "",
          "st": "F2",
          "idx": 5
        }],
        "psp": true,
        "enf": true,
        "dfcnst": "",
        "sam": {
          "F7": ["DISABLE_ADVIEWLOGS"],
          "C1": ["DISABLE_COOKIESYNC", "STOP_WHITEOPS", "STOP_SPAM"],
          "F2": ["DISABLE_ADS", "STOP_LOGGING_VISITOR_ID", "TRIM_LAST_OCTET"],
          "C3": ["STOP_LOGGING_VISITOR_ID", "TRIM_LAST_OCTET", "STOP_SENDING_PII"],
          "C4": ["STOP_LOGGING_VISITOR_ID", "TRIM_LAST_OCTET", "STOP_SENDING_PII"]
        },
        "prtusr": "0",
        "vnid": 720
      }
    }, new s.a)
  }, function(t, e, n) {
    "use strict";
    var r;
    n.d(e, "a", (function() {
        return r
      })),
      function(t) {
        t.VIEW = "VIEW", t.CLICK = "CLICK"
      }(r || (r = {}))
  }, function(t, e, n) {
    (function(e) {
      var n = function(t) {
        return t && t.Math == Math && t
      };
      t.exports = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || function() {
        return this
      }() || Function("return this")()
    }).call(this, n(149))
  }, function(t, e, n) {
    "use strict";
    n.d(e, "b", (function() {
      return o
    })), n.d(e, "a", (function() {
      return c
    }));
    var r = n(0),
      s = n(5);
    const i = Math.random();
    Object(s.c)(0, 99);

    function o(t) {
      return Object(r.o)(t) && (t < 1 || t * i > 1)
    }

    function c() {
      return Object(s.c)(1e15, 1e16) + "" + Date.now().toString()
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return a
    }));
    var r = n(36),
      s = n(0),
      i = n(5),
      o = n(4),
      c = n(1);
    class a {
      constructor() {
        this.bid = new r.a
      }
      setSizesForNative(t) {
        if (!t.provider.isNative) return;
        const e = t.sizes[0];
        this.bid.set("size", e).set("sz", e)
      }
      static cleanBidPrice(t) {
        return !isFinite(t) || isNaN(t) ? 0 : t
      }
      static isValidPrebidResponse(t) {
        if (!Object(s.o)(t.width) || !Object(s.o)(t.height)) return !1;
        const e = t.cpm;
        return !(!isFinite(e) || isNaN(e) || e <= 0)
      }
      static getBidPrice(t) {
        return Object(s.o)(t) ? String(a.cleanBidPrice(t)) : "0"
      }
      static getValidNoBidReason(t) {
        const e = t.get("nbc");
        return Object(s.o)(e) ? e : a.isValidProviderResponse(t) ? 0 : 99
      }
      static isNoBid(t) {
        const e = t.get("no_bid");
        return Object(s.o)(e) && e
      }
      static hasValidCpm(t) {
        const e = t.get("og_bid");
        return Object(s.o)(e) && e > 0
      }
      static isValidProviderResponse(t) {
        return !a.isNoBid(t) && a.hasValidCpm(t)
      }
      static getTestData(t) {
        const e = t.get("td") || "",
          n = t.get("ab");
        return Object(s.o)(n) ? e + "|ab=" + n : e
      }
      getProviderSeat(t, e) {
        const n = e.get("seat") || "";
        return Object(s.q)(n) ? t + "-" + n : ""
      }
      static getProviderApiId(t, e) {
        const n = t.get("publisher_id");
        return Object(s.o)(n) && Object(s.q)(n) ? n : e.externalPublisherCode
      }
      static getExperimentString(t) {
        const e = [];
        return Object.keys(t).forEach(n => {
          e.push(n + "=" + t[n])
        }), e.join("|")
      }
      static getDealTypeFromResponse(t) {
        const e = String(t.get("provider_id")),
          n = o.f.getConfigOf(e),
          r = t.get("dealid") || "";
        let i = t.get("at") || (Object(s.o)(r) ? "P" : "O");
        return "P" !== i || n.isPmpEnabled || (i = "O"), i
      }
      static getCategory(t) {
        let e = "";
        return Object(s.o)(t) && Object(s.e)(t) && (e = t.join("|")), e
      }
      create() {
        return this.bid = new r.a, this.setEnvironmentProperties(), this
      }
      setMockedValidBidProperties(t, e, n) {
        const r = o.f.getConfigOf(t);
        return this.bid.set("pvid", t).set("s", 1).set("nbr", 0).set("tc", "1").set("di", "").set("dt", "O").set("iwb", "1").set("bidFor", "headerBid").set("bidFrom", "headerBid").set("ogBid", e).set("size", Object(s.o)(n) ? n.toString() : "").set("ts", Date.now()).set("bg", r.bidderGroup), this
      }
      setCommonPrebidProperties(t) {
        return Object(s.o)(t) && a.isValidPrebidResponse(t) && (this.status(1), this.bid.set("nbr", 0).set("size", [t.width, t.height].join("x")).set("pcrid", String(t.creativeId)).set("di", t.dealId).set("cPvRqId", String(t.requestId)).set("lpx", t.lpx || []).set("adc", t.ad).set("ogBid", String(t.cpm)).set("adUrl", Object(s.o)(t.meta) ? String(t.meta.advertiserDomains || "") : "").set("ts", Date.now())), this.bid.set("tc", "1"), this
      }
      setDummyBidProperties(t, e, n) {
        return this.bid.set("ogBid", "0").set("size", e.sizes[0] && e.sizes[0].toString()), Object(s.o)(n) && this.bid.set("nbr", n), this
      }
      setExchangeResponseProperties(t, e) {
        const n = t.get("integrations");
        return this.bid.set("ab", t.get("ab") || 0).set("apid", t.get("apid") || 0).set("nAp", t.get("apnotify") || []).set("bbid", t.get("bbid")).set("binb", t.get("providerBidderId") || "").set("bd", t.get("bidData") || "").set("byId", t.get("buyerMemberId") || "").set("cmpid", t.get("buyer_id") || "").set("cat", a.getCategory(t.get("category")) || "").set("attr", t.get("attr") || "").set("dtc", t.get("region") || "").set("erpm", t.get("erpm")).set("exp", a.getExperimentString(t.get("experiment") || {})).set("ePvRqId", t.get("bidReqId") || "").set("gbid", t.get("gbid") || 0).set("htps", t.get("htps") ? "1" : "0").set("patint", Object(s.e)(n) ? n : []).set("patkey", t.get("integrationKey") || "").set("fpURq", t.get("full_page_url")).set("lpx", t.get("logging_pixels") || []).set("mpSeg", t.get("mp_seg") || []).set("mlogs", t.get("mowxLogs") || {}).set("pageCat", t.get("pageCat") || {}).set("prvApiId", a.getProviderApiId(t, e)).set("uid", t.get("uid") || "").set("pvNbr", t.get("pv_nbr")).set("pvNbrDtls", t.get("pv_nbr_dtls") || "").set("rt", t.get("responseTime") || 0).set("td", a.getTestData(t)).set("pseat", this.getProviderSeat(e.provider.id, t)).set("seat", t.get("seat") || "").set("sp", t.get("sp") || {}).set("sbdrid", t.get("sub_bidder_id") || "").set("vbid", t.get("vbid")).set("wsip", t.get("serverId") || "").set("wt", t.get("waitTime") || 0).set("dwnt", t.get("downloadTime") || 0).set("dur", t.get("total") || 0), this
      }
      setBidRequestProperties(t) {
        return this.bid.set("bidFor", t.impression.type), this
      }
      setBidResponseProperties(t, e) {
        const n = t.get("uid") || "",
          r = Object(s.q)(n) ? "1" : "0",
          c = e.placement.id,
          u = String(t.get("provider_id")),
          d = o.f.getConfigOf(u),
          l = d && d.get("adn"),
          h = e.bidFloor;
        return this.bid.set("adc", t.get("adcode") || "").set("adTp", t.get("adCodeType") || "").set("adId", t.get("brandId") || "").set("adNm", t.get("advBrandName") || "").set("pvAgNm", t.get("agency_nm") || "").set("pvAgId", t.get("agency_id") || "").set("adUrl", t.get("landingPageUrl") || l || "").set("cPvRqId", t.get("prvReqId") || "").set("ckfl", r).set("cs", t.get("cs") || "").set("crid", c || "").set("iurl", t.get("iurl") || "").set("di", t.get("dealid") || "").set("dt", a.getDealTypeFromResponse(t)).set("dbf", t.get("dbf") ? "1" : "0").set("epc", t.get("ext_placement_code") || "").set("fb", t.get("fb") || !1).set("bidflr", Object(i.a)(t.get("floor") || 0)).set("bfs", h.src).set("nbr", a.getValidNoBidReason(t)).set("ogBid", a.getBidPrice(t.get("og_bid"))).set("paId", t.get("prvAccId") || "").set("pcrid", t.get("crid") || "").set("pvid", u || "").set("size", t.get("size") || "").set("ts", Date.now()).set("tc", t.get("rstb") ? "1" : "0").set("vcfl", t.get("vcfl") ? "1" : "0").set("acn", "1"), this.status(a.isValidProviderResponse(t) ? 1 : 2), this.setSizesForNative(e), this
      }
      setSspProperties(t) {
        return this.bid.set("sspRegion", t.properties.sspRegion || "").set("sspRequestId", t.properties.sspRequestId || "").set("sspSvrName", t.properties.sspSvrName || ""), this
      }
      setDMSProperties(t) {
        const e = t.get("dms");
        return Object(s.o)(e) ? (this.bid.set("dms", e).set("dmsStat", e.status), this) : this
      }
      status(t) {
        return this.bid.set("s", t), this
      }
      setTestProviderProperties(t, e) {
        return this.bid.set("adc", t).set("ogBid", e).set("nbr", 0), this
      }
      setPlacementSpecificProperties(t) {
        return this.bid.set("crid", t.id), this
      }
      setProviderSpecificProperties(t) {
        const e = t && t.get("mnet"),
          n = Date.now() + t.get("bidttl");
        return this.bid.set("pvid", t.id), this.bid.set("type", e ? "internal" : "external"), this.bid.set("expAt", n), this.bid.set("bg", t.bidderGroup), this
      }
      setEntityProperties(t, e) {
        return this.setPlacementSpecificProperties(e), this.setProviderSpecificProperties(t), this
      }
      setEnvironmentProperties() {
        return this.bid.set("refvisitid", c.app.envProperties.visitId), this
      }
      build() {
        return this.bid
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(3),
      s = n(0);
    const i = new class {
      constructor(t) {
        this.properties = new r.a(t)
      }
      get asiaPacificRouting() {
        return this.properties.get("apacRouting")
      }
      get europeRouting() {
        return this.properties.get("euRouting")
      }
      get strictUserCheckProviders() {
        return this.properties.get("strictUsrCkPrvs")
      }
      get requestType() {
        return this.properties.get("requestType")
      }
      get fanoutStrategy() {
        return this.properties.get("fanoutStrategy")
      }
      isSingleRequestForDisplayAndNativeEnabled() {
        const t = this.properties.get("cRtbCall");
        return !!Object(s.o)(t) && 1 === t
      }
    }({
      "apacRouting": false,
      "euRouting": true,
      "exchange": "",
      "requestType": "stream",
      "strictUsrCkPrvs": ["97", "108", "3012"],
      "cRtbCall": 1,
      "fanoutStrategy": 0
    })
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(6),
      s = n(4);
    class i extends r.a {
      constructor(t, e) {
        super(t), this.provider = s.f.getConfigOf(e)
      }
      getAll() {
        return this.decoratorItem.getAll().set("sylg", this.provider.get("id")).set("halg", this.provider.get("eid"))
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(3),
      s = n(0);
    class i {
      constructor(t, e) {
        this.properties = e || {}, this.bidId = t || Object(r.b)()
      }
      static fromJSON(t) {
        return new i(t.bidId, t.properties)
      }
      static hasExpired(t) {
        return Date.now() > t.expiresAt
      }
      get id() {
        return this.bidId
      }
      get(t) {
        return this.properties[t]
      }
      set(t, e) {
        return this.properties[t] = e, this
      }
      get providerId() {
        return this.get("pvid")
      }
      get placementId() {
        return this.get("crid")
      }
      get originalCpm() {
        return parseFloat(this.get("ogBid")) || 0
      }
      get cpm() {
        return parseFloat(this.get("cpm")) || 0
      }
      get adcode() {
        return this.get("adc") || ""
      }
      get publisherNet() {
        return parseFloat(this.get("cbdp"))
      }
      get expiresAt() {
        return this.get("expAt")
      }
      get status() {
        return this.get("s")
      }
      get bidType() {
        return this.get("type")
      }
      get dealType() {
        return this.get("dt")
      }
      get dealId() {
        return this.get("di")
      }
      all() {
        return this.properties
      }
      get https() {
        return this.get("htps")
      }
      isPrivateDeal() {
        return "P" === this.get("dt")
      }
      match(t) {
        const e = Object.keys(t);
        if (0 === e.length) return !0;
        let n = !0;
        return e.forEach(e => {
          n = n && this.get(e) === t[e]
        }), n
      }
      get statusName() {
        switch (this.get("s")) {
          case 0:
            return "pending";
          case 1:
            return "success";
          case 2:
            return "nobid";
          case 3:
            return "timeout";
          case 4:
            return "bid_not_in_cache";
          case 5:
            return "response_after_auction";
          case 6:
            return "nobid_after_auction";
          case 7:
            return "error";
          case 8:
            return "removed";
          default:
            return ""
        }
      }
      get bidAge() {
        const t = this.get("ts");
        return Object(s.o)(t) ? Date.now() - t : -1
      }
      get referringVisitId() {
        return this.get("refvisitid")
      }
      get bidFor() {
        return this.get("bidFor")
      }
      get dms() {
        return this.get("dms")
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(0),
      s = n(9);
    class i {
      constructor(t) {
        this.map = new Map, i.regexString = t || i.regexString
      }
      static getMacroKey(t) {
        const e = new RegExp(i.regexString, "g").exec(t);
        let n = t;
        return Object(r.o)(e) && Object(r.e)(e) && Object(r.o)(e[1]) && (n = e[1]), n
      }
      input(t, e) {
        return this.map.set(i.getMacroKey(t), e), this
      }
      resolveMacros(t, e) {
        const n = new RegExp(i.regexString, "g");
        return t.replace(n, (t, n) => {
          const i = this.map.get(n);
          if (void 0 === i) return t;
          let o = "";
          return Object(r.p)(i) && (o = i), Object(r.h)(i) && (o = i()), e && (o = Object(s.d)(o)), o
        })
      }
    }
    i.regexString = "%%([A-Za-z_]+)%%"
  }, function(t, e, n) {
    "use strict";
    n.d(e, "b", (function() {
      return i
    })), n.d(e, "c", (function() {
      return o
    })), n.d(e, "a", (function() {
      return c
    }));
    var r = n(0);
    let s = 1;

    function i() {
      return "script" + s++
    }

    function o(t, e) {
      let n = "";
      return t.forEach(t => {
        if (Object(r.q)(n)) n += "-" + t.provider.id;
        else {
          const r = t.sizes.join("~");
          n = e + "*" + r + "*" + t.provider.id
        }
        t.bidFloor.rp > 0 && (n += "~" + t.bidFloor.rp)
      }), n
    }

    function c(t, e) {
      return 0 !== e ? t + " " + (e + 1) : t
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "b", (function() {
      return l
    })), n.d(e, "a", (function() {
      return h
    }));
    var r, s = n(27),
      i = n(0),
      o = n(8),
      c = n(2);
    ! function(t) {
      t[t.IDLE = 0] = "IDLE", t[t.LOADED = 1] = "LOADED", t[t.LOADING = 2] = "LOADING", t[t.UNATTACHED_TO_DOM = 3] = "UNATTACHED_TO_DOM"
    }(r || (r = {}));
    var a = n(7);
    let u = 1;
    const d = {};

    function l(t) {
      return d[t]
    }
    class h extends s.a {
      constructor() {
        super(), this.id = u++, this.status = r.IDLE, d[this.id] = this
      }
      create(t) {
        return this.frameElement = Object(c.f)(t, "0", "0"), this.status = r.UNATTACHED_TO_DOM, this
      }
      withSource(t) {
        return this.frameElement.src = t, this
      }
      withSandBoxAttributes(t) {
        return this.frameElement.setAttribute("sandbox", t.join(" ")), this
      }
      setFrameName(t) {
        return t = {
          ...t,
          fid: this.id,
          tarOg: Object(o.f)()
        }, this.frameElement.name = JSON.stringify(t), this
      }
      attachToDom(t) {
        return Object(c.d)(t, this.frameElement), this.status = r.LOADING, this
      }
      removeFromDom() {
        const t = Object(c.k)(this.frameElement);
        return Object(c.y)(t), this
      }
      setFrameSize(t, e) {
        const n = Object(c.k)(this.frameElement);
        return n.height = e + "px", n.width = t + "px", this
      }
      setFlexibleFrameSize(t, e) {
        const n = Object(c.k)(this.frameElement);
        return n.height = e, n.width = t, this
      }
      hide() {
        const t = Object(c.k)(this.frameElement);
        return Object(c.o)(t), this
      }
      show() {
        return Object(c.z)(this.frameElement), this
      }
      setTargetOrigin(t) {
        return this.targetOrigin = t, this
      }
      isLoaded() {
        return this.status === r.LOADED
      }
      loaded() {
        this.isLoaded() || (this.status = r.LOADED, this.emit("loaded"))
      }
      getParentElement() {
        const t = Object(c.k)(this.frameElement);
        return t && t.parentElement
      }
      postMessage(t) {
        const e = Object(c.k)(this.frameElement).contentWindow;
        Object(i.o)(e) && (t.frameID = this.id, e.postMessage(t.serialize(), t.targetOrigin))
      }
      send(t) {
        return this.isLoaded() ? this.postMessage(t) : this.on("loaded", () => {
          this.postMessage(t)
        }), this
      }
    }
    h.sandboxAttributes = ["allow-forms", "allow-pointer-lock", "allow-popups", "allow-popups-to-escape-sandbox", "allow-same-origin", "allow-top-navigation-by-user-activation", "allow-scripts"], window.addEventListener("message", Object(a.b)((function(t) {
      if (!Object(i.o)(t) || !Object(i.o)(t.data)) return;
      const e = d[t.data.pfid];
      e && t.origin === e.targetOrigin && (!0 === t.data.phs && e.loaded(), e.emit("msgReceived", t.data))
    })))
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    class r {
      constructor(t) {
        this.queryCriteria = new Array, this.queryType = t
      }
      get type() {
        return this.queryType
      }
      get criteria() {
        return this.queryCriteria
      }
      set criteria(t) {
        this.queryCriteria = t
      }
      get updater() {
        return this.updaterMap
      }
      set updater(t) {
        this.updaterMap = t
      }
      get orderBy() {
        return this.orderByAttr
      }
      set orderBy(t) {
        this.orderByAttr = t
      }
      each(t) {
        this.queryCriteria.forEach(t.call)
      }
    }
    class s {
      constructor() {
        this.criteria = new Array
      }
      where(t, e, n) {
        return this.criteria.push({
          field: t,
          operator: e,
          value: n
        }), this
      }
      orderBy(t, e) {
        return this.orderByClause = {
          attribute: t,
          direction: e
        }, this
      }
      build(t) {
        const e = new r(t);
        return e.criteria = this.criteria, e
      }
      get() {
        const t = this.build(1);
        return t.orderBy = this.orderByClause, t
      }
      remove() {
        return this.build(0)
      }
      update(t) {
        const e = this.build(2);
        return e.updater = t, e
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "d", (function() {
      return g
    })), n.d(e, "c", (function() {
      return p
    })), n.d(e, "e", (function() {
      return f
    })), n.d(e, "a", (function() {
      return b
    })), n.d(e, "b", (function() {
      return m
    }));
    var r = n(33),
      s = n(25),
      i = n(107),
      o = n(32),
      c = n(0),
      a = n(20),
      u = n(10),
      d = n(1),
      l = n(17),
      h = n(57);

    function g(t, e, n = {}) {
      const r = Object(o.a)(),
        a = function(t, e, n, r, s) {
          const i = [{
              adUnitCode: t.placement.domReference || String(t.placement.id),
              auctionId: t.impression.id,
              bidId: Object(o.a)(),
              bidRequestsCount: 1,
              bidder: e.id,
              bidderRequestId: n,
              mediaTypes: {
                banner: {
                  sizes: r
                }
              },
              params: s,
              sizes: r,
              src: "client",
              transactionId: Object(o.a)()
            }],
            a = function(t, e) {
              if (!e.get("sch")) return null;
              return {
                complete: 1,
                nodes: [{
                  asi: "aax.media",
                  hp: 1,
                  rid: t,
                  sid: d.app.envProperties.cid
                }],
                ver: "1.0"
              }
            }(n, e);
          Object(c.o)(a) && i.forEach(t => t.schain = a);
          return i
        }(t, e, r, function(t) {
          const e = [];
          for (const n of t) e.push(new s.a(n).toArray());
          return e
        }(t.applicableSizes.sizes), n);
      return function(t, e, n, r) {
        return {
          auctionId: t.impression.id,
          auctionStart: Date.now(),
          bidderCode: e.id,
          bidderRequestId: n,
          bids: r,
          coppa: l.a.isActionApplicable("REGS_COPPA"),
          gdprConsent: p(),
          refererInfo: {
            canonicalUrl: t.impression.publisherUrl,
            numIframes: "1",
            reachedTop: Object(h.b)(),
            referer: t.impression.publisherUrl,
            stack: []
          },
          start: Date.now(),
          timeout: i.a.get("pvTimeout"),
          uspConsent: f()
        }
      }(t, e, r, a)
    }

    function p() {
      return {
        consentString: u.a.consent,
        gdprApplies: u.a.isApplicable()
      }
    }

    function f() {
      return Object(c.o)(a.a.finalConsent) ? a.a.finalConsent : ""
    }

    function b(t, e, n) {
      return (new r.a).create().status(2).setEntityProperties(t, e).setDummyBidProperties(t, e, 99).setCommonPrebidProperties(n).build()
    }

    function m(t, e) {
      const n = [];
      return t.applicableSizes.sizes.forEach(r => {
        if (r !== e) {
          const e = b(t.provider, t.placement.placementConfig);
          e.set("size", r), e.set("dbf", "0"), n.push(e)
        }
      }), n
    }
  }, function(t, e) {
    t.exports = function(t) {
      try {
        return !!t()
      } catch (t) {
        return !0
      }
    }
  }, function(t, e) {
    var n = {}.hasOwnProperty;
    t.exports = function(t, e) {
      return n.call(t, e)
    }
  }, function(t, e, n) {
    "use strict";
    var r = n(1),
      s = n(0),
      i = n(9);
    e.a = new class {
      constructor() {
        this.cookiePropertiesSeparator = ";", this.length = document.cookie.length
      }
      setItem(t, e, n) {
        const {
          path: o,
          domain: c,
          secure: a,
          expireInDays: u
        } = n;
        let d, l;
        Object(s.o)(u) && (d = 1e3 * u * 60 * 60 * 24);
        const h = r.locator.resolve("encryptionservice");
        if (l = Object(s.o)(h) ? h.encode(e) : e, l = Object(i.d)(l), Object(s.o)(o) && Object(s.q)(o) && (l += this.cookiePropertiesSeparator + "path=" + o), Object(s.o)(c) && Object(s.q)(c) && (l += this.cookiePropertiesSeparator + "domain=" + c), Object(s.o)(d)) {
          const t = new Date(Date.now() + d);
          l += this.cookiePropertiesSeparator + "expires=" + t.toUTCString()
        }
        Object(s.o)(a) && a && (l += this.cookiePropertiesSeparator + "secure"), document.cookie = t + "=" + l
      }
      getItem(t) {
        const e = "".concat(this.cookiePropertiesSeparator, " ").concat(document.cookie).split("; ".concat(t, "=")),
          n = e.pop();
        let s = null;
        if (1 === e.length && n) {
          s = n.split(this.cookiePropertiesSeparator)[0], s = Object(i.c)(s);
          const t = r.locator.resolve("encryptionservice");
          t && (s = t.decode(s))
        }
        return s
      }
      removeItem(t) {}
      clear() {}
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(0);
    class s {
      constructor(t) {
        this.batchId = t, this.state = 1, this.auctioneersArray = [], this.dfpCallbacksList = []
      }
      isBatchReleased() {
        return 3 === this.state
      }
      isBatchInWire() {
        return 2 === this.state
      }
      get id() {
        return this.batchId
      }
      addAuctioneer(t) {
        this.auctioneersArray = [...this.auctioneersArray, ...t]
      }
      addDfpCallback(t) {
        Object(r.h)(t) && this.dfpCallbacksList.push(t)
      }
      get auctioneers() {
        return this.auctioneersArray
      }
      get dfpCallbacks() {
        return this.dfpCallbacksList
      }
      wire() {
        this.state < 2 && (this.state = 2)
      }
      release() {
        this.isBatchReleased() || (this.state = 3)
      }
    }
    const i = new class {
      constructor() {
        this.batchRegistry = new Map, this.batchSerialNumber = 1
      }
      isNewBatchRequired(t) {
        return !t || !Object(r.o)(this.currentBatch) || this.currentBatch.isBatchReleased()
      }
      getBatch(t) {
        if (this.isNewBatchRequired(t)) {
          const t = this.batchSerialNumber++,
            e = new s(t);
          return this.batchRegistry.set(t, e), this.currentBatch = e, e.id
        }
        return this.currentBatch.id
      }
      addAuctioneer(t, e) {
        const n = this.batchRegistry.get(t);
        Object(r.o)(n) && Object(r.o)(e) && (Object(r.e)(e) || (e = [e]), n.addAuctioneer(e))
      }
      addDfpCallback(t, e) {
        const n = this.batchRegistry.get(t);
        Object(r.o)(n) && Object(r.o)(e) && n.addDfpCallback(e)
      }
      getAuctioneers(t) {
        const e = this.batchRegistry.get(t);
        return Object(r.o)(e) ? e.auctioneers : []
      }
      getDfpCallbacks(t) {
        const e = this.batchRegistry.get(t);
        return Object(r.o)(e) ? e.dfpCallbacks : []
      }
      wire(t) {
        const e = this.batchRegistry.get(t);
        Object(r.o)(e) && e.wire()
      }
      release(t) {
        const e = this.batchRegistry.get(t);
        Object(r.o)(e) && e.release()
      }
      isBatchInWire(t) {
        const e = this.batchRegistry.get(t);
        return !!Object(r.o)(e) && e.isBatchInWire()
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "b", (function() {
      return s.a
    })), n.d(e, "c", (function() {
      return i
    })), n.d(e, "a", (function() {
      return O
    })), n.d(e, "d", (function() {
      return j
    }));
    n(94), n(170), n(179), n(146);
    var r = n(145),
      s = n.n(r),
      i = function(t, e, n) {
        e.split && (e = e.split("."));
        for (var r, s = 0, i = e.length, o = t; s < i; ++s) r = o[e[s]], o = o[e[s]] = s === i - 1 ? n : null != r ? r : !~e[s + 1].indexOf(".") && +e[s + 1] > -1 ? [] : {}
      },
      o = Object.prototype.toString;
    let c = Boolean(window.console);
    Boolean(c && window.console.log), Boolean(c && window.console.info), Boolean(c && window.console.warn), Boolean(c && window.console.error);
    const a = {
      checkCookieSupport: function() {
        if (window.navigator.cookieEnabled || document.cookie.length) return !0
      },
      createTrackPixelIframeHtml: function(t, e = !0, n = "") {
        if (!t) return "";
        e && (t = encodeURI(t));
        n && (n = 'sandbox="'.concat(n, '"'));
        return "<iframe ".concat(n, ' id="').concat(h(), '"\n      frameborder="0"\n      allowtransparency="true"\n      marginheight="0" marginwidth="0"\n      width="0" hspace="0" vspace="0" height="0"\n      style="height:0px;width:0px;display:none;"\n      scrolling="no"\n      src="').concat(t, '">\n    </iframe>')
      },
      getWindowSelf: function() {
        return window.self
      },
      getWindowTop: function() {
        return window.top
      },
      getAncestorOrigins: function() {
        if (window.document.location && window.document.location.ancestorOrigins && window.document.location.ancestorOrigins.length >= 1) return window.document.location.ancestorOrigins[window.document.location.ancestorOrigins.length - 1]
      },
      getTopFrameReferrer: function() {
        try {
          window.top.location.toString();
          let t, e = "";
          do {
            t = t ? t.parent : window, t.document && t.document.referrer && (e = t.document.referrer)
          } while (t !== window.top);
          return e
        } catch (t) {
          return window.document.referrer
        }
      },
      getWindowLocation: function() {
        return window.location
      },
      getTopWindowLocation: function() {
        if (j()) {
          let t;
          try {
            t = a.getAncestorOrigins() || a.getTopFrameReferrer()
          } catch (t) {
            g("could not obtain top window location", t)
          }
          if (t) return function(t, e) {
            let n = document.createElement("a");
            e && "noDecodeWholeURL" in e && e.noDecodeWholeURL ? n.href = t : n.href = decodeURIComponent(t);
            let r = e && "decodeSearchAsString" in e && e.decodeSearchAsString;
            return {
              href: n.href,
              protocol: (n.protocol || "").replace(/:$/, ""),
              hostname: n.hostname,
              port: +n.port,
              pathname: n.pathname.replace(/^(?!\/)/, "/"),
              search: r ? n.search : (s = n.search || "", s ? s.replace(/^\?/, "").split("&").reduce((t, e) => {
                let [n, r] = e.split("=");
                return /\[\]$/.test(n) ? (n = n.replace("[]", ""), t[n] = t[n] || [], t[n].push(r)) : t[n] = r || "", t
              }, {}) : {}),
              hash: (n.hash || "").replace(/^#/, ""),
              host: n.host || window.location.host
            };
            var s
          }(t, {
            decodeSearchAsString: !0
          })
        }
        return a.getWindowLocation()
      },
      insertUserSyncIframe: function(t, e) {
        let n = a.createTrackPixelIframeHtml(t, !1, "allow-scripts allow-same-origin"),
          r = document.createElement("div");
        r.innerHTML = n;
        let s = r.firstChild;
        e && a.isFn(e) && (s.addEventListener("load", e), s.addEventListener("error", e));
        a.insertElement(s, document, "html", !0)
      },
      insertElement: y,
      isFn: b,
      triggerPixel: function(t, e) {
        const n = new Image;
        e && a.isFn(e) && (n.addEventListener("load", e), n.addEventListener("error", e));
        n.src = t
      },
      logError: p,
      logWarn: function() {
        0
      },
      logMessage: function() {
        0
      },
      logInfo: g
    };
    var u = {};
    (function(t, e) {
      return e
    }).bind(null, 1, u)() === u && Function.prototype.bind;
    var d, l = (d = 0, function() {
      return ++d
    });

    function h() {
      return l() + Math.random().toString(16).substr(2)
    }

    function g() {
      0
    }

    function p() {
      0
    }

    function f(t, e) {
      return o.call(t) === "[object " + e + "]"
    }

    function b(t) {
      return f(t, "Function")
    }

    function m(t) {
      return f(t, "String")
    }

    function v(t) {
      return f(t, "Array")
    }

    function w(t) {
      if (!t) return !0;
      if (v(t) || m(t)) return !(t.length > 0);
      for (var e in t)
        if (hasOwnProperty.call(t, e)) return !1;
      return !0
    }

    function O(t, e) {
      if (!w(t)) {
        if (b(t.forEach)) return t.forEach(e, this);
        var n = 0,
          r = t.length;
        if (r > 0)
          for (; n < r; n++) e(t[n], n, t);
        else
          for (n in t) hasOwnProperty.call(t, n) && e.call(this, t[n], n)
      }
    }! function() {
      if (Array.prototype.indexOf) Array.prototype.indexOf
    }();

    function y(t, e, n, r) {
      let s;
      e = e || document, s = n ? e.getElementsByTagName(n) : e.getElementsByTagName("head");
      try {
        if (s = s.length ? s : e.getElementsByTagName("body"), s.length) {
          s = s[0];
          let e = r ? null : s.firstChild;
          return s.insertBefore(t, e)
        }
      } catch (t) {}
    }
    E("timeToRespond", (t, e) => t > e), E("responseTimestamp", (t, e) => t > e), E("responseTimestamp", (t, e) => t < e);

    function E(t, e) {
      return (n, r) => n.cpm === r.cpm ? e(n[t], r[t]) ? r : n : n.cpm < r.cpm ? r : n
    }

    function j() {
      try {
        return a.getWindowSelf() !== a.getWindowTop()
      } catch (t) {
        return !0
      }
    }
  }, function(t, e, n) {
    var r = n(42);
    t.exports = !r((function() {
      return 7 != Object.defineProperty({}, 1, {
        get: function() {
          return 7
        }
      })[1]
    }))
  }, function(t, e, n) {
    var r = n(31),
      s = n(135),
      i = n(43),
      o = n(119),
      c = n(142),
      a = n(177),
      u = s("wks"),
      d = r.Symbol,
      l = a ? d : d && d.withoutSetter || o;
    t.exports = function(t) {
      return i(u, t) || (c && i(d, t) ? u[t] = d[t] : u[t] = l("Symbol." + t)), u[t]
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(6),
      s = n(0);
    class i extends r.a {
      constructor(t, e, n = {}) {
        super(t), this.bid = e, this.dfpLogMetadata = n
      }
      static getLabelId(t) {
        return t && t.join("|") || ""
      }
      getAll() {
        return Object(s.o)(this.bid) ? this.decoratorItem.getAll().set("gisdgyLg", this.bid.get("dfpadvid") || "").set("gisfpsLg", this.bid.get("dfpcmpid") || "").set("lvHps", this.bid.get("isEmp") || "").set("gvlg", this.bid.get("dsid") || "").set("gisGly", this.dfpLogMetadata.dfpDivID || this.bid.get("dfpDId") || "").set("vc", this.dfpLogMetadata.size || this.bid.get("sz") || "").set("vufDjFulg", this.bid.get("srcAgnCrid") || "").set("vufDjOlg", this.bid.get("srcAgnLid") || "").set("oelg", i.getLabelId(this.bid.get("lbid")) || "").set("lvefnio", this.bid.get("isbckfl") || "").set("vuyfqp", this.bid.get("srvcnm") || "") : this.decoratorItem.getAll()
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(6),
      s = n(4);
    class i extends r.a {
      constructor(t, e) {
        super(t), this.placement = s.e.getConfigOf(e)
      }
      getAll() {
        return this.decoratorItem.getAll().set("fulg", this.placement.id).set("j", this.placement.get("g") ? "1" : "0").set("qpv", this.placement.sizes.length).set("swbsh", this.placement.get("pdt"))
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(6),
      s = n(2);
    class i extends r.a {
      constructor(t, e) {
        super(t), this.slotElementId = e
      }
      getAll() {
        const t = Object(s.h)(this.slotElementId);
        return this.decoratorItem.getAll().set("wrs", t.top).set("ewp", t.bottom).set("oiw", t.left).set("ujkw", t.right)
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return F
    }));
    var r = n(0),
      s = n(33),
      i = n(36),
      o = n(67),
      c = n(4);
    class a {
      constructor(t, e = !0, n, r, s, i) {
        this.local = !1, this.providerRequestId = "", this.placementInstance = t, this.local = e, this.impressionRef = n, this.applicableSizesConfig = s, this.providerConfig = r, this.reservedPrice = i
      }
      get impression() {
        return this.impressionRef
      }
      get isLocal() {
        return this.local || !1
      }
      get placement() {
        return this.placementInstance
      }
      get provider() {
        return this.providerConfig
      }
      get applicableSizes() {
        return this.applicableSizesConfig
      }
      get bidFloor() {
        return this.reservedPrice
      }
      set bidFloor(t) {
        this.reservedPrice = t
      }
      get providerReqId() {
        return this.providerRequestId
      }
      set providerReqId(t) {
        this.providerRequestId = t
      }
    }
    class u {
      constructor() {
        this.local = !1
      }
      static create() {
        return new u
      }
      forPlacement(t) {
        return this.placement = t, this
      }
      forImpression(t) {
        return this.impression = t, this
      }
      providerConfig(t) {
        return this.participant = t, this
      }
      sizeConfig(t) {
        return this.applicableSizes = t, this
      }
      forFloorPrice(t) {
        return this.bidFloor = t, this
      }
      build() {
        return new a(this.placement, this.local, this.impression, this.participant, this.applicableSizes, this.bidFloor)
      }
    }
    var d = n(1);
    var l = n(72),
      h = n(25);

    function g(t, e) {
      return t.filter(t => {
        return n = t, e.some(t => t.toString() === n.toString());
        var n
      })
    }

    function p(t, e, n, s) {
      const i = t.id;
      let o = function(t, e, n) {
        const s = {
          [l.a.DEVICE_TYPE]: d.app.envProperties.cugd,
          [l.a.HOSTNAME]: d.app.envProperties.dn,
          [l.a.PROVIDER_ID]: t,
          [l.a.SLOTNAME]: n,
          [l.a.SIZE]: e
        };
        return Object(r.o)(window.aax) && Object(r.h)(window.aax.getExternalPlacementCode) ? window.aax.getExternalPlacementCode(s) : ""
      }(e, s, t.placementConfig.code);
      return Object(r.o)(o) && (o = String(o)), Object(r.q)(o) ? o : Object(r.q)(n) ? n : i
    }

    function f(t, e, n, s) {
      return n.map(n => {
        const i = function(t, e) {
            const n = t && t.placementConfig,
              s = t.expectedSizes;
            if (!Object(r.o)(n)) return {
              epcs: [],
              sizes: []
            };
            const i = n.providersMapped.getConfigOf(e).sizeEpcMap,
              o = n.sizes;
            if (!Object(r.o)(i)) return {
              epcs: [],
              sizes: []
            };
            let c = o;
            Object(r.o)(s) && s.length > 0 && (c = g(o, s)), c = g(c, i.map(t => new h.a(t.size)));
            const a = c.map(t => t.toString()),
              u = [],
              d = [];
            return i.forEach(n => {
              -1 !== a.indexOf(n.size) && (u.push(p(t, e, n.epc, n.size)), d.push(n.size))
            }), {
              epcs: u,
              sizes: d
            }
          }(e, n.id),
          o = c.f.getConfigOf(n.id),
          a = class {
            static get(t) {
              const e = c.f.getConfigOf(t).get("adapter");
              return Object(r.o)(e) ? d.locator.resolve(e) : null
            }
          }.get(n.id),
          l = s[o.id];
        if (0 === i.sizes.length) return function(t, e) {
          return Promise.reject({
            placement: t.placementConfig,
            provider: e,
            reason: 13
          })
        }(e, n);
        if (!Object(r.o)(a)) return function(t, e) {
          return Promise.reject({
            placement: t.placementConfig,
            provider: e,
            reason: 1200
          })
        }(e, n);
        const f = u.create().forPlacement(e).forImpression(t).providerConfig(o).sizeConfig(i).forFloorPrice(l).build();
        return a.submit(f)
      })
    }
    var b = n(3);
    var m = n(40);
    class v extends class {
      match(t, e) {
        switch (t.operator) {
          case "===":
            return Object(r.g)(e[t.field], t.value);
          case ">":
            return Object(r.i)(e[t.field], t.value);
          case "<":
            return Object(r.j)(e[t.field], t.value);
          case "!==":
            return Object(r.k)(e[t.field], t.value);
          default:
            return !1
        }
      }
      sort(t, e) {
        const n = t.orderBy;
        return Object(r.o)(n) && e.sort((t, e) => this.compareOn(n)(t, e)), e
      }
      compareOn(t) {
        const e = t.attribute,
          n = 0 === t.direction ? -1 : 1;
        return function(t, r) {
          return t[e] < r[e] ? n : t[e] > r[e] ? -n : 0
        }
      }
      execute(t) {
        const e = [];
        this.each(n => {
          t.criteria.every(t => this.match(t, n)) && e.push(n)
        });
        const n = {
          status: 1
        };
        switch (t.type) {
          case 1:
            n.resultSet = this.sort(t, e);
            break;
          case 0:
            e.forEach(this.remove)
        }
        return n.status = 2, n
      }
    } {
      constructor(t) {
        super(), this.bids = [], this.expiredBidIds = [], this.auctionId = Object(b.b)(), this.expectedResponses = t, this.arrivedResponses = 0
      }
      get id() {
        return this.auctionId
      }
      get pendingResponses() {
        return this.expectedResponses - this.arrivedResponses
      }
      get expiredBids() {
        return this.bids.filter(t => this.expiredBidIds.includes(t.id))
      }
      add(t) {
        return this.bids.push(t), this.arrivedResponses += 1, this
      }
      remove(t) {
        return this.expiredBidIds.push(t.id), this
      }
      find(t) {
        const e = (new m.a).where("providerId", "===", t).get(),
          n = this.execute(e);
        return Object(r.o)(n.resultSet) && n.resultSet[0] || null
      }
      each(t) {
        this.bids.forEach(e => {
          this.expiredBidIds.includes(e.id) || t.call(null, e, e.id)
        })
      }
    }
    var w = n(7),
      O = n(37),
      y = n(10);
    class E {
      constructor(t, e, n = null, r) {
        this.shouldReplaceGdprMacro = "0", this.resource = e, this.bidToRender = t, this.internalRunner = n, this.auctioneer = r
      }
      getBidMacroMap() {
        return new O.a("%%([A-Za-z_]+)%%").input("%%ORIGINAL_CPM%%", this.bidToRender.originalCpm.toString()).input("%%BID_PRICE%%", this.bidToRender.originalCpm.toString()).input("%%ADJUST_PRICE%%", this.bidToRender.cpm.toString())
      }
      getYbncaBidMacroMap() {
        return new O.a("[$]{([A-Za-z_]+)}").input("${ogbid}", this.bidToRender.originalCpm.toString()).input("${bid}", this.bidToRender.originalCpm.toString()).input("${dms_strategy}", this.bidToRender.get("strat") || "").input("${pbnet}", this.bidToRender.publisherNet.toString()).input("${sc_ogbdp}", Object(r.o)(this.internalRunner) ? this.internalRunner.originalCpm.toString() : "0.0").input("${ddiv}", this.bidToRender.get("dfpDId")).input("${acid}", this.auctioneer.auctionId)
      }
      getAuctionPriceMacroMap() {
        const t = c.f.getConfigOf(this.bidToRender.providerId).get("pm");
        return new O.a("[$]{([A-Za-z_]+)}").input(t, this.bidToRender.originalCpm.toString())
      }
      static getGdprMacroMap() {
        return new O.a("[$]{([A-Za-z]+)}").input("${GDPR}", y.a.isApplicable() ? "1" : "0")
      }
      replaceGdprConsent() {
        const t = new RegExp("\\${GDPR_CONSENT_[0-9]+}", "g"),
          e = this.resource.match(t),
          n = new O.a("[$]{([A-Za-z_]+[0-9]+)}");
        return Object(r.o)(e) && n.input(e[0], y.a.consent || ""), n
      }
      replaceAuctionPriceMacro() {
        return this.resource = this.getAuctionPriceMacroMap().resolveMacros(this.resource, !1), this
      }
      replaceBidPriceMacros() {
        return this.resource = this.getBidMacroMap().resolveMacros(this.resource, !1), this
      }
      replaceYbncaMacros() {
        return this.resource = this.getYbncaBidMacroMap().resolveMacros(this.resource, !1), this
      }
      replaceGdprMacrosIfApplicable() {
        return "1" !== this.shouldReplaceGdprMacro || (this.resource = E.getGdprMacroMap().resolveMacros(this.resource, !1), this.resource = this.replaceGdprConsent().resolveMacros(this.resource, !1)), this
      }
      Resource() {
        return this.resource
      }
    }

    function j(t) {
      const e = t.renderedBid;
      if (!Object(r.o)(e)) return;
      let n = null;
      const s = d.locator.resolve("auctionhelper");
      Object(r.o)(s) && (n = s.getSecondWinner(t) || null), e.set("dfpDId", t.placementSubmitted.domReference || ""), e.set("lpx", function(t, e) {
        const n = t.get("lpx");
        if (!Object(r.o)(n)) return;
        return n.map(n => new E(t, n, null, e).replaceAuctionPriceMacro().replaceBidPriceMacros().replaceGdprMacrosIfApplicable().Resource())
      }(e, t)), e.set("adc", function(t, e, n) {
        return new E(t, t.adcode, e, n).replaceAuctionPriceMacro().replaceBidPriceMacros().replaceGdprMacrosIfApplicable().replaceYbncaMacros().Resource()
      }(e, n, t)), e.set("bd", function(t, e, n) {
        return new E(t, t.get("bd") || "", e, n).replaceAuctionPriceMacro().replaceBidPriceMacros().replaceYbncaMacros().Resource()
      }(e, n, t))
    }
    var S = n(99),
      I = n(57);

    function C(t, e, n) {
      return e.filter(e => !(e => t.some(t => t === e.id))(e)).map(t => {
        const e = (new s.a).create().status(4).setEntityProperties(t, n).setDummyBidProperties(t, n, 15).build();
        return e.set("bidFrom", "cache"), e
      })
    }
    class A {
      constructor() {
        this.collection = []
      }
      add(t) {
        this.collection.push(t)
      }
      getFinalFloor() {
        return this.collection.sort(A.bidFloorSorter), this.collection[0]
      }
      static bidFloorSorter(t, e) {
        return e.rp - t.rp
      }
    }
    const P = new class {
      get(t) {
        const e = d.locator.resolve("clientconfigrule"),
          n = {
            rp: 0,
            src: "4"
          };
        if (!Object(r.o)(e) || !Object(r.o)(e.getRule()) || !Object(r.o)(t)) return n;
        const s = t,
          i = e.getRule().floorPriceMap;
        return i[s] && (n.rp = i[s]), n
      }
    };
    const R = new class {
      get(t) {
        const e = t,
          n = e.id,
          s = e.floorPrice,
          i = {
            rp: 0,
            src: "1"
          };
        return !Object(r.o)(s) || s <= 0 || (i.rp = o.a.adjustFloor(n, s)), i
      }
    };

    function T(t) {
      const e = {};
      return t.placementConfig.floorRules.each((t, n) => {
        e[n] = function(t, e) {
          const n = new A,
            r = R.get(t),
            s = P.get(e);
          return n.add(r), n.add(s), n.getFinalFloor()
        }(t, n)
      }), e
    }
    class x {
      constructor(t, e, n, r, s = -1) {
        this.auctionEndReason = -1, this.auctionStatus = 0, this.observers = [], this.timeout = -1, this.isAWFired = !1, this.isRenderingStarted = !1, this.auctionEndCallback = () => {}, this.processingAdQuality = {}, this.used = !1, this.timeout = s, this.placement = n, this.participants = r, this.impression = e, this.serialNo = t, this.auction = new v(r.length)
      }
      getParticipantsWithoutBids() {
        const t = this.bids,
          e = e => t.some(t => t.providerId === e.id);
        return this.participants.filter(t => !e.call(this, t))
      }
      checkAndExecutePreAuctionEndEvents(t) {
        if (2 !== t) return;
        var e, n;
        (e = this.getParticipantsWithoutBids(), n = this.serialNo, e.map(t => {
          const e = d.locator.resolve("providerstore" + t.id);
          if (Object(r.o)(e)) return e.getBid(n)
        }).filter(r.o)).forEach(t => this.onBidReceived(t))
      }
      notifyObserver(t, e) {
        try {
          switch (t) {
            case 0:
              break;
            case 1:
              e.onAuctionStart(this);
              break;
            case 2:
              e.onAuctionEnd(this);
              break;
            case 5:
              e.onAuctionRendered(this);
              break;
            case 3:
              e.onAuctionUsed(this);
              break;
            case 4:
              e.onAuctionFreeze(this)
          }
        } catch (t) {
          Object(w.c)(t)
        }
      }
      set auctionState(t) {
        t > this.auctionStatus && (this.checkAndExecutePreAuctionEndEvents(t), this.auctionStatus = t, 2 === this.auctionStatus && (d.metrics.markEnd("actltime_" + this.auctionId), this.auctionEndCallback(this)), this.observers.forEach(e => this.notifyObserver(t, e)))
      }
      get auctionState() {
        return this.auctionStatus
      }
      set isAuctionWinnerPixelFired(t) {
        this.isAWFired = t
      }
      get isAuctionWinnerPixelFired() {
        return this.isAWFired
      }
      set renderStarted(t) {
        this.isRenderingStarted = t
      }
      get renderStarted() {
        return this.isRenderingStarted
      }
      get acceptingBids() {
        return 1 === this.auctionStatus
      }
      get type() {
        throw new Error("Method not implemented.")
      }
      get auctionId() {
        return this.auction.id
      }
      get auctionSerial() {
        return this.serialNo
      }
      get auctionStrategyName() {
        return this.strategyName
      }
      get maxTime() {
        return this.timeout
      }
      set maxTime(t) {
        this.timeout = t
      }
      get impressionSubmitted() {
        return this.impression
      }
      get placementSubmitted() {
        return this.placement
      }
      get bids() {
        return this.select((new m.a).get())
      }
      getAuctionEndReason() {
        return this.auctionEndReason
      }
      getRemovedBidsWithProperties() {
        const t = this.auction.expiredBids;
        return t.forEach(t => {
          t.set("rbr", 1), t.set("s", 8)
        }), t
      }
      get getAllBids() {
        const t = this.bids,
          e = this.getRemovedBidsWithProperties(),
          n = n => t.concat(e).some(t => t.providerId === n.id);
        let r = [];
        return Object(I.d)() || (r = this.participants.filter(t => !n.call(this, t)).map(t => {
          const e = this.processingAdQuality[t.id] ? 1209 : 1207;
          return (new s.a).create().status(3).setEntityProperties(t, this.placement.placementConfig).setDummyBidProperties(t, this.placement.placementConfig, e).build()
        })), [...r, ...e, ...t]
      }
      get renderedBid() {
        return this.bidRendered
      }
      addToAplog(t) {
        Object(I.d)() && this.used && d.log.addEvent("ap", {
          data: {
            auctioneer: this,
            bids: [t]
          }
        })
      }
      onBidReceived(t) {
        this.acceptingBids || (1 === t.get("s") ? t.set("s", 5) : t.set("s", 6), this.addToAplog(t)), t = o.a.applyRevContract(t), this.auctionState < 2 && this.auction.add(t), 0 === this.auction.pendingResponses && (this.auctionState = 2, this.auctionEndReason = 2)
      }
      onEnd(t) {
        Object(r.h)(t) && (this.auctionEndCallback = t)
      }
      onRequestRejected(t) {
        const e = t.reason,
          n = (new s.a).create().setEntityProperties(t.provider, t.placement).status(7).setDummyBidProperties(t.provider, t.placement, e).build();
        this.auction.add(n), 0 === this.auction.pendingResponses && (this.auctionState = 2, this.auctionEndReason = 2)
      }
      start() {
        this.auctionState = 1, d.metrics.markStart("actltime_" + this.auctionId);
        const t = this.useBidReserve(this.placement, this.participants);
        let e = this.participants.filter(e => !t.includes(e.id));
        if (0 === this.timeout) {
          const s = [...t, ...(n = e, n.map(t => t.isDefault ? t.id : void 0).filter(r.o))];
          e = function(t) {
            return t.filter(t => t.isDefault)
          }(e), C(s, this.participants, this.placement.placementConfig).forEach(t => this.onBidReceived(t))
        }
        var n;
        this.requestBids(e), this.setTimeoutToCloseAuction()
      }
      requestBids(t) {
        const e = T(this.placement);
        (function(t, e, n, r) {
          return f(t, e, n, r)
        })(this.impression, this.placement, t, e).map(t => {
          t.then(t => this.doAdQuality(t).then(t => {
            this.setBidRetrievedFrom(t, "headerBid").onBidReceived(t)
          })).catch(t => this.onRequestRejected(t))
        })
      }
      setTimeoutToCloseAuction() {
        this.timeout < 0 || setTimeout(() => {
          this.auctionState = 2, this.auctionEndReason = 1
        }, this.timeout)
      }
      useBidReserve(t, e) {
        const n = d.locator.resolve("bidreserveservice");
        if (!Object(r.o)(n)) return [];
        const s = e.map(t => t.id);
        return n.getBids(t.id, s).map(t => (this.setBidRetrievedFrom(t, "cache").onBidReceived(t), t.providerId))
      }
      setBidRetrievedFrom(t, e) {
        return t.set("bidFrom", e), this
      }
      doAdQuality(t) {
        return new Promise(e => {
          const n = d.locator.resolve("adqualityservice");
          Object(r.o)(n) && n.isRequired(t) ? (this.processingAdQuality[t.providerId] = !0, n.check(t, (n, r) => {
            if (this.processingAdQuality[t.providerId] = !1, 0 === n) {
              const e = "PROCESSING_ERROR" === r ? 63 : 32;
              t.set("s", 2).set("nbr", e)
            }
            e(t)
          })) : e(t)
        })
      }
      requestClose() {
        return this.auctionState >= 2 || (this.auctionState = 2, this.auctionEndReason = 1), !0
      }
      filterBidsOnQuery(t) {
        if (this.acceptingBids) throw new Error("Auction end pending");
        const e = this.select(t);
        return 0 === e.length ? null : e
      }
      getAuctionStrategy(t) {
        return this.strategyName = function(t) {
          let e = "cpm";
          return t.forEach(t => {
            Object(r.o)(t.dms) && (e = "dms")
          }), e
        }(t), S.a.resolve(this.strategyName)
      }
      closeAuction(t) {
        const e = this.getAuctionStrategy(t),
          n = e.closeAuction(t);
        return function(t, e) {
          e.runPostAuctionClose(t)
        }(n, e), n
      }
      getWinnerOf(t) {
        const e = this.filterBidsOnQuery(t);
        return Object(r.o)(e) ? this.closeAuction(e)[0] : null
      }
      getTopN(t, e) {
        const n = this.filterBidsOnQuery(t);
        return Object(r.o)(n) ? this.closeAuction(n).slice(0, e) : []
      }
      getBidToRender(t) {
        if (this.acceptingBids) throw new Error("Auction end pending");
        const e = this.getWinnerOf(t);
        return Object(r.o)(e) ? (this.bidRendered = e, j(this), e) : null
      }
      fireBidExpiryLog(t) {
        const e = {
          auctionId: this.auction.id
        };
        d.log.addEvent("exp", {
          data: {
            bidExpiryLogMetadata: e,
            bids: t
          }
        }, !0)
      }
      removeExpiredBids(t) {
        t.forEach(t => this.auction.remove(t))
      }
      filterExpiredBids(t) {
        const e = t.filter(t => i.a.hasExpired(t) && 1 === t.status);
        return 0 !== e.length && (this.fireBidExpiryLog(e), this.removeExpiredBids(e)), t.filter(t => !i.a.hasExpired(t))
      }
      select(t) {
        const e = this.auction.execute(t);
        return Object(r.o)(e.resultSet) ? this.auctionStatus >= 4 ? e.resultSet : this.filterExpiredBids(e.resultSet) : []
      }
      observe(t) {
        this.observers.push(t), this.notifyObserver(this.auctionState, t)
      }
    }
    class D {
      forPlacement(t) {
        return this.placement = t, this
      }
      forImpression(t) {
        return this.impression = t, this
      }
      participants(t) {
        return this.auctionParticipants = t, this
      }
      newTimeboundAuction(t, e) {
        return this.timeout = e, this.serialNo = t, this
      }
      newCloseableAuction(t) {
        return this.serialNo = t, this
      }
      done() {
        if (!Object(r.o)(this.auctionParticipants)) throw new Error("No Participants Mapped");
        if (!Object(r.o)(this.placement)) throw new Error("No Placement Mapped");
        if (!Object(r.o)(this.impression)) throw new Error("No Impression Mapped");
        return Object(r.o)(this.timeout) ? new x(this.serialNo, this.impression, this.placement, this.auctionParticipants, this.timeout) : new x(this.serialNo, this.impression, this.placement, this.auctionParticipants)
      }
    }
    class _ {
      constructor(t) {
        this.properties = new b.a(t)
      }
      get config() {
        return this.properties.get("config")
      }
      get ivar() {
        return this.properties.get("ivar")
      }
      get pmeta() {
        return this.properties.get("pmeta")
      }
    }
    const M = Object(b.c)(_, [{
        "config": {
          "in:tm": true,
          "in:tb": true
        },
        "ivar": {
          "ex:publisherUrl:regex": "com_aax_test=all"
        }
      }, {
        "config": {
          "in:pvid": ["89", "90", "128"]
        }
      }, {
        "config": {
          "in:pvid": ["20", "25", "28", "41", "44", "54", "62", "65", "70", "73", "75", "76", "79", "80", "85", "87", "88", "96", "107", "109", "115", "116", "118", "2004", "2008", "2009"]
        },
        "ivar": {
          "in:gdpr": "1"
        }
      }], new Array),
      k = Object(b.c)(_, [{
        "config": {
          "in:prf": false
        }
      }, {
        "config": {
          "in:tb": true,
          "in:tm": true
        },
        "ivar": {
          "ex:publisherUrl:regex": "com_aax_test=all"
        }
      }, {
        "config": {
          "in:pvid": ["89", "90", "128"]
        }
      }, {
        "config": {
          "in:pvid": ["20", "25", "28", "41", "44", "54", "62", "65", "70", "73", "75", "76", "79", "80", "85", "87", "88", "96", "107", "109", "115", "116", "118", "2004", "2008", "2009"]
        },
        "ivar": {
          "in:gdpr": "1"
        }
      }], new Array);

    function L(t, e) {
      return function(t, e) {
        const n = [],
          s = t.placementConfig;
        return s.providersMapped.each((i, o) => {
          const a = c.f.getConfigOf(o),
            u = {
              crid: s.id,
              ecc: i.get("ecc"),
              egp: a.get("egp"),
              prf: i.get("prf"),
              pvid: o,
              tb: a.get("tb"),
              tm: i.get("tm")
            };
          ("headerBid" === e.type ? M : k).some(n => function(t, e, n, s) {
            const i = [];
            Object(r.o)(t.config) && i.push(N(e, t.config));
            Object(r.o)(t.pmeta) && i.push(N(n, t.pmeta));
            Object(r.o)(t.ivar) && i.push(N(s, t.ivar));
            return !i.some(t => !t)
          }(n, u, t, e)) || function(t) {
            if (window.aax && Object(r.h)(window.aax.isProviderDisabled)) return window.aax.isProviderDisabled(t);
            return !1
          }(o) || n.push(a)
        }), n
      }(t, e)
    }

    function N(t, e) {
      return Object.keys(e).some(n => function(t, e, n) {
        const [s, i] = e.split(":"), o = function(t, e, n, s) {
          const i = t[e],
            o = n[s],
            c = s.includes(":regex"),
            a = t => {
              if (Object(r.p)(t) && c) {
                return new RegExp(t).test(i)
              }
              return t === i
            };
          if (Object(r.e)(o)) return o.some(a);
          return a(o)
        }(t, i, n, e);
        if ("in" === s) return o;
        return !o
      }(t, n, e))
    }
    var B = n(17);
    const F = new class {
      constructor() {
        this.auctionRegistry = new Map, this.auctionsCreated = 0
      }
      getTimeBoundAuction(t, e, n, r) {
        return (new D).newTimeboundAuction(this.auctionsCreated, r).forPlacement(t).forImpression(e).participants(n).done()
      }
      getCloseableAuction(t, e, n) {
        return (new D).newCloseableAuction(this.auctionsCreated).forPlacement(t).forImpression(e).participants(n).done()
      }
      submitAuctionRequest(t, e) {
        return B.a.isActionApplicable("DISABLE_ADS") ? (d.log.addEvent("el", {
          data: {
            name: "ADS_DISABLED"
          }
        }), []) : (t.type = "headerBid", t.placements.map(n => {
          const s = n.placementConfig;
          if (!Object(r.o)(s.providersMapped)) return null;
          const i = L(n, t);
          this.auctionsCreated += 1;
          const o = Object(r.o)(e) ? this.getTimeBoundAuction(n, t, i, e) : this.getCloseableAuction(n, t, i);
          return this.auctionRegistry.set(this.auctionsCreated, o), o
        }).filter(r.o))
      }
      findAuctioneer() {
        return {
          byAuctionId: t => this.findByAuctionId(t),
          byPlacement: t => this.findByPlacement(t),
          bySerial: t => this.findBySerial(t)
        }
      }
      findByPlacement(t) {
        return this.findAuctionBy(t => t.placementSubmitted.id, t)
      }
      findBySerial(t) {
        return this.auctionRegistry.get(t) || null
      }
      findByAuctionId(t) {
        return this.findAuctionBy(t => t.auctionId, t)
      }
      findAuctionBy(t, e) {
        let n = null;
        return this.auctionRegistry.forEach(s => {
          t(s) !== e || Object(r.o)(n) || (n = s)
        }), n
      }
      findAuctioneers() {
        return {
          byPlacement: t => this.filterByPlacement(t),
          guaranteed: () => this.filterByGuaranteedFlag()
        }
      }
      filterByPlacement(t) {
        return this.filterAuctionBy(t => t.placementSubmitted.id, t)
      }
      filterByGuaranteedFlag() {
        return this.filterAuctionBy(t => t.placementSubmitted.placementConfig.guaranteed, !0)
      }
      filterAuctionBy(t, e) {
        const n = [];
        return this.auctionRegistry.forEach(r => {
          t(r) === e && n.push(r)
        }), n
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    })), n.d(e, "b", (function() {
      return i
    })), n.d(e, "d", (function() {
      return o
    })), n.d(e, "c", (function() {
      return c
    }));
    var r = n(5);

    function s() {
      return Object(r.c)(0, 254) + "." + Object(r.c)(0, 254) + "." + Object(r.c)(0, 254) + "." + Object(r.c)(0, 254)
    }
    const i = t => {
        const e = t.split(".");
        return 256 * (256 * (256 * +e[0] + +e[1]) + +e[2]) + +e[3]
      },
      o = t => {
        const e = t.split(".");
        return 4 !== e.length ? s() : (e[3] = "0", e.join("."))
      },
      c = t => {
        const [e] = t.split(":");
        return e
      }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "b", (function() {
      return i
    })), n.d(e, "c", (function() {
      return o
    })), n.d(e, "a", (function() {
      return c
    }));
    var r = n(0);
    let s = {};

    function i(t, e) {
      s[t] = e
    }

    function o(t) {
      Object(r.q)(t) && delete s[t]
    }

    function c(t) {
      return s[t]
    }
  }, function(t, e) {
    t.exports = function(t) {
      return "object" == typeof t ? null !== t : "function" == typeof t
    }
  }, function(t, e, n) {
    var r = n(91),
      s = Math.min;
    t.exports = function(t) {
      return t > 0 ? s(r(t), 9007199254740991) : 0
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return o
    })), n.d(e, "c", (function() {
      return c
    })), n.d(e, "d", (function() {
      return a
    })), n.d(e, "b", (function() {
      return u
    }));
    var r = n(0),
      s = n(4);

    function i(t) {
      return Object(r.o)(t) && Object(r.o)(s.b.get(t)) && (1 === s.b.get(t) || !0 === s.b.get(t))
    }

    function o() {
      return i("frRqLn")
    }

    function c() {
      return i("resetApi")
    }

    function a() {
      return i("disTimoutAp")
    }

    function u() {
      return i("hta")
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return c
    }));
    var r = n(68),
      s = n(29),
      i = n(0);
    class o extends r.a {
      constructor(t) {
        super(t)
      }
      isApplicable() {
        return !!this.isEnforcementEnabled() && !(!this.blanketConsent && !this.isCoppaApplicableByDefault())
      }
      setBlanketConsent(t) {
        this.blanketConsentFlag = t, this.consentString = t ? "Y" : "N", this.setFinalConsent()
      }
      setConsent(t) {}
      setFinalConsent() {
        let t = this.consentString;
        this.config.honourPublisher || (t = this.config.defaultConsentString), this.finalConsentString = t, this.emit("cschange", this.finalConsent)
      }
      isCoppaApplicableByDefault() {
        if (this.config.honourPublisher) return !1;
        const t = this.config.defaultConsentString;
        return !!Object(i.q)(t) && "Y" === t
      }
    }
    const c = new o(s.a.getConfigOf("coppa"))
  }, function(t, e, n) {
    var r = n(47),
      s = n(132),
      i = n(74),
      o = n(113),
      c = Object.defineProperty;
    e.f = r ? c : function(t, e, n) {
      if (i(t), e = o(e, !0), i(n), s) try {
        return c(t, e, n)
      } catch (t) {}
      if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
      return "value" in n && (t[e] = n.value), t
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(6),
      s = n(1);
    class i extends r.a {
      constructor(t, e) {
        super(t), this.auctioneer = e
      }
      calculateTotalTime() {
        const t = this.auctioneer.auctionId;
        let e = -1;
        return void 0 !== t && (e = s.metrics.measure("actltime_" + t)), e
      }
      getAll() {
        return this.decoratorItem.getAll().set("dflg", this.auctioneer.auctionId).set("dvwdw", this.auctioneer.auctionStrategyName).set("dxPaWp", this.auctioneer.maxTime).set("dfwowlph", this.calculateTotalTime())
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return c
    }));
    var r = n(6),
      s = n(0),
      i = n(4),
      o = n(77);
    class c extends r.a {
      constructor(t, e) {
        super(t), this.bid = e
      }
      getAll() {
        if (!Object(s.o)(this.bid.providerId)) return this.decoratorItem.getAll();
        const t = this.getAuditConfig(),
          e = t.getProviderShare(this.bid.get("seat")),
          n = this.decoratorItem.getAll();
        return n.set("dgm1", t.discrepancyShare).set("dgm0", e).set("dgm2", t.publisherShare), "3" === this.bid.providerId && n.set("dgm3", this.bid.get("pfsh") || 0), n
      }
      getAuditConfig() {
        if ("3" === this.bid.providerId) {
          const t = {
            csh: this.bid.get("csh") || 0,
            dsh: this.bid.get("dsh") || 0,
            id: "3",
            psh: this.bid.get("psh") || 0,
            ssh: {}
          };
          return new o.a(t)
        }
        return i.a.getConfigOf(this.bid.providerId)
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(6);
    class s extends r.a {
      constructor(t, e) {
        super(t), this.bid = e
      }
      getAll() {
        return this.decoratorItem.getAll().set("egs", this.bid.get("bdp") || "0").set("fsp", this.bid.cpm || "0").set("fegs", this.bid.get("cbdp") || "0").set("gisEg", this.bid.get("dfBd") || "0")
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return o
    }));
    var r = n(6),
      s = n(1),
      i = n(0);
    class o extends r.a {
      constructor(t, e) {
        super(t), this.bid = e
      }
      calculateLTime() {
        const t = this.bid.get("sspRequestId"),
          e = this.bid.get("cPvRqId"),
          n = this.bid.get("crid"),
          r = this.bid.get("pvid"),
          o = Object(i.q)(t) ? t : e;
        return s.metrics.measure("ltime_" + o + n + r)
      }
      getAll() {
        return this.decoratorItem.getAll().set("dgyLg", this.bid.get("adId")).set("dgyQp", this.bid.get("adNm")).set("syDjQp", this.bid.get("pvAgNm")).set("syDjLg", this.bid.get("pvAgId")).set("dgyXuo", this.bid.get("adUrl")).set("ed", this.bid.bidAge).set("suvsw", this.bid.get("bidFor")).set("dfw", this.bid.get("bidFrom") || "").set("przaUhtLg", this.bid.get("cPvRqId")).set("fnio", this.bid.get("ckfl") || "").set("fv", this.bid.get("cs")).set("fulg", this.bid.placementId).set("lxuo", this.bid.get("iurl")).set("gl", this.bid.get("di")).set("gw", this.bid.get("dt")).set("gei", this.bid.get("dbf")).set("hsf", this.bid.get("epc")).set("selgiou", this.bid.get("bidflr")).set("eiv", this.bid.get("bfs")).set("qeu", this.bid.get("nbr")).set("rjegs", this.bid.originalCpm).set("suyDffLg", this.bid.get("paId")).set("sfulg", this.bid.get("pcrid")).set("vlch", this.bid.get("size")).set("v", this.bid.get("s")).set("vqp", this.bid.statusName).set("wrfrqvlghu", this.bid.get("tc") || "1").set("pqhw_fnio", this.bid.get("vcfl")).set("ueu", this.bid.get("rbr")).set("owlph", this.calculateLTime())
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return o
    }));
    var r = n(6),
      s = n(0),
      i = n(17);
    class o extends r.a {
      constructor(t, e) {
        super(t), this.bid = e
      }
      getBidAge(t) {
        return Object(s.o)(t) ? Date.now() - t : -1
      }
      getProviderCookieId(t) {
        return i.a.isActionApplicable("STOP_SENDING_PII") ? "0000EEA" : t
      }
      getAll() {
        const t = this.bid.get("uid");
        return this.decoratorItem.getAll().set("dev", this.bid.get("ab")).set("dslg", this.bid.get("apid")).set("beqfd_eelg", this.bid.get("bbid") || "").set("elqirelg", this.bid.get("binb")).set("egdwd", this.bid.get("bd")).set("eLg", this.bid.get("byId")).set("fpslg", this.bid.get("cmpid")).set("fdw", this.bid.get("cat")).set("dwwu", this.bid.get("attr")).set("gwf", this.bid.get("dtc")).set("vwuj", this.bid.get("strat") || "").set("suyUhtLg", this.bid.get("ePvRqId")).set("beqfd_husp", this.bid.get("erpm") || "").set("has", this.bid.get("exp")).set("beqfd_jelg", this.bid.get("gbid")).set("kwsv", this.bid.get("htps")).set("sdwlqw", this.bid.get("patint")).set("sdwnhb", this.bid.get("patkey")).set("isxUht", this.bid.get("fpURq") || "").set("suyDslLg", this.bid.get("prvApiId") || "").set("ps_vhj", this.bid.get("mpSeg") || []).set("sfLg", this.getProviderCookieId(t)).set("syQeu", this.bid.get("pvNbr") || "").set("syQeuGwov", this.bid.get("pvNbrDtls")).set("svhdw", this.bid.get("pseat")).set("uwlph", this.bid.get("rt")).set("vhdw", this.bid.get("seat")).set("vegulg", this.bid.get("sbdrid")).set("wg", this.bid.get("td")).set("beqfd_yelg", this.bid.get("vbid") || "").set("zvls", this.bid.get("wsip"))
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(6),
      s = n(0);
    class i extends r.a {
      constructor(t, e) {
        super(t), this.bid = e
      }
      getAll() {
        return Object(s.o)(this.bid) ? this.decoratorItem.getAll().set("vvsUht", this.bid.get("sspRequestId")).set("fvls", this.bid.get("sspSvrName")).set("vvsUhj", this.bid.get("sspRegion")) : this.decoratorItem.getAll()
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(1);
    const s = {
      register(t) {
        r.locator.register(t.type + t.name, t)
      },
      resolve: (t, e) => r.locator.resolve(e + t)
    }
  }, function(t, e, n) {
    "use strict";
    var r = n(77),
      s = n(5),
      i = n(4);
    n(36), n(0), n(14);

    function o(t, e) {
      return e && (t -= t * e / 100), t
    }

    function c(t, e) {
      const n = e.originalCpm,
        r = e.get("seat"),
        i = o(n, t.getProviderShare(r)),
        c = o(i, t.discrepancyShare),
        a = o(c, t.publisherShare);
      e.set("bdp", Object(s.a)(c)), e.set("cbdp", Object(s.a)(a)), e.set("cpm", Object(s.a)(a)), e.set("dfBd", Object(s.a)(a)), e.set("clp", Object(s.a)(a)), t.isExcluded && (e.set("bdp", "0"), e.set("cbdp", "0"))
    }

    function a(t) {
      return 1 - t / 100
    }
    e.a = {
      adjustFloor: function(t, e) {
        const n = function(t) {
            const e = {},
              n = i.a.getConfigOf(t);
            return e.pvsh = a(n.providerShare), e.dpsh = a(n.discrepancyShare), e.rvsh = a(n.publisherShare), e
          }(t),
          r = (o = e, (!isFinite(o) || isNaN(o) ? 0 : o) / (n.pvsh * n.dpsh * n.rvsh));
        var o;
        return parseFloat(Object(s.a)(r))
      },
      applyRevContract: function(t) {
        const e = t.providerId;
        return t.get("dt"), c(i.a.getConfigOf(e), t), t
      },
      applyRevContractWithConfig: function(t, e) {
        return c(new r.a(t), e), e
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return o
    }));
    var r, s = n(27);
    ! function(t) {
      t.DISABLED = "0", t.ENABLED = "1"
    }(r || (r = {}));
    var i = n(0);
    class o extends s.a {
      constructor(t) {
        super(), this.consentString = "", this.finalConsentString = "", this.config = t
      }
      isEnforcementEnabled() {
        return this.config.enforcementEnabled
      }
      get blanketConsent() {
        return this.blanketConsentFlag
      }
      set blanketConsent(t) {
        Object(i.o)(t) && Object(i.f)(t) && this.setBlanketConsent(t)
      }
      get consent() {
        return this.consentString
      }
      set consent(t) {
        this.setConsent(t)
      }
      get finalConsent() {
        return this.finalConsentString
      }
      get finalConsentIndex() {
        const t = this.getConsentStateConfig(this.finalConsent);
        if (Object(i.o)(t)) return t.idx
      }
      getConsentStateConfig(t) {
        return this.config.consentStates.find(e => e.cstr === t)
      }
      isPrivacyUser() {
        return this.config.cookieValue === r.ENABLED
      }
    }
  }, function(t, e, n) {
    "use strict";
    var r = n(0),
      s = n(2),
      i = (n(94), n(71));
    const o = [i.b, i.c, function(t) {
      const e = {
          ".aol.": "query",
          ".google.": "q",
          "ask.com": "q",
          "bing.com": "q",
          "search.yahoo.com": "p"
        },
        {
          url: n,
          hash: s,
          query: o
        } = Object(i.a)(t),
        c = (s + "&" + o).split("&"),
        [a] = Object.keys(e).filter(t => -1 !== n.indexOf(t));
      return Object(r.o)(a) ? (c.filter(t => 0 === t.indexOf(e[a] + "=")), 0 === c.length ? n : n + "?" + c.join("&")) : n
    }];
    var c = n(8);

    function a(t) {
      return Object(r.o)(t) && /\/advertpro|fastclick\.net|openx\.com|rubiconproject\.com|yieldmanager|doubleclick|\/adi\/|\/ad\/|ad_terra|banner\.php|\/web_banners\/|admeld\.com|atdmt\.com|247realmedia\.com|\/ads\.|\/ad\.|\/ad\?|\/ads\/|adsframe|medianet\.php|zedo\.com|\/adsframe\/|a1\.interclick\.com|otcads\.com|delivery\.huddler\.com|adserver\.duetads\.com|anchorfree\.com|rss2search\.com|ib\.adnxs\.com|delivery\/|\.microsoftadvertisingexchange\.|\.googleusercontent\.com|sharethrough\.com/i.test(t)
    }
    const u = function() {
        let t = function() {
          if (Object(r.q)(window.window.aaxReferrerURL)) return window.window.aaxReferrerURL
        }();
        if (Object(r.o)(t)) return t;
        t = Object(r.o)(document.referrer) ? document.referrer : "";
        const e = a(t);
        if (!Object(s.p)()) return e ? "" : t;
        try {
          const t = function t(e) {
            try {
              if (!Object(r.o)(e.location.href)) return null;
              if (e == window.top || !Object(r.o)(e.parent)) return e;
              const n = t(e.parent);
              return null !== n && (e = n), e
            } catch (t) {
              return null
            }
          }(window);
          if (!Object(r.o)(t)) return "";
          const e = t.document.referrer;
          return Object(r.o)(e) && !a(e) ? e : ""
        } catch (t) {
          return ""
        }
      }(),
      d = Object(c.c)(u),
      l = Object(c.h)(u),
      h = (g = u, Object(r.o)(g) ? o.reduce((t, e) => e.call(null, t), g) : "");
    var g;
    e.a = {
      cleaned: h,
      domain: d,
      scheme: l,
      url: u
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return c
    })), n.d(e, "b", (function() {
      return a
    }));
    var r = n(0),
      s = (n(14), n(1)),
      i = n(24);
    let o = !0;

    function c() {
      if (window.aax && Object(r.o)(window.aax.getPageCategory) && Object(r.h)(window.aax.getPageCategory)) return window.aax.getPageCategory()
    }

    function a() {
      if (window.aax && Object(r.o)(window.aax.setMedianetDms) && Object(r.h)(window.aax.setMedianetDms)) return window.aax.setMedianetDms()
    }
    i.a.on("lgTrigger", () => function() {
      if (!o) return;
      if (!(window.aax && Object(r.o)(window.aax.fireCustomErrorLog) && Object(r.h)(window.aax.fireCustomErrorLog))) return void(o = !1);
      const t = window.aax.fireCustomErrorLog();
      Object(r.o)(t) && Object(r.o)(t.message) && (s.log.addEvent("el", {
        data: {
          level: 3,
          name: "CUSTOM_ERROR",
          stack: t.message
        }
      }), o = !1)
    }(), !1)
  }, function(t, e, n) {
    "use strict";

    function r(t) {
      return t.replace(/\$\{SOURCEURLENC\}|\{pageurl\}|\{SOURCE_URL_ENC\}|\$\{BUYER_LINE_ITEM_ID\}|\$\{CLICKURLENC\}|\$\{PRICE_CENTS\}|\$\{PRICING_TYPE\}|\$\{SECTION_CODE\}|\$\{SITE_CODE\}|\$\{PUBLISHERID\}|\$\{SITEID\}|\$\{SECTIONID\}|\$\{VURLID\}|\[admeld_url\]/g, "")
    }

    function s(t) {
      return t.toLowerCase()
    }

    function i(t) {
      const e = t.indexOf("#"),
        n = t.indexOf("?");
      let r = "",
        s = "";
      return -1 === e && -1 === n || (e > 0 && (s = t.substring(e + 1), t = t.substring(0, e)), n > 0 && (r = t.substring(n + 1), t = t.substring(0, n))), {
        hash: s,
        query: r,
        url: t
      }
    }
    n.d(e, "b", (function() {
      return r
    })), n.d(e, "c", (function() {
      return s
    })), n.d(e, "a", (function() {
      return i
    }))
  }, function(t, e, n) {
    "use strict";
    var r;
    n.d(e, "b", (function() {
        return r
      })), n.d(e, "a", (function() {
        return s
      })),
      function(t) {
        t.AUCTION_PRESSURE = "auction_pressure", t.DISABLED = "disabled", t.SCAVENGE = "scavenge"
      }(r || (r = {}));
    const s = {
      DEVICE_TYPE: "dtype",
      HOSTNAME: "hostname",
      PROVIDER_ID: "pid",
      SIZE: "size",
      SLOTNAME: "slotName"
    }
  }, function(t, e, n) {
    var r = n(47),
      s = n(59),
      i = n(110);
    t.exports = r ? function(t, e, n) {
      return s.f(t, e, i(1, n))
    } : function(t, e, n) {
      return t[e] = n, t
    }
  }, function(t, e, n) {
    var r = n(55);
    t.exports = function(t) {
      if (!r(t)) throw TypeError(String(t) + " is not an object");
      return t
    }
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "mdom", (function() {
      return a
    }));
    var r = n(27),
      s = n(0),
      i = n(8),
      o = n(2);
    class c extends r.a {
      constructor() {
        super(...arguments), this.onDOMLoadCallbackList = [], this.domReady = !1
      }
      dequeueSafe() {
        for (this.domReady = !0; this.onDOMLoadCallbackList.length > 0;) {
          const t = this.onDOMLoadCallbackList.shift();
          if (!Object(s.o)(t)) return;
          t.call(null)
        }
        this.onDOMLoadCallbackList = []
      }
      loadAfterDOMLoad(t, e) {
        const n = window.document;
        let r = /interactive|complete|loaded/;
        if (n && n.attachEvent && Object(i.d)() <= 10 && (r = /complete|loaded/), r.test(n.readyState)) return void t();
        if (e || Object(o.b)(window, "load", t), !e && n.addEventListener) return void Object(o.b)(n, "DOMContentLoaded", t);
        const s = n.documentElement;
        if (s && s.doScroll) try {
          s.doScroll("left"), t()
        } catch (e) {
          setTimeout(() => this.loadAfterDOMLoad(t, !0), 50)
        }
      }
      onDOMLoad(t) {
        this.onDOMLoadCallbackList.push(t), 1 !== this.onDOMLoadCallbackList.length || this.domReady ? this.domReady && this.dequeueSafe() : this.loadAfterDOMLoad(() => this.dequeueSafe())
      }
      isDOMInteractive() {
        return this.domReady || /interactive/.test(document.readyState)
      }
      hasDOMLoaded() {
        return this.domReady
      }
    }
    const a = new c
  }, function(t, e, n) {
    "use strict";
    var r = n(1),
      s = n(0);
    e.a = new class {
      constructor() {
        this.isStorageAccessible() ? (this.localStorage = window.localStorage, this.length = window.localStorage.length) : (this.localStorage = null, this.length = 0)
      }
      isStorageAccessible() {
        const t = "eclstest";
        try {
          if ("localStorage" in window && null !== window.localStorage) return window.localStorage.setItem(t, t), window.localStorage.removeItem(t), !0
        } catch (t) {
          return !1
        }
        return !1
      }
      setItem(t, e) {
        if (!Object(s.o)(this.localStorage)) return;
        const n = r.locator.resolve("encryptionservice");
        try {
          n ? this.localStorage.setItem(t, n.encode(e)) : this.localStorage.setItem(t, e)
        } catch (t) {
          return
        }
        this.length = this.localStorage.length
      }
      getItem(t) {
        if (!Object(s.o)(this.localStorage)) return null;
        const e = this.localStorage.getItem(t),
          n = r.locator.resolve("encryptionservice");
        try {
          return n ? n.decode(e) : e
        } catch (t) {
          return null
        }
      }
      removeItem(t) {
        Object(s.o)(this.localStorage) && (this.localStorage.removeItem(t), this.length = this.localStorage.length)
      }
      clear() {}
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(12),
      s = n(0);
    class i extends r.a {
      constructor(t) {
        super(t)
      }
      get providerShare() {
        return this.get("psh") || 0
      }
      getProviderShare(t) {
        const e = this.get("ssh");
        return Object(s.o)(e) && Object(s.l)(e[t]) ? e[t] : this.providerShare
      }
      get publisherShare() {
        return 100 - this.get("csh")
      }
      get discrepancyShare() {
        return this.get("dsh") || 0
      }
      get isExcluded() {
        return !0 === this.get("ex")
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(10);
    const s = new class {
      constructor() {
        this.blanketConsentFlag = !1, this.consentPresent = "", this.npaFM = "0", this.consentPresent = "0"
      }
      get blanketConsent() {
        return this.blanketConsentFlag
      }
      set blanketConsent(t) {
        this.consentPresent = "1", this.blanketConsentFlag = t
      }
      get consent() {
        throw new Error("Method not implemented.")
      }
      get finalConsent() {
        return this.consentPresent
      }
      get finalConsentIndex() {
        throw new Error("Method not implemented.")
      }
      getFMValueIfApplicable() {
        return r.a.isApplicable() && "1" === this.npaFM
      }
      isApplicable() {
        return "1" === this.consentPresent ? this.blanketConsent : this.getFMValueIfApplicable()
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return c
    })), n.d(e, "b", (function() {
      return a
    }));
    var r = n(44),
      s = n(0),
      i = n(88),
      o = n(1);

    function c() {
      let t;
      try {
        t = r.a.getItem("aasd") || ""
      } catch (e) {
        t = ""
      }
      const e = Object(s.q)(t) && parseInt(t.split("|")[0], 10) || -1;
      return Math.min(e, 100)
    }

    function a() {
      try {
        let t = "0";
        const e = r.a.getItem("aasd") || "";
        let n = Object(s.q)(e) && parseInt(e.split("|")[1], 10) || 0;
        Object(s.o)(n) && Object(i.b)(n, 15) ? t = e.split("|")[0] : n = Object(i.a)();
        const c = parseInt(t, 10) + 1 + "|" + n,
          a = {
            domain: "",
            path: "/",
            secure: o.app.envProperties.ssl
          };
        r.a.setItem("aasd", c, a)
      } catch (t) {}
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return r
    }));
    class r {
      constructor() {
        this.abpStatus = "0", this.executionStatus = 0
      }
      get name() {
        return this.strategyName
      }
      get abpDetected() {
        return "1" === this.abpStatus
      }
      get isProcessing() {
        return 1 === this.executionStatus || 0 === this.executionStatus
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(0);
    class s {
      constructor(t, e) {
        this.config = t, this.consentProvider = e
      }
      isActionApplicable(t) {
        if (!this.consentProvider.isApplicable()) return !1;
        const e = this.consentProvider.finalConsent,
          n = this.getConsentStateFor(e) || "S99",
          s = this.config.stateActionMap[n];
        return !!Object(r.e)(s) && Object(r.d)(s, t)
      }
      getConsentStateConfig(t) {
        return this.config.consentStates.find(e => e.cstr === t)
      }
      getConsentStateFor(t) {
        const e = this.getConsentStateConfig(t);
        return Object(r.o)(e) ? e.st : ""
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(6);
    class s extends r.a {
      constructor(t, e) {
        super(t), this.auctioneer = e
      }
      getAll() {
        const t = this.auctioneer.impressionSubmitted;
        return this.decoratorItem.getAll().set("vhf", t.section || "").set("fkqo", t.channel)
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(6),
      s = n(0);
    class i extends r.a {
      constructor(t, e) {
        super(t), this.logPrefix = "pa_", this.mLogs = e
      }
      getAll() {
        return Object(s.o)(this.mLogs) ? (Object.keys(this.mLogs).forEach(t => {
          this.decoratorItem.getAll().set(this.logPrefix + t, this.mLogs[t])
        }), this.decoratorItem.getAll()) : this.decoratorItem.getAll()
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(6),
      s = n(0);
    class i extends r.a {
      constructor(t, e) {
        super(t), this.spamLogs = e
      }
      getAll() {
        return Object(s.o)(this.spamLogs) ? this.decoratorItem.getAll().set("vsIvw", this.spamLogs.fst).set("vsVrxufh", this.spamLogs.source).set("vsLvUht", this.spamLogs.isReq).set("vsLyw", this.spamLogs.ivt).set("vsLg", this.spamLogs.id).set("vsWr", this.spamLogs.to) : this.decoratorItem.getAll()
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(6),
      s = n(0);
    class i extends r.a {
      constructor(t, e) {
        super(t), this.pcLogs = e
      }
      getAll() {
        return Object(s.o)(this.pcLogs) ? this.decoratorItem.getAll().set("sjfdwlde2", this.pcLogs.iab2).set("sjfdwlde", this.pcLogs.iab).set("sjfdwvsulj", this.pcLogs.google) : this.decoratorItem.getAll()
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return a
    }));
    var r = n(6),
      s = n(0),
      i = n(1),
      o = n(54);
    const c = {
      isMnetRefresh: "0",
      isSlotInView: 0,
      mnetRefreshCount: 0
    };
    class a extends r.a {
      constructor(t, e) {
        super(t), this.auctioneer = e
      }
      static getMnetRefreshCountFromSlotTargeting(t) {
        if (Object(s.o)(t)) return t.getTargeting("pqui")[0]
      }
      static getRefreshInfoService() {
        return i.locator.resolve("refreshInfoService")
      }
      getDfpSlotFromAuctioneer() {
        const t = this.auctioneer.placementSubmitted.domReference;
        if (!Object(s.o)(t)) return;
        const e = Object(o.a)(t);
        return Object(s.o)(e) ? e.getProp("dfpSlot") : void 0
      }
      getDomReference() {
        return this.auctioneer.placementSubmitted.domReference
      }
      getLoggingInfoForDFPSlot() {
        const t = this.getDfpSlotFromAuctioneer();
        if (!Object(s.o)(t)) return;
        const e = a.getMnetRefreshCountFromSlotTargeting(t);
        return Object(s.o)(e) ? {
          isMnetRefresh: "0" === e ? "0" : "1",
          isSlotInView: this.getSlotIsInViewInfo(),
          mnetRefreshCount: parseInt(e, 10)
        } : void 0
      }
      getLoggingInfo() {
        const t = this.getLoggingInfoForDFPSlot();
        if (Object(s.o)(t)) return t;
        const e = a.getRefreshInfoService(),
          n = this.getDomReference();
        return Object(s.o)(e) && Object(s.o)(n) ? {
          isMnetRefresh: e.isMnetRefresh(n) ? "1" : "0",
          isSlotInView: this.getSlotIsInViewInfo(),
          mnetRefreshCount: e.getMnetRefreshCount(n)
        } : void 0
      }
      getSlotIsInViewInfo() {
        const t = this.getDomReference(),
          e = a.getRefreshInfoService();
        return Object(s.o)(e) && Object(s.o)(t) && e.isSlotInView(t) ? 1 : 0
      }
      getAll() {
        const t = this.getLoggingInfo() || c;
        return this.decoratorItem.getAll().set("pqui", t.isMnetRefresh).set("pquif", t.mnetRefreshCount).set("pqly", t.isSlotInView)
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(6);
    class s extends r.a {
      constructor(t, e) {
        super(t), this.auctioneer = e
      }
      getAll() {
        const t = this.auctioneer.placementSubmitted.refreshCount || 0;
        return this.decoratorItem.getAll().set("wuhi", t > 0 ? "1" : "0").set("uif", t)
      }
    }
  }, function(t, e, n) {
    "use strict";

    function r() {
      return (new Date).getTime()
    }

    function s(t, e) {
      e = 60 * e * 1e3;
      return r() - t < e
    }
    n.d(e, "a", (function() {
      return r
    })), n.d(e, "b", (function() {
      return s
    }))
  }, function(t, e, n) {
    "use strict";

    function r(t) {
      return t.clientWidth * t.clientHeight >= 242e3 ? 1 : 0
    }

    function s(t) {
      switch (r(t)) {
        case 0:
        case 1:
          return 1e3;
        case 2:
          return 2e3;
        default:
          return 1e3
      }
    }
    n.d(e, "a", (function() {
      return r
    })), n.d(e, "b", (function() {
      return s
    }))
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return c
    }));
    var r = n(12),
      s = n(3),
      i = n(22);
    class o extends r.a {
      constructor(t) {
        super(t)
      }
      get apiUrl() {
        return this.get("apiUrl")
      }
      get requestLimit() {
        return this.get("reqLimit")
      }
      get encryptionVersion() {
        return "1" === this.get("needEncryption") ? "1.0" : "0.0"
      }
    }
    const c = Object(s.d)(o, {
      "script": {
        "apiUrl": "https://c.aaxads.com/ssapi/bids",
        "id": "script",
        "reqLimit": 65,
        "needEncryption": "1"
      },
      "stream": {
        "apiUrl": "https://c.aaxads.com/stream/bids",
        "id": "stream",
        "reqLimit": 65,
        "needEncryption": "1"
      }
    }, new i.a)
  }, function(t, e) {
    var n = Math.ceil,
      r = Math.floor;
    t.exports = function(t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t)
    }
  }, function(t, e, n) {
    var r = n(131);
    t.exports = function(t) {
      return Object(r(t))
    }
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "HBClientAdapter", (function() {
      return l
    }));
    var r = n(1),
      s = n(0);
    class i {
      constructor(t, e, n, r, s, i, o, c, a, u) {
        this.local = !1, this.sizesEnabled = [], this.customSizesEnabled = [], this.epbc = "", this.externalPlacementCode = [], this.impressionObject = t, this.placementConfig = e, this.providerConfig = n, this.local = r, this.sizesEnabled = s, this.customSizesEnabled = i, this.epbc = o, this.externalPlacementCode = c, this.reservedPrice = a, this.adTypeId = u
      }
      get impression() {
        return this.impressionObject
      }
      get isLocal() {
        return this.local
      }
      get placement() {
        return this.placementConfig
      }
      get provider() {
        return this.providerConfig
      }
      get sizes() {
        return this.sizesEnabled
      }
      get customSizes() {
        return this.customSizesEnabled
      }
      get externalPublisherCode() {
        return this.epbc
      }
      get epcs() {
        return this.externalPlacementCode
      }
      get bidFloor() {
        return this.reservedPrice
      }
      get memberId() {
        return ""
      }
      get adType() {
        return this.adTypeId
      }
    }
    class o {
      constructor() {
        this.local = !1, this.sizes = [], this.customSizes = [], this.externalPublisherCode = "", this.externalPlacementCode = []
      }
      static create() {
        return new o
      }
      fromImpression(t) {
        return this.impression = t, this
      }
      forPlacement(t) {
        return this.placement = t, this
      }
      fromProvider(t) {
        return this.provider = t, this
      }
      enableLocalMode(t) {
        return this.local = t, this
      }
      forSizes(t) {
        return this.sizes = t, this
      }
      forCustomSizes(t) {
        return this.customSizes = t, this
      }
      withExternalPublisherCode(t) {
        return this.externalPublisherCode = t, this
      }
      withExternalPlacementCodes(t) {
        return this.externalPlacementCode = t, this
      }
      withFloorPrice(t) {
        return this.bidFloor = t, this
      }
      withAdTypeId(t) {
        return this.adType = t, this
      }
      build() {
        return new i(this.impression, this.placement, this.provider, this.local, this.sizes, this.customSizes, this.externalPublisherCode, this.externalPlacementCode, this.bidFloor, this.adType)
      }
    }
    var c = n(33);
    class a {
      static parseProviderResponse(t, e) {
        const n = [];
        return t.getResponseForAllSizes().forEach(t => {
          n.push(a.createBidForResponse(t, e))
        }), n
      }
      static createBidForResponse(t, e) {
        return (new c.a).create().setEntityProperties(e.provider, e.placement).setBidRequestProperties(e).setBidResponseProperties(t, e).setExchangeResponseProperties(t, e).setSspProperties(t).setDMSProperties(t).build()
      }
    }
    var u = n(11),
      d = n(2);
    class l {
      constructor() {
        this.HBExchangeServiceType = "sspexchangeservice", this.disableUserSyncOnLoad = "0"
      }
      static getExternalPublisherCode(t) {
        const e = t.placement.placementConfig.providersMapped.getConfigOf(t.provider.id).get("ecc");
        return Object(s.q)(e) ? e : t.impression.publisherID
      }
      initiateUserSync() {
        const t = r.locator.resolve("exchangeusersyncservice");
        if (!Object(s.o)(t)) throw new Error("Could not sync provider as service is unavailable");
        "1" === this.disableUserSyncOnLoad || Object(d.n)() ? t.sync("mnet") : Object(d.b)(window, "load", () => {
          t.sync("mnet")
        })
      }
      submit(t) {
        return this.initiateUserSync(), this.handleBidRequest(t)
      }
      handleBidRequest(t) {
        const e = this.getHBClientBidRequest(t);
        return new Promise((t, n) => {
          const r = this.getHBClientService();
          if (!Object(s.o)(r)) return n({
            placement: e.placement,
            provider: e.provider,
            reason: 1202
          });
          r.submit(e).then(r => {
            this.processResponse(e, r, t, n)
          })
        })
      }
      getHBClientBidRequest(t) {
        const e = t.placement.placementConfig,
          n = t.provider,
          r = t.applicableSizes,
          s = t.bidFloor;
        return o.create().forPlacement(e).fromImpression(t.impression).fromProvider(n).enableLocalMode(t.isLocal).forSizes(r.sizes).forCustomSizes(this.getCustomSizes(e)).withExternalPlacementCodes(r.epcs).withExternalPublisherCode(l.getExternalPublisherCode(t)).withFloorPrice(s).withAdTypeId(this.getAdType).build()
      }
      getCustomSizes(t) {
        return []
      }
      get getAdType() {
        return "1"
      }
      getHBClientService() {
        return r.locator.resolve(this.HBExchangeServiceType)
      }
      processResponse(t, e, n, r) {
        this.parseAndResolveResponse(t, e, n)
      }
      parseAndResolveResponse(t, e, n) {
        let r = a.parseProviderResponse(e, t);
        this.fireProviderResponseLog(t, r), r = this.manipulateBids(r, t.impression, t.placement);
        n(this.getWinningSizeResponse(r))
      }
      manipulateBids(t, e, n) {
        return t
      }
      fireProviderResponseLog(t, e) {
        "akamai" !== t.impression.type && r.log.addEvent("pr", {
          data: e
        })
      }
      getWinningSizeResponse(t) {
        const e = t.filter(t => "1" === t.get("dbf"));
        return e.length > 0 ? e[0] : (r.log.addEvent("el", {
          data: {
            level: 2,
            name: "NO_DOMINANT_BID"
          }
        }), t[0])
      }
    }
    r.locator.register("hbclientadapter", Object(u.a)(new l))
  }, function(t, e, n) {
    "use strict";
    var r = n(108),
      s = n(159).left,
      i = n(160),
      o = n(161),
      c = n(162),
      a = n(164),
      u = i("reduce"),
      d = o("reduce", {
        1: 0
      });
    r({
      target: "Array",
      proto: !0,
      forced: !u || !d || !a && c > 79 && c < 83
    }, {
      reduce: function(t) {
        return s(this, t, arguments.length, arguments.length > 1 ? arguments[1] : void 0)
      }
    })
  }, function(t, e) {
    var n = {}.toString;
    t.exports = function(t) {
      return n.call(t).slice(8, -1)
    }
  }, function(t, e, n) {
    var r = n(155),
      s = n(31),
      i = function(t) {
        return "function" == typeof t ? t : void 0
      };
    t.exports = function(t, e) {
      return arguments.length < 2 ? i(r[t]) || i(s[t]) : r[t] && r[t][e] || s[t] && s[t][e]
    }
  }, function(t, e, n) {
    var r = n(74),
      s = n(174);
    t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
      var t, e = !1,
        n = {};
      try {
        (t = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), e = n instanceof Array
      } catch (t) {}
      return function(n, i) {
        return r(n), s(i), e ? t.call(n, i) : n.__proto__ = i, n
      }
    }() : void 0)
  }, function(t, e, n) {
    "use strict";

    function r(t, e, n = !0) {
      if (t.length >= e) return t;
      const r = e - t.length,
        s = [];
      for (let t = 0; t < r; t++) s.push("0");
      return n ? s.join("") + t : t + s.join("")
    }
    n.d(e, "a", (function() {
      return r
    }))
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(1),
      s = n(0);
    const i = {
      register(t, e) {
        r.locator.register(t, e)
      },
      resolve(t) {
        const e = r.locator.resolve(t);
        return Object(s.o)(e) ? e : r.locator.resolve("cpm")
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return i
    }));
    var r = n(14);
    let s = 0;
    class i {
      constructor() {
        this.properties = {}, this.properties.pid = s++
      }
      get(t) {
        return this.properties[t]
      }
      set(t, e) {
        return this.properties[t] = e, this
      }
      get frameID() {
        return this.properties.pfid
      }
      set frameID(t) {
        this.properties.pfid = t, this.properties.id = t
      }
      get targetOrigin() {
        return this.properties.ptarget
      }
      setTargetOrigin(t) {
        return this.properties.ptarget = t, this
      }
      get sourceOrigin() {
        return this.properties.src
      }
      setSourceOrigin(t) {
        return this.properties.src = t, this
      }
      serialize() {
        return Object(r.a)({}, this.properties)
      }
      deserialize(t) {
        return this.properties = Object(r.a)({}, t), this
      }
    }
  }, function(t, e, n) {
    "use strict";
    var r = n(44);
    e.a = {
      get: t => r.a.getItem(t),
      set: (t, e) => {
        r.a.setItem(t, e, {
          path: "/"
        })
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(6);
    class s extends r.a {
      constructor(t, e) {
        super(t), this.bid = e
      }
      getAll() {
        return this.decoratorItem.getAll().set("vwuj", this.bid.get("strat") || "").set("gVwdw", this.bid.get("dmsStat") || "").set("gfegs", this.bid.get("dCbdp") || "").set("fegs", this.bid.get("cbdp") || "").set("dgisEg", this.bid.get("adfpBd") || "").set("beqfd_husp", this.bid.get("erpm") || "").set("gfv", this.bid.get("dmsCliStat") || "")
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(6);
    class s extends r.a {
      constructor(t, e) {
        super(t), this.selectedClientRule = e
      }
      getAll() {
        return this.decoratorItem.getAll().set("uxohSuw", this.selectedClientRule.priority).set("uxohYhu", this.selectedClientRule.getVersion())
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return o
    }));
    var r = n(2),
      s = n(5);
    const i = ["allow-forms", "allow-pointer-lock", "allow-popups", "allow-popups-to-escape-sandbox", "allow-same-origin", "allow-top-navigation-by-user-activation", "allow-scripts"];

    function o(t) {
      const e = "sbIfr" + Object(s.c)(1e3, 9999),
        n = t.frameElement,
        o = n.width || n.clientWidth,
        c = n.height || n.clientHeight;
      try {
        const n = Object(r.f)(e, String(o), String(c));
        return n.setAttribute("sandbox", i.join(" ")), t.document.body.appendChild(n), Object(r.m)(n)
      } catch (e) {
        return t
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return V
    }));
    var r, s = n(0),
      i = n(14);
    class o {
      constructor() {
        return this.properties = {}, this.set("size_info", []), this
      }
      set(t, e) {
        return this.properties[t] = e, this
      }
      get(t) {
        return this.properties[t]
      }
      parse(t) {
        return Object(s.c)(t, (t, e) => {
          Object(s.m)(t) && this.properties.hasOwnProperty(e) ? this.set(e, Object(i.d)(this.properties[e], t)) : this.set(e, t)
        }), this
      }
      addSizeResponse(t) {
        this.get("size_info").push(t)
      }
      getResponseForAllSizes() {
        return this.get("size_info")
      }
    }! function(t) {
      t.V1 = "1", t.V2 = "2"
    }(r || (r = {}));
    var c = n(32),
      a = n(9);
    class u {
      constructor() {
        this.properties = new Map, this.id = Object(c.a)()
      }
      get requestID() {
        return this.id
      }
      set(t, e) {
        return this.properties.set(t, e), this
      }
      buildParameters() {
        return Object(a.a)(this.properties)
      }
    }
    class d {
      addToRequest(t) {
        for (const e in t) t.hasOwnProperty(e) && this.request.set(e, t[e])
      }
      create() {
        return this.request = new u, this.request.set("vvsUhtLg", this.request.requestID), this
      }
      clientProps(t) {
        return this.addToRequest(t), this
      }
      entities(t) {
        return this.addToRequest(t), this
      }
      features(t) {
        return this.addToRequest(t), this
      }
      forGeographicalInformation(t) {
        return this.addToRequest(t), this
      }
      forEncryptionVersion(t) {
        return this.request.set("encryptionVersion", t), this
      }
      GDPR(t) {
        return this.addToRequest(t), this
      }
      requestMeta(t) {
        return this.addToRequest(t), this
      }
      pageProps(t) {
        return this.addToRequest(t), this
      }
      pageInfo(t) {
        return this.request.set("sdjhlqir", Object(a.d)(JSON.stringify(t))), this
      }
      requests(t) {
        return this.request.set("uhtxhvw", Object(a.d)(t)), this
      }
      userMeta(t) {
        return this.request.set("uwxvxlg", t), this
      }
      usPrivacy(t) {
        return this.addToRequest(t), this
      }
      appNexusData(t) {
        return Object(s.o)(t) && this.request.set("vlg", t), this
      }
      forAdType(t) {
        return this.request.set("dw", t.indexOf("NATIVE") > -1 ? "3" : "1"), this
      }
      forImpressionType(t) {
        return this.request.set("dfw", t), this
      }
      forceBid(t) {
        return Object(s.o)(t) ? (this.request.set("iusylg", t.provider), "" !== t.bid && this.request.set("iuelg", t.bid), this) : this
      }
      forVersion(t) {
        return this.request.set("vvsUhtYhu", t), this
      }
      forWhiteOps(t) {
        return Object(s.o)(t) ? (this.request.set("zr", t), this) : this
      }
      timeout(t) {
        return Object(s.o)(t) && this.request.set("wpw", t.toString()), this
      }
      DMS(t) {
        return this.addToRequest(t), this
      }
      COPPA(t) {
        return this.addToRequest(t), this
      }
      publisherCustomParams(t) {
        return this.addToRequest(t), this
      }
      build() {
        return this.request
      }
    }
    var l = n(1),
      h = n(4),
      g = n(34),
      p = n(20),
      f = n(10),
      b = n(26);

    function m(t) {
      if (Object(s.o)(window.aax) && Object(s.h)(window.aax.getBlockedAdvertiserCategory)) {
        const e = window.aax.getBlockedAdvertiserCategory(t);
        if (Object(s.o)(e) && e.length > 0) return e.join(",")
      }
      return ""
    }
    var v = () => {
        let t = "8182";
        return Object(s.q)(t) || (t = void 0), t
      },
      w = t => ({
        dgw: t.serverDeviceType,
        vfuvlch: Object(a.d)(t.screenSize),
        xjg: t.clientDeviceType
      }),
      O = () => {
        let t = "0";
        const e = l.locator.resolve("cpasrv");
        return Object(s.o)(e) && e.isActionApplicable("REGS_COPPA") && (t = "1"), {
          frssd: t
        }
      },
      y = () => ({
        vvd: 0
      }),
      E = t => JSON.stringify(t),
      j = t => ({
        flg: t.publisherID,
        lwbsh: t.integrationType,
        swulg: t.partnerId,
        vg: t.sessionDepth
      }),
      S = t => {
        const e = t.publisherUrl,
          n = Object(a.f)(e, "com_aax_test");
        if (!Object(s.o)(n) || !Object(s.o)(n[0])) return;
        return {
          provider: n,
          bid: Object(a.f)(e, "com_aax_bid") || ""
        }
      },
      I = () => {
        let t;
        if (f.a.isTcfV2Enabled) {
          const e = l.locator.resolve("tcfsrv");
          let n;
          Object(s.o)(e) && (n = !e.isActionApplicable("STOP_SENDING_PII")), t = n ? 1 : 0
        } else t = b.a.consentForExternalServices;
        return {
          jgsu: f.a.isApplicable() ? "1" : "0",
          jgsufrqvhqw: t,
          jgsuvwulqj: f.a.consent
        }
      },
      C = t => ({
        ff: t.countryCode,
        fw: t.city,
        gpd: t.designatedMarketArea,
        uf: t.stateCode
      }),
      A = t => {
        let e = "nv";
        return "w" === t.zoneCode && (e = "nc"), g.a.europeRouting && "EU" === l.app.envProperties.coc && (e = "eu"), !g.a.asiaPacificRouting || "AS" !== l.app.envProperties.coc && "OC" !== l.app.envProperties.coc || (e = "apac"), {
          eo: 1,
          kow: 1,
          qghf: 1,
          region: e,
          uw: 5,
          wu: Math.random()
        }
      },
      P = t => ({
        sk: t.pageHeight,
        yk: t.viewPortHeight,
        yz: t.viewPortWidth
      }),
      R = t => {
        const e = {
          gq: Object(a.d)(window.location.origin),
          kwwsv: t.isSSLEnabled ? 1 : 0,
          nzui: Object(a.d)(t.referrerUrl),
          uhtxuo: Object(a.d)(t.publisherUrl),
          wvfrgh: 1
        };
        return Object(s.o)(t.channel) && (e.fkdqqho = Object(a.d)(t.channel)), Object(s.o)(t.section) && (e.vhfwlrq = Object(a.d)(t.section)), e
      },
      T = t => ({
        efdw: m(t.countryCode)
      }),
      x = () => ({
        xvs_hqi: p.a.isEnforcementEnabled() ? "1" : "0",
        xvs_vwdwxv: p.a.isApplicable() ? "1" : "0",
        xv_sulydfb: p.a.finalConsent
      }),
      D = () => {
        const t = {},
          e = g.a.strictUserCheckProviders;
        return Object(s.o)(e) && e !== [] ? (e.forEach(e => {
          const n = h.f.getConfigOf(e),
            r = n && n.get("alias"),
            i = l.locator.resolve("realtimeusersyncservice");
          if (!Object(s.o)(i) || !Object(s.o)(r)) return;
          const o = i.getExistingUser(r);
          Object(s.o)(o) && "" !== o && (t[e] = o)
        }), Object(a.d)(JSON.stringify(t))) : JSON.stringify({})
      },
      _ = () => {
        const t = l.locator.resolve("whiteopsservice");
        if (Object(s.o)(t)) return t.isEnabled() ? "1" : void 0
      },
      M = t => "cache" === t ? h.g.get("cbrt") : "headerBid" === t ? h.g.get("hbrt") : void 0,
      k = n(38);
    class L {
      constructor() {
        this.fanoutRequests = []
      }
      getResponse(t) {
        return this.fanoutRequests[t].sspResponse
      }
      getCreativeIdProviderMap(t) {
        return this.fanoutRequests[t].creativeProviderMap
      }
      setCallbacks(t) {
        this.fanoutRequests.forEach(e => {
          const n = Object(k.b)();
          e.callback = "window.aax." + n, window.aax[n] = n => {
            t(n, e.request.index)
          }
        })
      }
      getAllDeMuxRequest() {
        return this.fanoutRequests.map(t => t.request)
      }
      getAllFanoutIndices() {
        return this.fanoutRequests.map(t => t.request.index)
      }
    }
    class N {
      constructor() {
        this.properties = new Map
      }
      get(t) {
        return this.properties.get(t)
      }
      setResponseSSPMeta(t) {
        return this.properties.set("metaSSP", t), this
      }
      getResponseSSPMeta() {
        return this.properties.get("metaSSP")
      }
      initiateWhiteOps(t) {
        const e = l.locator.resolve("whiteopsservice");
        Object(s.o)(e) && e.handle(t)
      }
      setResponseMeta(t) {
        return this.properties.set("meta", t), this.initiateWhiteOps(t), this
      }
      getResponseMeta() {
        return this.get("meta")
      }
      setResponseProviderInfo(t) {
        return this.properties.set("pinfo", t), this
      }
      getResponseProviderInfoMap() {
        return this.get("pinfo")
      }
      setResponseTagList(t) {
        return this.properties.set("tl", t), this
      }
      getResponseTagList() {
        return this.get("tl")
      }
    }
    class B {
      constructor(t, e, n) {
        this.cridPvids = new Map, this.sspResponse = new N, this.cridPvids = t, this.fanoutRequestParam = {
          prvReqId: Object(c.a)(),
          index: n,
          requestString: e,
          crid: [...this.cridPvids.keys()].join(",")
        }
      }
      get request() {
        return this.fanoutRequestParam
      }
      set callback(t) {
        this.fanoutRequestParam.callback = t
      }
      get creativeProviderMap() {
        return this.cridPvids
      }
    }
    class F extends L {
      constructor() {
        super()
      }
      applyFanoutLogic(t) {
        const e = [],
          n = new Map;
        t.forEach((t, r) => {
          e.push(Object(k.c)(t, r));
          const s = [...t.keys()];
          n.set(r, s)
        }), this.fanoutRequests.push(new B(n, e.join("!"), this.fanoutRequests.length))
      }
      splitRequests(t) {
        this.applyFanoutLogic(t)
      }
    }
    class q extends L {
      constructor() {
        super()
      }
      applyFanoutLogic(t) {
        t.forEach((t, e) => {
          const n = [...t.keys()],
            r = new Map;
          r.set(e, n), this.fanoutRequests.push(new B(r, Object(k.c)(t, e), this.fanoutRequests.length))
        })
      }
      splitRequests(t) {
        this.applyFanoutLogic(t)
      }
    }
    class V {
      constructor(t, e) {
        this.state = 0, this.requestReceivedCount = 0, this.scheduledRequestPromises = new Map, this.scheduledPlacementRequests = new Map, this.deMultiplexer = class {
          static getDeMultiplexer(t) {
            return 1 === t ? new q : new F
          }
        }.getDeMultiplexer(g.a.fanoutStrategy), this.REQUEST_COUNT_LIMIT = t, this.ENCRYPTION_VERSION = e
      }
      constructProviderResponse(t, e, n, r) {
        const s = new o,
          i = t.size_info || [],
          c = t.metainfo;
        return s.set("creative_id", e).set("provider_id", Number(n)), i.forEach(t => {
          const e = new o;
          e.parse(r.getResponseSSPMeta()).parse(r.getResponseMeta()).parse(r.getResponseProviderInfoMap()[n]).parse(c).parse(t), s.addSizeResponse(e)
        }), s
      }
      resolvePromiseForProvider(t, e) {
        const n = e.getResponseSSPMeta().sspRequestId,
          r = t.metainfo,
          i = r.crid,
          o = String(r.provider_id);
        l.metrics.markEnd("ltime_" + n + i + o);
        const c = this.constructProviderResponse(t, i, o, e),
          a = this.scheduledRequestPromises.get(i);
        if (Object(s.o)(a)) {
          const t = a.get(o);
          t && t(c), a.delete(o)
        }
      }
      canAcceptMore() {
        return 0 === this.state && this.requestReceivedCount < this.REQUEST_COUNT_LIMIT || (this.state = 1, !1)
      }
      handle(t, e) {
        this.resolvePromiseForProvider(t, e)
      }
      getClientInvalidResponse(t, e, n) {
        const r = (this.scheduledPlacementRequests.get(t) || new Map).get(e),
          s = new o,
          i = (new o).set("provider_id", Number(e)).set("adcode", "").set("creative_id", t).set("no_bid", !0).set("nbc", 8).set("og_bid", 0).set("size", r.sizes[0]).parse(n.getResponseMeta()).parse(n.getResponseSSPMeta());
        return s.addSizeResponse(i), s
      }
      resolveClientInvalidResponse(t, e) {
        t.forEach((t, n) => {
          t.forEach(t => {
            const r = this.scheduledRequestPromises.get(n);
            if (r) {
              const s = r.get(t);
              if (s) {
                s(this.getClientInvalidResponse(n, t, e))
              }
            }
          })
        })
      }
      getSspRequest(t, e) {
        let n = (new d).create().GDPR(I()).entities(j(t)).requests(E(this.deMultiplexer.getAllDeMuxRequest())).requestMeta(A(t)).clientProps(w(t)).pageProps(R(t)).pageInfo(P(t)).appNexusData(v()).forImpressionType(t.type).usPrivacy(x()).userMeta(D()).forGeographicalInformation(C(t)).forceBid(S(t)).forEncryptionVersion(this.ENCRYPTION_VERSION).timeout(M(t.type)).forVersion(r.V2).DMS(y()).forWhiteOps(_()).COPPA(O()).publisherCustomParams(T(t));
        return g.a.isSingleRequestForDisplayAndNativeEnabled() || (n = n.forAdType(e)), n.build()
      }
      startClockForSSPRequests(t) {
        this.scheduledPlacementRequests.forEach((e, n) => {
          e.forEach((e, r) => {
            l.metrics.markStart("ltime_" + t + n + r)
          })
        })
      }
      addNewRequest(t, e, n) {
        this.requestReceivedCount++;
        const r = this.scheduledPlacementRequests.get(t) || new Map;
        r.set(e, n), this.scheduledPlacementRequests.set(t, r)
      }
      add(t) {
        const e = t.placement.id,
          n = t.provider.id;
        return this.addNewRequest(e, n, t), new Promise(t => {
          const r = this.scheduledRequestPromises.get(e) || new Map;
          r.set(n, t), this.scheduledRequestPromises.set(e, r)
        })
      }
    }
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return s
    }));
    var r = n(3);
    const s = new class {
      constructor(t) {
        this.staticAdapterProperties = new r.a(t)
      }
      getMinPrice(t, e) {
        const n = this.staticAdapterProperties.get(t),
          r = n && n[e];
        return r && r.minPrice || ""
      }
    }({
      "284486949": {
        "26": {
          "minPrice": 0.04,
          "id": "26"
        }
      },
      "597733264": {
        "26": {
          "minPrice": 0.01,
          "id": "26"
        }
      },
      "843965741": {
        "26": {
          "minPrice": 0.01,
          "id": "26"
        }
      }
    })
  }, function(t, e, n) {
    "use strict";
    n.d(e, "a", (function() {
      return r
    }));
    const r = new(n(3).a)({
      "iframeConfig": {
        "iframeId": "aaxclient",
        "subDomain": "https://redditad.com",
        "subDomainPath": "/getcbids.html?_csvr=011310_169"
      },
      "pvTimeout": 1600
    })
  }, function(t, e, n) {
    var r = n(31),
      s = n(109).f,
      i = n(73),
      o = n(114),
      c = n(115),
      a = n(153),
      u = n(158);
    t.exports = function(t, e) {
      var n, d, l, h, g, p = t.target,
        f = t.global,
        b = t.stat;
      if (n = f ? r : b ? r[p] || c(p, {}) : (r[p] || {}).prototype)
        for (d in e) {
          if (h = e[d], l = t.noTargetGet ? (g = s(n, d)) && g.value : n[d], !u(f ? d : p + (b ? "." : "#") + d, t.forced) && void 0 !== l) {
            if (typeof h == typeof l) continue;
            a(h, l)
          }(t.sham || l && l.sham) && i(h, "sham", !0), o(n, d, h, t)
        }
    }
  }, function(t, e, n) {
    var r = n(47),
      s = n(150),
      i = n(110),
      o = n(111),
      c = n(113),
      a = n(43),
      u = n(132),
      d = Object.getOwnPropertyDescriptor;
    e.f = r ? d : function(t, e) {
      if (t = o(t), e = c(e, !0), u) try {
        return d(t, e)
      } catch (t) {}
      if (a(t, e)) return i(!s.f.call(t, e), t[e])
    }
  }, function(t, e) {
    t.exports = function(t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e
      }
    }
  }, function(t, e, n) {
    var r = n(112),
      s = n(131);
    t.exports = function(t) {
      return r(s(t))
    }
  }, function(t, e, n) {
    var r = n(42),
      s = n(95),
      i = "".split;
    t.exports = r((function() {
      return !Object("z").propertyIsEnumerable(0)
    })) ? function(t) {
      return "String" == s(t) ? i.call(t, "") : Object(t)
    } : Object
  }, function(t, e, n) {
    var r = n(55);
    t.exports = function(t, e) {
      if (!r(t)) return t;
      var n, s;
      if (e && "function" == typeof(n = t.toString) && !r(s = n.call(t))) return s;
      if ("function" == typeof(n = t.valueOf) && !r(s = n.call(t))) return s;
      if (!e && "function" == typeof(n = t.toString) && !r(s = n.call(t))) return s;
      throw TypeError("Can't convert object to primitive value")
    }
  }, function(t, e, n) {
    var r = n(31),
      s = n(73),
      i = n(43),
      o = n(115),
      c = n(134),
      a = n(117),
      u = a.get,
      d = a.enforce,
      l = String(String).split("String");
    (t.exports = function(t, e, n, c) {
      var a, u = !!c && !!c.unsafe,
        h = !!c && !!c.enumerable,
        g = !!c && !!c.noTargetGet;
      "function" == typeof n && ("string" != typeof e || i(n, "name") || s(n, "name", e), (a = d(n)).source || (a.source = l.join("string" == typeof e ? e : ""))), t !== r ? (u ? !g && t[e] && (h = !0) : delete t[e], h ? t[e] = n : s(t, e, n)) : h ? t[e] = n : o(e, n)
    })(Function.prototype, "toString", (function() {
      return "function" == typeof this && u(this).source || c(this)
    }))
  }, function(t, e, n) {
    var r = n(31),
      s = n(73);
    t.exports = function(t, e) {
      try {
        s(r, t, e)
      } catch (n) {
        r[t] = e
      }
      return e
    }
  }, function(t, e, n) {
    var r = n(31),
      s = n(115),
      i = r["__core-js_shared__"] || s("__core-js_shared__", {});
    t.exports = i
  }, function(t, e, n) {
    var r, s, i, o = n(151),
      c = n(31),
      a = n(55),
      u = n(73),
      d = n(43),
      l = n(116),
      h = n(118),
      g = n(120),
      p = c.WeakMap;
    if (o) {
      var f = l.state || (l.state = new p),
        b = f.get,
        m = f.has,
        v = f.set;
      r = function(t, e) {
        return e.facade = t, v.call(f, t, e), e
      }, s = function(t) {
        return b.call(f, t) || {}
      }, i = function(t) {
        return m.call(f, t)
      }
    } else {
      var w = h("state");
      g[w] = !0, r = function(t, e) {
        return e.facade = t, u(t, w, e), e
      }, s = function(t) {
        return d(t, w) ? t[w] : {}
      }, i = function(t) {
        return d(t, w)
      }
    }
    t.exports = {
      set: r,
      get: s,
      has: i,
      enforce: function(t) {
        return i(t) ? s(t) : r(t, {})
      },
      getterFor: function(t) {
        return function(e) {
          var n;
          if (!a(e) || (n = s(e)).type !== t) throw TypeError("Incompatible receiver, " + t + " required");
          return n
        }
      }
    }
  }, function(t, e, n) {
    var r = n(135),
      s = n(119),
      i = r("keys");
    t.exports = function(t) {
      return i[t] || (i[t] = s(t))
    }
  }, function(t, e) {
    var n = 0,
      r = Math.random();
    t.exports = function(t) {
      return "Symbol(" + String(void 0 === t ? "" : t) + ")_" + (++n + r).toString(36)
    }
  }, function(t, e) {
    t.exports = {}
  }, function(t, e, n) {
    var r = n(136),
      s = n(123).concat("length", "prototype");
    e.f = Object.getOwnPropertyNames || function(t) {
      return r(t, s)
    }
  }, function(t, e, n) {
    var r = n(91),
      s = Math.max,
      i = Math.min;
    t.exports = function(t, e) {
      var n = r(t);
      return n < 0 ? s(n + e, 0) : i(n, e)
    }
  }, function(t, e) {
    t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
  }, function(t, e) {
    t.exports = function(t) {
      if ("function" != typeof t) throw TypeError(String(t) + " is not a function");
      return t
    }
  }, function(t, e, n) {
    "use strict";
    var r, s = n(138),
      i = n(47),
      o = n(31),
      c = n(55),
      a = n(43),
      u = n(126),
      d = n(73),
      l = n(114),
      h = n(59).f,
      g = n(141),
      p = n(97),
      f = n(48),
      b = n(119),
      m = o.Int8Array,
      v = m && m.prototype,
      w = o.Uint8ClampedArray,
      O = w && w.prototype,
      y = m && g(m),
      E = v && g(v),
      j = Object.prototype,
      S = j.isPrototypeOf,
      I = f("toStringTag"),
      C = b("TYPED_ARRAY_TAG"),
      A = s && !!p && "Opera" !== u(o.opera),
      P = !1,
      R = {
        Int8Array: 1,
        Uint8Array: 1,
        Uint8ClampedArray: 1,
        Int16Array: 2,
        Uint16Array: 2,
        Int32Array: 4,
        Uint32Array: 4,
        Float32Array: 4,
        Float64Array: 8
      },
      T = function(t) {
        return c(t) && a(R, u(t))
      };
    for (r in R) o[r] || (A = !1);
    if ((!A || "function" != typeof y || y === Function.prototype) && (y = function() {
        throw TypeError("Incorrect invocation")
      }, A))
      for (r in R) o[r] && p(o[r], y);
    if ((!A || !E || E === j) && (E = y.prototype, A))
      for (r in R) o[r] && p(o[r].prototype, E);
    if (A && g(O) !== E && p(O, E), i && !a(E, I))
      for (r in P = !0, h(E, I, {
          get: function() {
            return c(this) ? this[C] : void 0
          }
        }), R) o[r] && d(o[r], C, r);
    t.exports = {
      NATIVE_ARRAY_BUFFER_VIEWS: A,
      TYPED_ARRAY_TAG: P && C,
      aTypedArray: function(t) {
        if (T(t)) return t;
        throw TypeError("Target is not a typed array")
      },
      aTypedArrayConstructor: function(t) {
        if (p) {
          if (S.call(y, t)) return t
        } else
          for (var e in R)
            if (a(R, r)) {
              var n = o[e];
              if (n && (t === n || S.call(n, t))) return t
            } throw TypeError("Target is not a typed array constructor")
      },
      exportTypedArrayMethod: function(t, e, n) {
        if (i) {
          if (n)
            for (var r in R) {
              var s = o[r];
              s && a(s.prototype, t) && delete s.prototype[t]
            }
          E[t] && !n || l(E, t, n ? e : A && v[t] || e)
        }
      },
      exportTypedArrayStaticMethod: function(t, e, n) {
        var r, s;
        if (i) {
          if (p) {
            if (n)
              for (r in R)(s = o[r]) && a(s, t) && delete s[t];
            if (y[t] && !n) return;
            try {
              return l(y, t, n ? e : A && m[t] || e)
            } catch (t) {}
          }
          for (r in R) !(s = o[r]) || s[t] && !n || l(s, t, e)
        }
      },
      isView: function(t) {
        var e = u(t);
        return "DataView" === e || a(R, e)
      },
      isTypedArray: T,
      TypedArray: y,
      TypedArrayPrototype: E
    }
  }, function(t, e, n) {
    var r = n(183),
      s = n(95),
      i = n(48)("toStringTag"),
      o = "Arguments" == s(function() {
        return arguments
      }());
    t.exports = r ? s : function(t) {
      var e, n, r;
      return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(n = function(t, e) {
        try {
          return t[e]
        } catch (t) {}
      }(e = Object(t), i)) ? n : o ? s(e) : "Object" == (r = s(e)) && "function" == typeof e.callee ? "Arguments" : r
    }
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "domBasedHandler", (function() {
      return y
    }));
    var r = n(1),
      s = n(0),
      i = n(89),
      o = n(8),
      c = n(2);
    let a, u, d;

    function l() {
      const t = Object(o.k)(c.C);
      u = {
        width: t.width,
        height: t.height
      }
    }

    function h(t) {
      if (Object(s.o)(t) && t && l(), Object(s.h)(a)) {
        a().forEach(g)
      }
    }

    function g(t) {
      const e = u;
      if (p(t, e)) {
        const n = () => {
            p(t, e) && d(t)
          },
          r = Object(i.b)(t);
        setTimeout(n, r)
      }
    }

    function p(t, e) {
      switch (Object(i.a)(t)) {
        case 0:
          return function(t, e) {
            return b(t, e) >= 50
          }(t, e);
        case 1:
          return function(t, e) {
            return b(t, e) >= 30
          }(t, e);
        default:
          return !1
      }
    }

    function f(t) {
      return t.pageYOffset && {
        X: t.pageXOffset,
        Y: t.pageYOffset
      } || {
        X: 0,
        Y: 0
      }
    }

    function b(t, e) {
      if (!(Object(s.o)(e) && Object(s.l)(e.width) && Object(s.l)(e.height))) return 0;
      const n = function(t) {
          const e = f(c.C),
            n = c.C;
          let r = window,
            s = t,
            i = 0,
            o = 0;
          do {
            const t = s.getBoundingClientRect();
            if (r === n) {
              const e = f(r);
              i += t.left + e.X, o += t.top + e.Y;
              break
            }
            i += t.left, o += t.top, s = r.frameElement, r = r.parent
          } while (r && r.document);
          return {
            height: t.clientHeight,
            left: i - e.X,
            top: o - e.Y,
            width: s.clientWidth,
            x: i - e.X,
            y: o - e.Y
          }
        }(t),
        r = n.left,
        i = n.top,
        o = n.width,
        a = n.height;
      return m(0, e.width, r, r + o) * m(0, e.height, i, i + a) / (o * a) * 100
    }

    function m(t, e, n, r) {
      return t >= e || n >= r || r <= t || n >= e ? 0 : t <= n && e >= r ? r - n : t >= n && e <= r ? e - t : t > n && e > r ? r - t : t < n && e < r ? e - n : 0
    }
    const v = Object(c.A)(100, (function() {
      h()
    }));
    const w = Object(c.A)(100, (function() {
      h(!0)
    }));
    class O {
      constructor() {
        var t, e;
        this.elementList = [], this.tracking = !1, t = this.getElementList.bind(this), e = this.fireCallback.bind(this), a = t, d = e, l()
      }
      static setupEventHandlers() {
        Object(c.b)(window, "scroll", v), Object(c.b)(window, "resize", w)
      }
      static unsetEventHandlers() {
        Object(c.x)(window, "scroll", v), Object(c.x)(window, "resize", w)
      }
      getElementList() {
        return this.elementList
      }
      fireCallback(t) {
        Object(s.o)(this.genericCallbackForElements) && this.genericCallbackForElements(t, {
          strategyUsed: 4
        })
      }
      set fireCallbackForElement(t) {
        this.genericCallbackForElements = t
      }
      observe(t) {
        this.tracking || (this.tracking = !0, O.setupEventHandlers()), this.elementList.push(t), w(), v()
      }
      unobserve(t) {
        if (this.elementList.includes(t)) {
          const e = this.elementList.indexOf(t);
          this.elementList.splice(e, 1), 0 === this.elementList.length && (this.tracking = !1, O.unsetEventHandlers())
        }
      }
      isSupported() {
        return !0
      }
    }
    const y = new O;
    r.locator.register("VIEW_STRAT_DOM", y)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "simpleInventoryPlacementService", (function() {
      return i
    }));
    var r = n(1);
    const s = {
        DfpInventory: "dfpinventoryplacementfinder",
        DirectAdsInventory: "directinventoryplacementfinder"
      },
      i = {
        getPlacementID(t) {
          const e = s[t.type] || "",
            n = r.locator.resolve(e);
          if (n) return n.getPlacementID(t)
        }
      }
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "AuctionWinnerLogHandler", (function() {
      return T
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(0),
      a = n(21),
      u = n(35),
      d = n(50),
      l = n(60),
      h = n(61),
      g = n(62),
      p = n(63),
      f = n(64),
      b = n(83),
      m = n(84),
      v = n(82),
      w = n(6);
    class O extends w.a {
      constructor(t, e) {
        super(t), this.secondWinnerPrefix = "vf_", this.runner = e
      }
      getAll() {
        if (!Object(c.o)(this.runner)) return this.decoratorItem.getAll();
        const t = {
            sylg: this.runner.providerId,
            rjegs: this.runner.originalCpm,
            egs: this.runner.get("bdp"),
            fegs: this.runner.get("cbdp"),
            egdwd: this.runner.get("bd")
          },
          e = this.decoratorItem.getAll();
        return Object.keys(t).forEach(n => {
          const r = t[n];
          e.set(this.secondWinnerPrefix + n, r)
        }), e
      }
    }
    var y = n(51),
      E = n(49),
      j = n(1),
      S = n(65),
      I = n(85),
      C = n(86),
      A = n(102),
      P = n(87),
      R = n(103);
    class T {
      constructor() {
        this.EVENT_ID = "aw", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(s.c)(this.config.loggingPercentage), this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta)
      }
      static addAdditionalProperties(t, e) {
        t.getAll().set("uph", e.get("rme")).set("ud_vc", e.get("ra_sz")).set("xgf", e.get("udc") ? 1 : 0).set("fsu", Math.random())
      }
      static setAuctionWinnerFired(t) {
        t.isAuctionWinnerPixelFired = !0
      }
      static handleClientRuleLogging(t) {
        const e = j.locator.resolve("clientconfigrule");
        if (!Object(c.o)(e) || !Object(c.o)(e.getRule())) return t;
        const n = e.getRule();
        return t = new R.a(t, n)
      }
      handleEvent(t) {
        const e = t.data.auctioneer,
          n = t.data.winner,
          r = t.data.runner,
          s = e.placementSubmitted.domReference,
          o = {
            dfpDivID: s
          };
        if (this.isLogDisabled) return;
        Object(c.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID));
        let w = new a.a;
        w = new u.a(w, n.providerId), w = new d.a(w, n.placementId), w = new l.a(w, e), w = new h.a(w, n), w = new g.a(w, n), w = new p.a(w, n), w = new f.a(w, n), w = new b.a(w, n.get("mlogs")), w = new m.a(w, n.get("sp")), w = new I.a(w, n.get("pageCat")), w = new v.a(w, e), w = new O(w, r), w = new E.a(w, n, o), w = new S.a(w, n), w = new C.a(w, e), w = new A.a(w, n), w = new P.a(w, e), Object(c.o)(s) && (w = new y.a(w, s)), w = T.handleClientRuleLogging(w), w.getAll().set("oshu", this.config.loggingPercentage), T.addAdditionalProperties(w, n), this.calculateRendererTime(w, e), T.setAuctionWinnerFired(e), this.dispatchItem(w)
      }
      dispatchItem(t) {
        Object(c.o)(this.logCollection) && (this.logCollection.add(t.getAll()), this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null)
      }
      calculateRendererTime(t, e) {
        const n = e.auctionId;
        j.metrics.markEnd("rti_" + n);
        let r = -1;
        void 0 !== n && (r = j.metrics.measure("rti_" + n)), t.getAll().set("uwl", r)
      }
    }
    const x = new T;
    j.locator.register(x.EVENT_ID, x)
  }, function(t, e) {}, function(t, e) {
    t.exports = function(t) {
      if (null == t) throw TypeError("Can't call method on " + t);
      return t
    }
  }, function(t, e, n) {
    var r = n(47),
      s = n(42),
      i = n(133);
    t.exports = !r && !s((function() {
      return 7 != Object.defineProperty(i("div"), "a", {
        get: function() {
          return 7
        }
      }).a
    }))
  }, function(t, e, n) {
    var r = n(31),
      s = n(55),
      i = r.document,
      o = s(i) && s(i.createElement);
    t.exports = function(t) {
      return o ? i.createElement(t) : {}
    }
  }, function(t, e, n) {
    var r = n(116),
      s = Function.toString;
    "function" != typeof r.inspectSource && (r.inspectSource = function(t) {
      return s.call(t)
    }), t.exports = r.inspectSource
  }, function(t, e, n) {
    var r = n(152),
      s = n(116);
    (t.exports = function(t, e) {
      return s[t] || (s[t] = void 0 !== e ? e : {})
    })("versions", []).push({
      version: "3.8.0",
      mode: r ? "pure" : "global",
      copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
    })
  }, function(t, e, n) {
    var r = n(43),
      s = n(111),
      i = n(156).indexOf,
      o = n(120);
    t.exports = function(t, e) {
      var n, c = s(t),
        a = 0,
        u = [];
      for (n in c) !r(o, n) && r(c, n) && u.push(n);
      for (; e.length > a;) r(c, n = e[a++]) && (~i(u, n) || u.push(n));
      return u
    }
  }, function(t, e, n) {
    "use strict";
    var r = n(31),
      s = n(47),
      i = n(138),
      o = n(73),
      c = n(171),
      a = n(42),
      u = n(139),
      d = n(91),
      l = n(56),
      h = n(140),
      g = n(172),
      p = n(141),
      f = n(97),
      b = n(121).f,
      m = n(59).f,
      v = n(175),
      w = n(176),
      O = n(117),
      y = O.get,
      E = O.set,
      j = r.ArrayBuffer,
      S = j,
      I = r.DataView,
      C = I && I.prototype,
      A = Object.prototype,
      P = r.RangeError,
      R = g.pack,
      T = g.unpack,
      x = function(t) {
        return [255 & t]
      },
      D = function(t) {
        return [255 & t, t >> 8 & 255]
      },
      _ = function(t) {
        return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255]
      },
      M = function(t) {
        return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0]
      },
      k = function(t) {
        return R(t, 23, 4)
      },
      L = function(t) {
        return R(t, 52, 8)
      },
      N = function(t, e) {
        m(t.prototype, e, {
          get: function() {
            return y(this)[e]
          }
        })
      },
      B = function(t, e, n, r) {
        var s = h(n),
          i = y(t);
        if (s + e > i.byteLength) throw P("Wrong index");
        var o = y(i.buffer).bytes,
          c = s + i.byteOffset,
          a = o.slice(c, c + e);
        return r ? a : a.reverse()
      },
      F = function(t, e, n, r, s, i) {
        var o = h(n),
          c = y(t);
        if (o + e > c.byteLength) throw P("Wrong index");
        for (var a = y(c.buffer).bytes, u = o + c.byteOffset, d = r(+s), l = 0; l < e; l++) a[u + l] = d[i ? l : e - l - 1]
      };
    if (i) {
      if (!a((function() {
          j(1)
        })) || !a((function() {
          new j(-1)
        })) || a((function() {
          return new j, new j(1.5), new j(NaN), "ArrayBuffer" != j.name
        }))) {
        for (var q, V = (S = function(t) {
            return u(this, S), new j(h(t))
          }).prototype = j.prototype, z = b(j), U = 0; z.length > U;)(q = z[U++]) in S || o(S, q, j[q]);
        V.constructor = S
      }
      f && p(C) !== A && f(C, A);
      var $ = new I(new S(2)),
        H = C.setInt8;
      $.setInt8(0, 2147483648), $.setInt8(1, 2147483649), !$.getInt8(0) && $.getInt8(1) || c(C, {
        setInt8: function(t, e) {
          H.call(this, t, e << 24 >> 24)
        },
        setUint8: function(t, e) {
          H.call(this, t, e << 24 >> 24)
        }
      }, {
        unsafe: !0
      })
    } else S = function(t) {
      u(this, S, "ArrayBuffer");
      var e = h(t);
      E(this, {
        bytes: v.call(new Array(e), 0),
        byteLength: e
      }), s || (this.byteLength = e)
    }, I = function(t, e, n) {
      u(this, I, "DataView"), u(t, S, "DataView");
      var r = y(t).byteLength,
        i = d(e);
      if (i < 0 || i > r) throw P("Wrong offset");
      if (i + (n = void 0 === n ? r - i : l(n)) > r) throw P("Wrong length");
      E(this, {
        buffer: t,
        byteLength: n,
        byteOffset: i
      }), s || (this.buffer = t, this.byteLength = n, this.byteOffset = i)
    }, s && (N(S, "byteLength"), N(I, "buffer"), N(I, "byteLength"), N(I, "byteOffset")), c(I.prototype, {
      getInt8: function(t) {
        return B(this, 1, t)[0] << 24 >> 24
      },
      getUint8: function(t) {
        return B(this, 1, t)[0]
      },
      getInt16: function(t) {
        var e = B(this, 2, t, arguments.length > 1 ? arguments[1] : void 0);
        return (e[1] << 8 | e[0]) << 16 >> 16
      },
      getUint16: function(t) {
        var e = B(this, 2, t, arguments.length > 1 ? arguments[1] : void 0);
        return e[1] << 8 | e[0]
      },
      getInt32: function(t) {
        return M(B(this, 4, t, arguments.length > 1 ? arguments[1] : void 0))
      },
      getUint32: function(t) {
        return M(B(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)) >>> 0
      },
      getFloat32: function(t) {
        return T(B(this, 4, t, arguments.length > 1 ? arguments[1] : void 0), 23)
      },
      getFloat64: function(t) {
        return T(B(this, 8, t, arguments.length > 1 ? arguments[1] : void 0), 52)
      },
      setInt8: function(t, e) {
        F(this, 1, t, x, e)
      },
      setUint8: function(t, e) {
        F(this, 1, t, x, e)
      },
      setInt16: function(t, e) {
        F(this, 2, t, D, e, arguments.length > 2 ? arguments[2] : void 0)
      },
      setUint16: function(t, e) {
        F(this, 2, t, D, e, arguments.length > 2 ? arguments[2] : void 0)
      },
      setInt32: function(t, e) {
        F(this, 4, t, _, e, arguments.length > 2 ? arguments[2] : void 0)
      },
      setUint32: function(t, e) {
        F(this, 4, t, _, e, arguments.length > 2 ? arguments[2] : void 0)
      },
      setFloat32: function(t, e) {
        F(this, 4, t, k, e, arguments.length > 2 ? arguments[2] : void 0)
      },
      setFloat64: function(t, e) {
        F(this, 8, t, L, e, arguments.length > 2 ? arguments[2] : void 0)
      }
    });
    w(S, "ArrayBuffer"), w(I, "DataView"), t.exports = {
      ArrayBuffer: S,
      DataView: I
    }
  }, function(t, e) {
    t.exports = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView
  }, function(t, e) {
    t.exports = function(t, e, n) {
      if (!(t instanceof e)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
      return t
    }
  }, function(t, e, n) {
    var r = n(91),
      s = n(56);
    t.exports = function(t) {
      if (void 0 === t) return 0;
      var e = r(t),
        n = s(e);
      if (e !== n) throw RangeError("Wrong length or index");
      return n
    }
  }, function(t, e, n) {
    var r = n(43),
      s = n(92),
      i = n(118),
      o = n(173),
      c = i("IE_PROTO"),
      a = Object.prototype;
    t.exports = o ? Object.getPrototypeOf : function(t) {
      return t = s(t), r(t, c) ? t[c] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null
    }
  }, function(t, e, n) {
    var r = n(42);
    t.exports = !!Object.getOwnPropertySymbols && !r((function() {
      return !String(Symbol())
    }))
  }, function(t, e) {
    t.exports = {}
  }, function(t, e, n) {
    var r = n(124);
    t.exports = function(t, e, n) {
      if (r(t), void 0 === e) return t;
      switch (n) {
        case 0:
          return function() {
            return t.call(e)
          };
        case 1:
          return function(n) {
            return t.call(e, n)
          };
        case 2:
          return function(n, r) {
            return t.call(e, n, r)
          };
        case 3:
          return function(n, r, s) {
            return t.call(e, n, r, s)
          }
      }
      return function() {
        return t.apply(e, arguments)
      }
    }
  }, function(t, e, n) {
    t.exports = function(t, e, n, r, s) {
      for (e = e.split ? e.split(".") : e, r = 0; r < e.length; r++) t = t ? t[e[r]] : s;
      return t === s ? n : t
    }
  }, function(t, e) {
    t.exports = function t(e) {
      var n = Array.isArray(e) ? [] : {};
      for (var r in e) {
        var s = e[r];
        n[r] = s && "object" == typeof s ? t(s) : s
      }
      return n
    }
  }, function(t, e, n) {
    "use strict";
    (function(t) {
      n.d(e, "a", (function() {
        return r
      }));
      const r = function(e) {
        if (!("EventSource" in e)) {
          var n = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
            r = function(t, e) {
              var r = this,
                i = 500,
                o = null,
                c = "";
              if (!t || "string" != typeof t) throw new SyntaxError("Not enough arguments");

              function a(t) {
                r._pollTimer = setTimeout((function() {
                  u.call(r)
                }), t)
              }

              function u() {
                try {
                  if (r.readyState == r.CLOSED) return;
                  var t = new XMLHttpRequest;
                  t.open("GET", r.URL, !0), t.setRequestHeader("Accept", "text/event-stream"), void 0 !== e.withCredentials && "boolean" == typeof e.withCredentials && (t.withCredentials = e.withCredentials), null != o && t.setRequestHeader("Last-Event-ID", o), c = "", t.timeout = 5e4, t.onreadystatechange = function() {
                    if (3 == this.readyState || 4 == this.readyState && 200 == this.status) {
                      r.readyState == r.CONNECTING && (r.readyState = r.OPEN, r.dispatchEvent("open", {
                        type: "open"
                      }));
                      var t = "";
                      try {
                        t = this.responseText || ""
                      } catch (t) {}
                      var e = t.substr(c.length).split("\n"),
                        u = "message",
                        d = [],
                        l = 0,
                        h = "";
                      for (c = t; l < e.length; l++)
                        if (0 == (h = e[l].replace(n, "")).indexOf("event")) u = h.replace(/event:?\s*/, "");
                        else if (0 == h.indexOf("retry")) {
                        var g = parseInt(h.replace(/retry:?\s*/, ""));
                        isNaN(g) || (i = g)
                      } else if (0 == h.indexOf("data")) d.push(h.replace(/data:?\s*/, ""));
                      else if (0 == h.indexOf("id:")) o = h.replace(/id:?\s*/, "");
                      else if (0 == h.indexOf("id")) o = null;
                      else if ("" == h && d.length) {
                        var p = new s(d.join("\n"), r.url, o);
                        r.dispatchEvent(u, p), d = [], u = "message"
                      }
                      4 == this.readyState && a(i)
                    } else r.readyState !== r.CLOSED && (4 == this.readyState ? (r.readyState = r.CONNECTING, r.dispatchEvent("error", {
                      type: "error"
                    }), a(i)) : 0 == this.readyState && a(i))
                  }, t.send(), setTimeout((function() {
                    t.abort()
                  }), t.timeout), r._xhr = t
                } catch (t) {
                  r.dispatchEvent("error", {
                    type: "error",
                    data: t.message
                  })
                }
              }
              this.URL = t, this.readyState = this.CONNECTING, this._pollTimer = null, this._xhr = null, u()
            };
          r.prototype = {
            close: function() {
              this.readyState = this.CLOSED, clearInterval(this._pollTimer), this._xhr.abort()
            },
            CONNECTING: 0,
            OPEN: 1,
            CLOSED: 2,
            dispatchEvent: function(t, e) {
              var n = this["_" + t + "Handlers"];
              if (n)
                for (var r = 0; r < n.length; r++) n[r].call(this, e);
              this["on" + t] && this["on" + t].call(this, e)
            },
            addEventListener: function(t, e) {
              this["_" + t + "Handlers"] || (this["_" + t + "Handlers"] = []), this["_" + t + "Handlers"].push(e)
            },
            removeEventListener: function(t, e) {
              var n = this["_" + t + "Handlers"];
              if (n)
                for (var r = n.length - 1; r >= 0; --r)
                  if (n[r] === e) {
                    n.splice(r, 1);
                    break
                  }
            },
            onerror: null,
            onmessage: null,
            onopen: null,
            readyState: 0,
            URL: ""
          };
          var s = function(t, e, n) {
            this.data = t, this.origin = e, this.lastEventId = n || ""
          };
          s.prototype = {
            data: null,
            type: "message",
            lastEventId: "",
            origin: ""
          }, "module" in e && (t.exports = r), e.EventSource = r
        }
      }
    }).call(this, n(213)(t))
  }, function(t, e, n) {
    n(1), n(247), n(232), n(165), n(236), n(255), n(75), n(241), n(256), n(166), n(167), n(242), n(248), n(168), n(93), n(169), n(257), n(258), n(259), n(198), n(199), n(200), n(201), n(260), n(249), n(261), n(233), n(202), n(203), n(204), n(205), n(128), n(235), n(206), n(262), n(207), n(208), n(209), n(210), n(129), n(211), n(263), n(264), n(265), n(250), n(266), n(267), n(212), n(243), n(214), n(215), n(216), n(217), n(218), n(219), n(220), n(221), n(222), n(223), n(234), n(224), n(251), n(225), n(226), n(238), n(244), n(227), n(240), n(245), n(237), n(252), n(228), n(253), n(268), n(229), n(246), n(230), n(127), n(254), n(269), n(239), n(270), n(231), t.exports = n(271)
  }, function(t, e) {
    var n;
    n = function() {
      return this
    }();
    try {
      n = n || new Function("return this")()
    } catch (t) {
      "object" == typeof window && (n = window)
    }
    t.exports = n
  }, function(t, e, n) {
    "use strict";
    var r = {}.propertyIsEnumerable,
      s = Object.getOwnPropertyDescriptor,
      i = s && !r.call({
        1: 2
      }, 1);
    e.f = i ? function(t) {
      var e = s(this, t);
      return !!e && e.enumerable
    } : r
  }, function(t, e, n) {
    var r = n(31),
      s = n(134),
      i = r.WeakMap;
    t.exports = "function" == typeof i && /native code/.test(s(i))
  }, function(t, e) {
    t.exports = !1
  }, function(t, e, n) {
    var r = n(43),
      s = n(154),
      i = n(109),
      o = n(59);
    t.exports = function(t, e) {
      for (var n = s(e), c = o.f, a = i.f, u = 0; u < n.length; u++) {
        var d = n[u];
        r(t, d) || c(t, d, a(e, d))
      }
    }
  }, function(t, e, n) {
    var r = n(96),
      s = n(121),
      i = n(157),
      o = n(74);
    t.exports = r("Reflect", "ownKeys") || function(t) {
      var e = s.f(o(t)),
        n = i.f;
      return n ? e.concat(n(t)) : e
    }
  }, function(t, e, n) {
    var r = n(31);
    t.exports = r
  }, function(t, e, n) {
    var r = n(111),
      s = n(56),
      i = n(122),
      o = function(t) {
        return function(e, n, o) {
          var c, a = r(e),
            u = s(a.length),
            d = i(o, u);
          if (t && n != n) {
            for (; u > d;)
              if ((c = a[d++]) != c) return !0
          } else
            for (; u > d; d++)
              if ((t || d in a) && a[d] === n) return t || d || 0;
          return !t && -1
        }
      };
    t.exports = {
      includes: o(!0),
      indexOf: o(!1)
    }
  }, function(t, e) {
    e.f = Object.getOwnPropertySymbols
  }, function(t, e, n) {
    var r = n(42),
      s = /#|\.prototype\./,
      i = function(t, e) {
        var n = c[o(t)];
        return n == u || n != a && ("function" == typeof e ? r(e) : !!e)
      },
      o = i.normalize = function(t) {
        return String(t).replace(s, ".").toLowerCase()
      },
      c = i.data = {},
      a = i.NATIVE = "N",
      u = i.POLYFILL = "P";
    t.exports = i
  }, function(t, e, n) {
    var r = n(124),
      s = n(92),
      i = n(112),
      o = n(56),
      c = function(t) {
        return function(e, n, c, a) {
          r(n);
          var u = s(e),
            d = i(u),
            l = o(u.length),
            h = t ? l - 1 : 0,
            g = t ? -1 : 1;
          if (c < 2)
            for (;;) {
              if (h in d) {
                a = d[h], h += g;
                break
              }
              if (h += g, t ? h < 0 : l <= h) throw TypeError("Reduce of empty array with no initial value")
            }
          for (; t ? h >= 0 : l > h; h += g) h in d && (a = n(a, d[h], h, u));
          return a
        }
      };
    t.exports = {
      left: c(!1),
      right: c(!0)
    }
  }, function(t, e, n) {
    "use strict";
    var r = n(42);
    t.exports = function(t, e) {
      var n = [][t];
      return !!n && r((function() {
        n.call(null, e || function() {
          throw 1
        }, 1)
      }))
    }
  }, function(t, e, n) {
    var r = n(47),
      s = n(42),
      i = n(43),
      o = Object.defineProperty,
      c = {},
      a = function(t) {
        throw t
      };
    t.exports = function(t, e) {
      if (i(c, t)) return c[t];
      e || (e = {});
      var n = [][t],
        u = !!i(e, "ACCESSORS") && e.ACCESSORS,
        d = i(e, 0) ? e[0] : a,
        l = i(e, 1) ? e[1] : void 0;
      return c[t] = !!n && !s((function() {
        if (u && !r) return !0;
        var t = {
          length: -1
        };
        u ? o(t, 1, {
          enumerable: !0,
          get: a
        }) : t[1] = 1, n.call(t, d, l)
      }))
    }
  }, function(t, e, n) {
    var r, s, i = n(31),
      o = n(163),
      c = i.process,
      a = c && c.versions,
      u = a && a.v8;
    u ? s = (r = u.split("."))[0] + r[1] : o && (!(r = o.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = o.match(/Chrome\/(\d+)/)) && (s = r[1]), t.exports = s && +s
  }, function(t, e, n) {
    var r = n(96);
    t.exports = r("navigator", "userAgent") || ""
  }, function(t, e, n) {
    var r = n(95),
      s = n(31);
    t.exports = "process" == r(s.process)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "TestProviderAdapter", (function() {
      return o
    }));
    var r = n(33),
      s = n(1),
      i = n(32);
    class o {
      getAdCode(t) {
        const e = t.split("x");
        return '<!DOCTYPE html><html><head></head><body><style type="text/css">body { text-size-adjust:none; -webkit-text-size-adjust: none; }*{margin:0;padding:0}a{text-decoration:none;outline:none}a:hover{cursor:pointer; text-indent: 0}img{border:none}ul li{list-style:none}.clearfix:after{visibility: hidden;display:block;font-size: 0;content: " ";clear: both;height:0}* html .clearfix{zoom:1} *:first-child+html .clearfix{zoom:1} h1, h2, h3, h4, h5, h6 {font-weight: normal}body{background:#f4f4f4}h3{ font-family: arial; color: #000; font-size: 35px; text-align: center; height: ' + e[1] + "px; line-height: " + e[1] + "px;}</style><h3>TEST CREATIVE</h3></body></html>"
      }
      submit(t) {
        return new Promise((e, n) => {
          const o = t && t.placement && t.placement.placementConfig,
            c = o.id,
            a = t && t.provider && t.provider.id;
          t.providerReqId = Object(i.a)(), s.metrics.markStart("ltime_" + t.providerReqId + c + a);
          const u = (new r.a).create().setEntityProperties(t.provider, o).status(1).setDummyBidProperties(t.provider, o, 0).setTestProviderProperties(this.getAdCode(t.applicableSizes.sizes[0]), "15.00").build();
          u.set("cPvRqId", t.providerReqId), u.set("dbf", "1"), s.metrics.markEnd("ltime_" + t.providerReqId + c + a), s.log.addEvent("pr", {
            data: [u]
          }), e(u)
        })
      }
    }
    s.locator.register("testprovideradapter", new o)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(80),
      s = n(1),
      i = n(2);
    class o extends r.a {
      constructor() {
        super(...arguments), this.strategyName = "dom", this.elementId = "__aax_dom"
      }
      isElementVisible() {
        return !("none" === Object(i.j)(this.element, "display"))
      }
      getPlaceholderElement() {
        const t = document.createElement("div");
        return t.id = this.elementId, t.className = "googleAdSense MediumRectangleAdPanel adv_left googleAdSense browse-banner_ad", t.style.cssText = "opacity: 0;visibility: hidden;width: 0;height: 0;position: absolute;top: -9999px;left: -9999px", t
      }
      execute() {
        return 0 !== this.executionStatus || (this.executionStatus = 1, s.metrics.mark("START" + this.strategyName), this.element = this.getPlaceholderElement(), this.task = new Promise(t => {
          Object(i.E)("@body:0", 50, e => {
            Object(i.d)(e, this.element), Object(i.v)(() => {
              this.executionStatus = 2, this.detect(), Object(i.y)(this.element), s.metrics.mark("END" + this.strategyName), t({
                name: this.name,
                state: this.abpStatus
              })
            })
          }, !1)
        })), this.task
      }
      detect() {
        this.isElementVisible() ? this.abpStatus = "2" : this.abpStatus = "1"
      }
    }
    s.locator.register("dom", new o)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(80),
      s = n(101),
      i = n(1);
    class o extends r.a {
      constructor() {
        super(...arguments), this.strategyName = "cache", this.cacheKey = "__aaxsc"
      }
      execute() {
        return 0 !== this.executionStatus || (this.executionStatus = 1, i.metrics.mark("START" + this.strategyName), this.task = new Promise(t => {
          this.executionStatus = 2;
          const e = s.a.get(this.cacheKey);
          this.abpStatus = e, i.metrics.mark("END" + this.strategyName), t({
            name: this.name,
            state: this.abpStatus
          })
        })), this.task
      }
    }
    i.locator.register("cache", new o)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "ApuRtbAdapter", (function() {
      return o
    }));
    var r = n(1),
      s = n(41),
      i = n(0);
    class o {
      constructor(t) {
        this.networkType = t
      }
      getResponse(t) {
        const e = {
            nData: t,
            nType: this.networkType
          },
          n = r.locator.resolve("resgetter");
        return Object(i.o)(n) ? n.getResponse(e) : Promise.reject()
      }
      getProviderAccountId(t, e) {
        return [t, r.app.envProperties.ip2c, e].join("_")
      }
      interpretResponse(t, e, n) {
        const i = e,
          o = Object(s.a)(t.provider, t.placement.placementConfig, i[0]);
        let c = t.applicableSizes.sizes[0];
        1 === o.get("s") && (c = o.get("size"), o.set("paId", this.getProviderAccountId(n, c)), o.set("epc", n)), o.set("size", c), o.set("cPvRqId", t.providerReqId);
        const a = Object(s.b)(t, c);
        return o.set("dbf", "1"), r.log.addEvent("pr", {
          data: [o, ...a]
        }), o
      }
      submit(t) {
        const e = t.provider,
          n = t.placement.placementConfig.id,
          i = e.id,
          o = t.applicableSizes.epcs[0],
          c = {
            siteId: o
          },
          a = Object(s.d)(t, e, c);
        a.country = t.impression.countryCode;
        const u = a.bidderRequestId;
        r.metrics.markStart("ltime_" + u + n + i), t.providerReqId = a.bidderRequestId;
        const d = {
          placement: t.placement.placementConfig,
          provider: e,
          reason: 1202
        };
        return this.getResponse(a).then(e => {
          const s = t.providerReqId;
          return r.metrics.markEnd("ltime_" + s + n + i), this.interpretResponse(t, e, o)
        }).catch(() => Promise.reject(d))
      }
    }
    r.locator.register("apuRtbAdapter", new o("apurtb")), r.locator.register("apuRtbAdapterv2", new o("apurtbv2"))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "spec", (function() {
      return u
    }));
    var r = n(46),
      s = n(1);
    const i = {
      JPY: 1
    };

    function o(t) {
      const e = {};
      return e.id = t.bidId, e.banner = {}, e.banner.w = t.sizes[0][0], e.banner.h = t.sizes[0][1], e.banner.topframe = r.d() ? 0 : 1, e.ext = {}, e.ext.siteID = t.params.siteId, !t.params.hasOwnProperty("id") || "string" != typeof t.params.id && "number" != typeof t.params.id ? e.ext.sid = "".concat(t.sizes[0][0], "x").concat(t.sizes[0][1]) : e.ext.sid = String(t.params.id), t.params.hasOwnProperty("bidFloor") && t.params.hasOwnProperty("bidFloorCur") && (e.bidfloor = t.params.bidFloor, e.bidfloorcur = t.params.bidFloorCur), e
    }

    function c(t, e) {
      const n = {};
      return i.hasOwnProperty(e) ? n.cpm = t.price / i[e] : n.cpm = t.price / 100, n.requestId = t.impid, n.width = t.w, n.height = t.h, n.ad = t.adm, n.dealId = r.b(t, "ext.dealid"), n.ttl = 300, n.netRevenue = !0, n.currency = e, n.creativeId = t.hasOwnProperty("crid") ? t.crid : "-", n.meta = {}, n.meta.networkId = r.b(t, "ext.dspid"), n.meta.brandId = r.b(t, "ext.advbrandid"), n.meta.brandName = r.b(t, "ext.advbrand"), t.adomain && t.adomain.length > 0 && (n.meta.advertiserDomains = t.adomain), n
    }

    function a(t) {
      return Array.isArray(t) && 2 === t.length && !isNaN(t[0]) && !isNaN(t[1])
    }
    const u = {
      code: ["Prebid_195", "Prebid_241"],
      name: "ixBidAdapter",
      supportedMediaTypes: ["banner"],
      gvlid: 10,
      isBidRequestValid: function(t) {
        if (!a(t.params.size)) return !1;
        if (! function(t, e) {
            if (a(t)) return t[0] === e[0] && t[1] === e[1];
            for (let n = 0; n < t.length; n++)
              if (t[n][0] === e[0] && t[n][1] === e[1]) return !0;
            return !1
          }(t.sizes, t.params.size)) return !1;
        if (t.hasOwnProperty("mediaType") && "banner" !== t.mediaType) return !1;
        if (t.hasOwnProperty("mediaTypes") && !r.b(t, "mediaTypes.banner.sizes")) return !1;
        if ("string" != typeof t.params.siteId && "number" != typeof t.params.siteId) return !1;
        const e = t.params.hasOwnProperty("bidFloor"),
          n = t.params.hasOwnProperty("bidFloorCur");
        return !e && !n || e && n && (s = t.params.bidFloor, i = t.params.bidFloorCur, Boolean("number" == typeof s && "string" == typeof i && i.match(/^[A-Z]{3}$/)));
        var s, i
      },
      buildRequests: function(t, e) {
        const n = [],
          s = [];
        let i = null,
          c = null;
        for (let e = 0; e < t.length; e++) i = t[e], c = o(i), n.push(c);
        if (window.headertag && "function" == typeof window.headertag.getIdentityInfo) {
          let t = window.headertag.getIdentityInfo();
          if (t && "object" == typeof t)
            for (const e in t)
              if (t.hasOwnProperty(e)) {
                let n = t[e];
                !n.responsePending && n.data && "object" == typeof n.data && Object.keys(n.data).length && s.push(n.data)
              }
        }
        const a = {};
        if (a.id = t[0].bidderRequestId, a.imp = n, a.site = {}, a.ext = {}, a.ext.source = "prebid", t[0].schain && (a.source = {
            ext: {
              schain: t[0].schain
            }
          }), s.length > 0 && (a.user = {}, a.user.eids = s), document.referrer && "" !== document.referrer && (a.site.ref = document.referrer), e) {
          if (e.gdprConsent) {
            const t = e.gdprConsent;
            t.hasOwnProperty("gdprApplies") && (a.regs = {
              ext: {
                gdpr: t.gdprApplies ? 1 : 0
              }
            }), t.hasOwnProperty("consentString") && (a.user = a.user || {}, a.user.ext = {
              consent: t.consentString || ""
            })
          }
          e.uspConsent && r.c(a, "regs.ext.us_privacy", e.uspConsent), e.refererInfo && (a.site.page = e.refererInfo.referer)
        }
        const u = {};
        return u.s = t[0].params.siteId, u.v = 7.2, u.r = JSON.stringify(a), u.ac = "j", u.sd = 1, {
          method: "GET",
          url: "https://htlb.casalemedia.com/cygnus",
          data: u
        }
      },
      interpretResponse: function(t) {
        const e = [];
        let n = null;
        if (!t.hasOwnProperty("body") || !t.body.hasOwnProperty("seatbid")) return e;
        const r = t.body,
          s = r.seatbid;
        for (let t = 0; t < s.length; t++) {
          if (!s[t].hasOwnProperty("bid")) continue;
          const i = s[t].bid;
          for (let t = 0; t < i.length; t++) n = c(i[t], r.cur), e.push(n)
        }
        return e
      },
      configLoader: t => ({
        siteId: t.epc
      }),
      getUserSyncs: function(t, e) {
        return t.iframeEnabled ? [{
          type: "iframe",
          url: "https://js-sec.indexww.com/um/ixmatch.html"
        }] : []
      }
    };
    r.a(u.code, (function(t) {
      s.locator.register(t, u)
    }))
  }, function(t, e, n) {
    "use strict";
    var r = n(108),
      s = n(42),
      i = n(137),
      o = n(74),
      c = n(122),
      a = n(56),
      u = n(178),
      d = i.ArrayBuffer,
      l = i.DataView,
      h = d.prototype.slice;
    r({
      target: "ArrayBuffer",
      proto: !0,
      unsafe: !0,
      forced: s((function() {
        return !new d(2).slice(1, void 0).byteLength
      }))
    }, {
      slice: function(t, e) {
        if (void 0 !== h && void 0 === e) return h.call(o(this), t);
        for (var n = o(this).byteLength, r = c(t, n), s = c(void 0 === e ? n : e, n), i = new(u(this, d))(a(s - r)), g = new l(this), p = new l(i), f = 0; r < s;) p.setUint8(f++, g.getUint8(r++));
        return i
      }
    })
  }, function(t, e, n) {
    var r = n(114);
    t.exports = function(t, e, n) {
      for (var s in e) r(t, s, e[s], n);
      return t
    }
  }, function(t, e) {
    var n = Math.abs,
      r = Math.pow,
      s = Math.floor,
      i = Math.log,
      o = Math.LN2;
    t.exports = {
      pack: function(t, e, c) {
        var a, u, d, l = new Array(c),
          h = 8 * c - e - 1,
          g = (1 << h) - 1,
          p = g >> 1,
          f = 23 === e ? r(2, -24) - r(2, -77) : 0,
          b = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0,
          m = 0;
        for ((t = n(t)) != t || t === 1 / 0 ? (u = t != t ? 1 : 0, a = g) : (a = s(i(t) / o), t * (d = r(2, -a)) < 1 && (a--, d *= 2), (t += a + p >= 1 ? f / d : f * r(2, 1 - p)) * d >= 2 && (a++, d /= 2), a + p >= g ? (u = 0, a = g) : a + p >= 1 ? (u = (t * d - 1) * r(2, e), a += p) : (u = t * r(2, p - 1) * r(2, e), a = 0)); e >= 8; l[m++] = 255 & u, u /= 256, e -= 8);
        for (a = a << e | u, h += e; h > 0; l[m++] = 255 & a, a /= 256, h -= 8);
        return l[--m] |= 128 * b, l
      },
      unpack: function(t, e) {
        var n, s = t.length,
          i = 8 * s - e - 1,
          o = (1 << i) - 1,
          c = o >> 1,
          a = i - 7,
          u = s - 1,
          d = t[u--],
          l = 127 & d;
        for (d >>= 7; a > 0; l = 256 * l + t[u], u--, a -= 8);
        for (n = l & (1 << -a) - 1, l >>= -a, a += e; a > 0; n = 256 * n + t[u], u--, a -= 8);
        if (0 === l) l = 1 - c;
        else {
          if (l === o) return n ? NaN : d ? -1 / 0 : 1 / 0;
          n += r(2, e), l -= c
        }
        return (d ? -1 : 1) * n * r(2, l - e)
      }
    }
  }, function(t, e, n) {
    var r = n(42);
    t.exports = !r((function() {
      function t() {}
      return t.prototype.constructor = null, Object.getPrototypeOf(new t) !== t.prototype
    }))
  }, function(t, e, n) {
    var r = n(55);
    t.exports = function(t) {
      if (!r(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype");
      return t
    }
  }, function(t, e, n) {
    "use strict";
    var r = n(92),
      s = n(122),
      i = n(56);
    t.exports = function(t) {
      for (var e = r(this), n = i(e.length), o = arguments.length, c = s(o > 1 ? arguments[1] : void 0, n), a = o > 2 ? arguments[2] : void 0, u = void 0 === a ? n : s(a, n); u > c;) e[c++] = t;
      return e
    }
  }, function(t, e, n) {
    var r = n(59).f,
      s = n(43),
      i = n(48)("toStringTag");
    t.exports = function(t, e, n) {
      t && !s(t = n ? t : t.prototype, i) && r(t, i, {
        configurable: !0,
        value: e
      })
    }
  }, function(t, e, n) {
    var r = n(142);
    t.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
  }, function(t, e, n) {
    var r = n(74),
      s = n(124),
      i = n(48)("species");
    t.exports = function(t, e) {
      var n, o = r(t).constructor;
      return void 0 === o || null == (n = r(o)[i]) ? e : s(n)
    }
  }, function(t, e, n) {
    n(180)("Uint8", (function(t) {
      return function(e, n, r) {
        return t(this, e, n, r)
      }
    }))
  }, function(t, e, n) {
    "use strict";
    var r = n(108),
      s = n(31),
      i = n(47),
      o = n(181),
      c = n(125),
      a = n(137),
      u = n(139),
      d = n(110),
      l = n(73),
      h = n(56),
      g = n(140),
      p = n(184),
      f = n(113),
      b = n(43),
      m = n(126),
      v = n(55),
      w = n(186),
      O = n(97),
      y = n(121).f,
      E = n(190),
      j = n(193).forEach,
      S = n(196),
      I = n(59),
      C = n(109),
      A = n(117),
      P = n(197),
      R = A.get,
      T = A.set,
      x = I.f,
      D = C.f,
      _ = Math.round,
      M = s.RangeError,
      k = a.ArrayBuffer,
      L = a.DataView,
      N = c.NATIVE_ARRAY_BUFFER_VIEWS,
      B = c.TYPED_ARRAY_TAG,
      F = c.TypedArray,
      q = c.TypedArrayPrototype,
      V = c.aTypedArrayConstructor,
      z = c.isTypedArray,
      U = function(t, e) {
        for (var n = 0, r = e.length, s = new(V(t))(r); r > n;) s[n] = e[n++];
        return s
      },
      $ = function(t, e) {
        x(t, e, {
          get: function() {
            return R(this)[e]
          }
        })
      },
      H = function(t) {
        var e;
        return t instanceof k || "ArrayBuffer" == (e = m(t)) || "SharedArrayBuffer" == e
      },
      W = function(t, e) {
        return z(t) && "symbol" != typeof e && e in t && String(+e) == String(e)
      },
      G = function(t, e) {
        return W(t, e = f(e, !0)) ? d(2, t[e]) : D(t, e)
      },
      Y = function(t, e, n) {
        return !(W(t, e = f(e, !0)) && v(n) && b(n, "value")) || b(n, "get") || b(n, "set") || n.configurable || b(n, "writable") && !n.writable || b(n, "enumerable") && !n.enumerable ? x(t, e, n) : (t[e] = n.value, t)
      };
    i ? (N || (C.f = G, I.f = Y, $(q, "buffer"), $(q, "byteOffset"), $(q, "byteLength"), $(q, "length")), r({
      target: "Object",
      stat: !0,
      forced: !N
    }, {
      getOwnPropertyDescriptor: G,
      defineProperty: Y
    }), t.exports = function(t, e, n) {
      var i = t.match(/\d+$/)[0] / 8,
        c = t + (n ? "Clamped" : "") + "Array",
        a = "get" + t,
        d = "set" + t,
        f = s[c],
        b = f,
        m = b && b.prototype,
        I = {},
        C = function(t, e) {
          x(t, e, {
            get: function() {
              return function(t, e) {
                var n = R(t);
                return n.view[a](e * i + n.byteOffset, !0)
              }(this, e)
            },
            set: function(t) {
              return function(t, e, r) {
                var s = R(t);
                n && (r = (r = _(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), s.view[d](e * i + s.byteOffset, r, !0)
              }(this, e, t)
            },
            enumerable: !0
          })
        };
      N ? o && (b = e((function(t, e, n, r) {
        return u(t, b, c), P(v(e) ? H(e) ? void 0 !== r ? new f(e, p(n, i), r) : void 0 !== n ? new f(e, p(n, i)) : new f(e) : z(e) ? U(b, e) : E.call(b, e) : new f(g(e)), t, b)
      })), O && O(b, F), j(y(f), (function(t) {
        t in b || l(b, t, f[t])
      })), b.prototype = m) : (b = e((function(t, e, n, r) {
        u(t, b, c);
        var s, o, a, d = 0,
          l = 0;
        if (v(e)) {
          if (!H(e)) return z(e) ? U(b, e) : E.call(b, e);
          s = e, l = p(n, i);
          var f = e.byteLength;
          if (void 0 === r) {
            if (f % i) throw M("Wrong length");
            if ((o = f - l) < 0) throw M("Wrong length")
          } else if ((o = h(r) * i) + l > f) throw M("Wrong length");
          a = o / i
        } else a = g(e), s = new k(o = a * i);
        for (T(t, {
            buffer: s,
            byteOffset: l,
            byteLength: o,
            length: a,
            view: new L(s)
          }); d < a;) C(t, d++)
      })), O && O(b, F), m = b.prototype = w(q)), m.constructor !== b && l(m, "constructor", b), B && l(m, B, c), I[c] = b, r({
        global: !0,
        forced: b != f,
        sham: !N
      }, I), "BYTES_PER_ELEMENT" in b || l(b, "BYTES_PER_ELEMENT", i), "BYTES_PER_ELEMENT" in m || l(m, "BYTES_PER_ELEMENT", i), S(c)
    }) : t.exports = function() {}
  }, function(t, e, n) {
    var r = n(31),
      s = n(42),
      i = n(182),
      o = n(125).NATIVE_ARRAY_BUFFER_VIEWS,
      c = r.ArrayBuffer,
      a = r.Int8Array;
    t.exports = !o || !s((function() {
      a(1)
    })) || !s((function() {
      new a(-1)
    })) || !i((function(t) {
      new a, new a(null), new a(1.5), new a(t)
    }), !0) || s((function() {
      return 1 !== new a(new c(2), 1, void 0).length
    }))
  }, function(t, e, n) {
    var r = n(48)("iterator"),
      s = !1;
    try {
      var i = 0,
        o = {
          next: function() {
            return {
              done: !!i++
            }
          },
          return: function() {
            s = !0
          }
        };
      o[r] = function() {
        return this
      }, Array.from(o, (function() {
        throw 2
      }))
    } catch (t) {}
    t.exports = function(t, e) {
      if (!e && !s) return !1;
      var n = !1;
      try {
        var i = {};
        i[r] = function() {
          return {
            next: function() {
              return {
                done: n = !0
              }
            }
          }
        }, t(i)
      } catch (t) {}
      return n
    }
  }, function(t, e, n) {
    var r = {};
    r[n(48)("toStringTag")] = "z", t.exports = "[object z]" === String(r)
  }, function(t, e, n) {
    var r = n(185);
    t.exports = function(t, e) {
      var n = r(t);
      if (n % e) throw RangeError("Wrong offset");
      return n
    }
  }, function(t, e, n) {
    var r = n(91);
    t.exports = function(t) {
      var e = r(t);
      if (e < 0) throw RangeError("The argument can't be less than 0");
      return e
    }
  }, function(t, e, n) {
    var r, s = n(74),
      i = n(187),
      o = n(123),
      c = n(120),
      a = n(189),
      u = n(133),
      d = n(118),
      l = d("IE_PROTO"),
      h = function() {},
      g = function(t) {
        return "<script>" + t + "<\/script>"
      },
      p = function() {
        try {
          r = document.domain && new ActiveXObject("htmlfile")
        } catch (t) {}
        var t, e;
        p = r ? function(t) {
          t.write(g("")), t.close();
          var e = t.parentWindow.Object;
          return t = null, e
        }(r) : ((e = u("iframe")).style.display = "none", a.appendChild(e), e.src = String("javascript:"), (t = e.contentWindow.document).open(), t.write(g("document.F=Object")), t.close(), t.F);
        for (var n = o.length; n--;) delete p.prototype[o[n]];
        return p()
      };
    c[l] = !0, t.exports = Object.create || function(t, e) {
      var n;
      return null !== t ? (h.prototype = s(t), n = new h, h.prototype = null, n[l] = t) : n = p(), void 0 === e ? n : i(n, e)
    }
  }, function(t, e, n) {
    var r = n(47),
      s = n(59),
      i = n(74),
      o = n(188);
    t.exports = r ? Object.defineProperties : function(t, e) {
      i(t);
      for (var n, r = o(e), c = r.length, a = 0; c > a;) s.f(t, n = r[a++], e[n]);
      return t
    }
  }, function(t, e, n) {
    var r = n(136),
      s = n(123);
    t.exports = Object.keys || function(t) {
      return r(t, s)
    }
  }, function(t, e, n) {
    var r = n(96);
    t.exports = r("document", "documentElement")
  }, function(t, e, n) {
    var r = n(92),
      s = n(56),
      i = n(191),
      o = n(192),
      c = n(144),
      a = n(125).aTypedArrayConstructor;
    t.exports = function(t) {
      var e, n, u, d, l, h, g = r(t),
        p = arguments.length,
        f = p > 1 ? arguments[1] : void 0,
        b = void 0 !== f,
        m = i(g);
      if (null != m && !o(m))
        for (h = (l = m.call(g)).next, g = []; !(d = h.call(l)).done;) g.push(d.value);
      for (b && p > 2 && (f = c(f, arguments[2], 2)), n = s(g.length), u = new(a(this))(n), e = 0; n > e; e++) u[e] = b ? f(g[e], e) : g[e];
      return u
    }
  }, function(t, e, n) {
    var r = n(126),
      s = n(143),
      i = n(48)("iterator");
    t.exports = function(t) {
      if (null != t) return t[i] || t["@@iterator"] || s[r(t)]
    }
  }, function(t, e, n) {
    var r = n(48),
      s = n(143),
      i = r("iterator"),
      o = Array.prototype;
    t.exports = function(t) {
      return void 0 !== t && (s.Array === t || o[i] === t)
    }
  }, function(t, e, n) {
    var r = n(144),
      s = n(112),
      i = n(92),
      o = n(56),
      c = n(194),
      a = [].push,
      u = function(t) {
        var e = 1 == t,
          n = 2 == t,
          u = 3 == t,
          d = 4 == t,
          l = 6 == t,
          h = 7 == t,
          g = 5 == t || l;
        return function(p, f, b, m) {
          for (var v, w, O = i(p), y = s(O), E = r(f, b, 3), j = o(y.length), S = 0, I = m || c, C = e ? I(p, j) : n || h ? I(p, 0) : void 0; j > S; S++)
            if ((g || S in y) && (w = E(v = y[S], S, O), t))
              if (e) C[S] = w;
              else if (w) switch (t) {
            case 3:
              return !0;
            case 5:
              return v;
            case 6:
              return S;
            case 2:
              a.call(C, v)
          } else switch (t) {
            case 4:
              return !1;
            case 7:
              a.call(C, v)
          }
          return l ? -1 : u || d ? d : C
        }
      };
    t.exports = {
      forEach: u(0),
      map: u(1),
      filter: u(2),
      some: u(3),
      every: u(4),
      find: u(5),
      findIndex: u(6),
      filterOut: u(7)
    }
  }, function(t, e, n) {
    var r = n(55),
      s = n(195),
      i = n(48)("species");
    t.exports = function(t, e) {
      var n;
      return s(t) && ("function" != typeof(n = t.constructor) || n !== Array && !s(n.prototype) ? r(n) && null === (n = n[i]) && (n = void 0) : n = void 0), new(void 0 === n ? Array : n)(0 === e ? 0 : e)
    }
  }, function(t, e, n) {
    var r = n(95);
    t.exports = Array.isArray || function(t) {
      return "Array" == r(t)
    }
  }, function(t, e, n) {
    "use strict";
    var r = n(96),
      s = n(59),
      i = n(48),
      o = n(47),
      c = i("species");
    t.exports = function(t) {
      var e = r(t),
        n = s.f;
      o && e && !e[c] && n(e, c, {
        configurable: !0,
        get: function() {
          return this
        }
      })
    }
  }, function(t, e, n) {
    var r = n(55),
      s = n(97);
    t.exports = function(t, e, n) {
      var i, o;
      return s && "function" == typeof(i = e.constructor) && i !== n && r(o = i.prototype) && o !== n.prototype && s(t, o), t
    }
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "YbncaAdapter", (function() {
      return l
    }));
    var r = n(93),
      s = n(1),
      i = n(11),
      o = n(37),
      c = n(9),
      a = n(10),
      u = n(70),
      d = n(0);
    class l extends r.HBClientAdapter {
      manipulateBids(t, e, n) {
        return t.map(t => {
          let r = l.appendChannelToAdcode(t.adcode),
            s = t.get("bd") || "";
          return n.isPureNativeSlot() && t.set("adTp", "NATIVE"), s = l.updateWithMacro(s, l.bidRegexString, l.bidReplaceValue), r = l.updateWithMacro(r, l.adcodeRegexString, l.adcodeReplaceValue), t.set("adc", l.BidMacroMap(t, e, !0).resolveMacros(r)), t.set("bd", l.BidMacroMap(t, e, !1).resolveMacros(s)), t
        })
      }
      static updateWithMacro(t, e, n) {
        const r = new RegExp(e, l.replaceFlag);
        return t = t.replace(r, n)
      }
      static computeLastFlag() {
        let t = "0";
        return Object(d.h)(window.aax.isLastSlide) && (t = window.aax.isLastSlide() ? "1" : "0"), t
      }
      static BidMacroMap(t, e, n) {
        const r = Object(u.a)();
        return new o.a(l.YbncaRegexString).input("${ref_url}", e.referrerUrl).input("${req_url}", e.publisherUrl).input("${last_flag}", l.computeLastFlag()).input("${refresh_counter}", "0").input("${gdpr}", a.a.isApplicable() ? "1" : "0").input("${https}", t.https).input("${chnm}", Object(d.o)(r) ? r : "${dms_strategy}").input("${abte}", "").input("${ClientYLog}", l.clientYLog(n)).input("${dmm}", t.get("strat") || "")
      }
      static clientYLog(t) {
        let e = "||",
          n = "=";
        t && (e = Object(c.d)(e), n = Object(c.d)(n));
        const r = Object(u.a)();
        let s = "";
        return Object(d.o)(r) && Object(d.p)(r) && (s = e + "pt" + n + r), "ogBid" + n + "${ogbid}" + e + "cbdp" + n + "${pbnet}" + e + "bflag" + n + "0" + e + "dmm" + n + "${dms_strategy}" + e + "sobp" + n + "${sc_ogbdp}" + e + "ddiv" + n + "${ddiv}" + s
      }
      static appendChannelToAdcode(t) {
        let e = 'medianet_chnm = "${chnm}"; ';
        return Object(u.b)() && (e += 'medianet_dms = "${dmm}";'), e += "medianet_chnm2", t.replace("medianet_chnm2", e)
      }
    }
    l.YbncaRegexString = "[$]{([A-Za-z_]+)}", l.bidRegexString = "\\|bid=([+-]?\\d+(\\.\\d+)?)", l.adcodeRegexString = "%7Cbid%3\\D([+-]?\\d+(\\.\\d+)?)", l.bidReplaceValue = "|bid=${bid}", l.adcodeReplaceValue = "%7Cbid%3D${bid}", l.replaceFlag = "g", s.locator.register("ybncaadapter", Object(i.a)(new l))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(81),
      s = n(29),
      i = n(20),
      o = n(17),
      c = n(1);
    const a = s.a.getConfigOf("ccpa"),
      u = new r.a(a, i.a);
    o.a.register(u), c.locator.register("ccpasrv", u)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(81),
      s = n(29),
      i = n(17),
      o = n(58),
      c = n(1);
    const a = s.a.getConfigOf("coppa"),
      u = new r.a(a, o.a);
    i.a.register(u), c.locator.register("cpasrv", u)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(81),
      s = n(29),
      i = n(17),
      o = n(26),
      c = n(1);
    const a = s.a.getConfigOf("gdpr"),
      u = new r.a(a, o.a);
    i.a.register(u), c.locator.register("gdprsrv", u)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1),
      s = n(11);
    const i = {
      addObserver(t, e) {
        const n = r.locator.resolve(t);
        return !!n && (n.addObserver(e), !0)
      },
      reset(t) {
        const e = r.locator.resolve(t);
        return !!e && (e.reset(), !0)
      }
    };
    r.locator.register("simpleinventoryservice", Object(s.a)(i))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "inventoryPlacement", (function() {
      return i
    }));
    var r = n(1),
      s = n(128);
    const i = t => t.map(t => {
      const e = s.simpleInventoryPlacementService.getPlacementID(t);
      return e ? t.setProp("placementID", e) : t
    });
    r.locator.register("inventoryPlacement", i)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "aaxFreshRefreshSlot", (function() {
      return o
    }));
    var r = n(1);
    const s = {},
      i = {},
      o = t => t.map(t => (2 !== t.state && 3 !== t.state || s[t.domRef] || (t.state = 1), s[t.domRef] = !0, i[t.domRef] || (t.onStateChange(c), i[t.domRef] = !0), t));

    function c(t, e, n) {
      5 !== e && 6 !== e || (s[n.domRef] = !1)
    }
    r.locator.register("aaxFreshRefreshSlot", o)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1);
    r.locator.register("aaxSlotDebugLogger", t => (r.app.emit("logSlots"), t))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "targetService", (function() {
      return o
    }));
    var r = n(1),
      s = n(0),
      i = n(11);
    const o = {
      getTargetingMap: (t, e) => {
        const n = r.locator.resolve(t);
        if (!Object(s.o)(n)) throw new Error("Handler unavailable to fetch targets");
        return n.getTargets(e)
      }
    };
    r.locator.register("targetingservice", Object(i.a)(o))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "AdCodeHandler", (function() {
      return g
    }));
    var r = n(16),
      s = n(18),
      i = n(19),
      o = n(1),
      c = n(21),
      a = n(49),
      u = n(35),
      d = n(4),
      l = n(0),
      h = n(13);
    class g {
      constructor() {
        this.EVENT_ID = "adc", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(h.c)(this.config.loggingPercentage), this.logCollection = null, this.adCodeLogged = {}, this.dispatcher = i.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta)
      }
      static isEnabledForProvider(t) {
        return d.f.getConfigOf(t).get("adc") || !1
      }
      handleEvent(t, e) {
        const n = t.data.auctionSerial,
          r = t.data.bid,
          i = t.data.size,
          o = n + "-" + r.providerId;
        if (this.isLogDisabled || this.adCodeLogged[o] || !g.isEnabledForProvider(r.providerId) || !Object(l.o)(r.adcode)) return;
        this.adCodeLogged[o] = !0, Object(l.o)(this.logCollection) || (this.logCollection = new s.a(this.EVENT_ID));
        let d = new c.a;
        d = new a.a(d, r, {
          size: i
        }), d = new u.a(d, r.providerId), d.getAll().set("sfulg", r.get("pcrid")).set("dgf", r.adcode).set("oshu", this.config.loggingPercentage), this.logCollection.add(d.getAll()), this.dispatcher.fire(this.logCollection, this.EVENT_ID, {
          method: this.config.method,
          tags: [this.EVENT_ID],
          type: "beacon"
        }), this.logCollection = null
      }
    }
    const p = new g;
    o.locator.register(p.EVENT_ID, p)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "AdPerformanceMeasurement", (function() {
      return j
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(0),
      a = n(21),
      u = n(35),
      d = n(50),
      l = n(60),
      h = n(61),
      g = n(62),
      p = n(63),
      f = n(64),
      b = n(82),
      m = n(51),
      v = n(49),
      w = n(1),
      O = n(65),
      y = n(24),
      E = n(5);
    class j {
      constructor(t) {
        this.EVENT_ID = "adp", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(s.c)(this.config.loggingPercentage), this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta), this.eventType = t
      }
      addAdditionalProperties(t, e, n) {
        const r = j.getScrollPosition();
        t.getAll().set("uph", e.get("rme")).set("ud_vc", e.get("ra_sz")).set("hywwbs", this.eventType).set("vsrvw", Object(E.a)(r.top)).set("vsrvo", Object(E.a)(r.left)), Object(c.o)(n.mousePos) && t.getAll().set("psrva", Object(E.a)(n.mousePos.x)).set("psrvb", Object(E.a)(n.mousePos.y)), Object(c.o)(n.strategyUsed) && t.getAll().set("dsvwudw", n.strategyUsed), Object(c.o)(n.adUnitPath) && Object(c.q)(n.adUnitPath) && t.getAll().set("dxsdwk", n.adUnitPath), Object(c.o)(n.isPageVisible) && t.getAll().set("lvsy", n.isPageVisible ? "1" : "0")
      }
      handleEvent(t, e = !0) {
        if (this.isLogDisabled) return;
        Object(c.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID));
        const n = this.getLogCollectionItem(t);
        this.logCollection.add(n.getAll()), e && this.fire()
      }
      getLogCollectionItem(t) {
        const e = t.data.auctioneer,
          n = t.data.winner,
          r = e.placementSubmitted.domReference,
          s = t.data.adPerfEventData,
          i = {
            dfpDivID: r
          };
        let o = new a.a;
        return o = new u.a(o, n.providerId), o = new d.a(o, n.placementId), o = new l.a(o, e), o = new h.a(o, n), o = new g.a(o, n), o = new p.a(o, n), o = new b.a(o, e), o = new f.a(o, n), o = new v.a(o, n, i), o = new O.a(o, n), Object(c.o)(r) && (o = new m.a(o, r)), this.addAdditionalProperties(o, n, s), j.calculateRendererTime(o, e), o
      }
      static calculateRendererTime(t, e) {
        const n = e.auctionId;
        w.metrics.markEnd("rti_" + n);
        let r = -1;
        void 0 !== n && (r = w.metrics.measure("rti_" + n)), t.getAll().set("uwl", r)
      }
      static getScrollPosition() {
        return {
          left: window.pageXOffset || document.documentElement.scrollLeft || 0,
          top: window.pageYOffset || document.documentElement.scrollTop || 0
        }
      }
      fire() {
        Object(c.o)(this.logCollection) && (this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null)
      }
    }
    const S = new j(1);
    w.locator.register("vimp", S), y.a.on("lgTrigger", () => S.fire(), !1);
    const I = new j(2);
    w.locator.register("adclick", I)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "AuctionParticipantHandler", (function() {
      return R
    }));
    var r = n(16),
      s = n(18),
      i = n(19),
      o = n(21),
      c = n(35),
      a = n(50),
      u = n(60),
      d = n(61),
      l = n(62),
      h = n(63),
      g = n(64),
      p = n(83),
      f = n(84),
      b = n(82),
      m = n(49),
      v = n(0),
      w = n(51),
      O = n(1),
      y = n(24),
      E = n(13),
      j = n(85),
      S = n(65),
      I = n(86),
      C = n(102),
      A = n(87),
      P = n(103);
    class R {
      constructor() {
        this.EVENT_ID = "ap", this.PMP_EVENT_ID = "pmpap", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogEnabled = !Object(E.c)(this.config.loggingPercentage), this.isLogEnabledForPrivateAuction = this.isLogEnabled, this.pmpLoggingPercentage = this.config.loggingPercentage, this.logCollection = null, this.dispatcher = i.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta), this.overridePrivateDealLoggingValues()
      }
      overridePrivateDealLoggingValues() {
        try {
          const t = r.a.getConfigOf(this.PMP_EVENT_ID);
          this.pmpLoggingPercentage = t.loggingPercentage, this.isLogEnabledForPrivateAuction = !Object(E.c)(this.pmpLoggingPercentage)
        } catch (t) {}
      }
      static addAdditionalProperties(t, e, n) {
        let r = e.get("iwb") || "0"; - 1 !== n.findIndex(t => e.providerId === t.providerId) && (r = "1"), t.getAll().set("lze", r).set("dfvq", e.get("acn") || "1")
      }
      handleEvent(t, e) {
        const n = t.data.auctioneer,
          r = t.data.bids,
          s = t.data.slotElementId || n.placementSubmitted.domReference || "",
          i = O.locator.resolve("auctionhelper");
        let o = [];
        Object(v.o)(i) && (o = i.getWinners(n)), r.filter(t => this.hasToBeLogged(t)).forEach(t => {
          this.handleBidResponseLogging(t, o, n, s)
        }), e && this.fire()
      }
      hasToBeLogged(t) {
        return t.isPrivateDeal() ? this.isLogEnabledForPrivateAuction : this.isLogEnabled
      }
      setLoggingPercentage(t, e) {
        const n = e.isPrivateDeal() ? this.pmpLoggingPercentage : this.config.loggingPercentage;
        t.getAll().set("oshu", n)
      }
      static handleClientRuleLogging(t) {
        const e = O.locator.resolve("clientconfigrule");
        if (!Object(v.o)(e) || !Object(v.o)(e.getRule())) return t;
        const n = e.getRule();
        return t = new P.a(t, n)
      }
      handleBidResponseLogging(t, e, n, r) {
        let i = new o.a;
        Object(v.o)(this.logCollection) || (this.logCollection = new s.a(this.EVENT_ID));
        const O = {
          dfpDivID: r
        };
        i = new c.a(i, t.providerId), i = new a.a(i, t.placementId), i = new u.a(i, n), i = new d.a(i, t), i = new l.a(i, t), i = new h.a(i, t), i = new g.a(i, t), i = new p.a(i, t.get("mlogs")), i = new f.a(i, t.get("sp")), i = new j.a(i, t.get("pageCat")), i = new b.a(i, n), i = new m.a(i, t, O), i = new S.a(i, t), i = new w.a(i, r), i = new C.a(i, t), i = new I.a(i, n), i = new A.a(i, n), i = R.handleClientRuleLogging(i), this.setLoggingPercentage(i, t), R.addAdditionalProperties(i, t, e), this.logCollection.add(i.getAll())
      }
      fire() {
        Object(v.o)(this.logCollection) && (this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null)
      }
    }
    const T = new R;
    O.locator.register(T.EVENT_ID, T), y.a.on("lgTrigger", () => T.fire(), !1)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "AutoRefreshHandler", (function() {
      return l
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(0),
      a = n(21),
      u = n(1),
      d = n(24);
    class l {
      constructor() {
        this.EVENT_ID = "ar", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(s.c)(this.config.loggingPercentage), this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta)
      }
      static getAutoRefreshTime(t) {
        let e = -1;
        return Object(c.o)(t) && (e = u.metrics.measure("auto_ref_time_" + t)), e
      }
      handleEvent(t, e) {
        if (this.isLogDisabled) return;
        Object(c.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID));
        const n = t.data.autoRefreshProp,
          r = new a.a;
        r.getAll().set("fulg", n.crid).set("gisGly", n.divId).set("ufwu", n.refCount).set("vc", n.size).set("duw", l.getAutoRefreshTime(n.divId)).set("oshu", this.config.loggingPercentage), this.logCollection.add(r.getAll()), e && this.fire()
      }
      fire() {
        Object(c.o)(this.logCollection) && (this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null)
      }
    }
    const h = new l;
    u.locator.register(h.EVENT_ID, h), d.a.on("lgTrigger", () => h.fire(), !1)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "AuctionWinnerPostLogHandler", (function() {
      return u
    }));
    var r = n(16),
      s = n(18),
      i = n(19),
      o = n(1),
      c = n(129),
      a = n(0);
    class u extends c.AuctionWinnerLogHandler {
      constructor() {
        super(), this.EVENT_ID = "awp", this.config = r.a.getConfigOf("aw"), this.logCollectionForPost = null, this.requestOption = {
          method: "POST",
          tags: [this.EVENT_ID],
          type: "beacon"
        }, this.dispatcherForPost = i.a.getDispatcher("POST", this.EVENT_ID, this.config.meta)
      }
      dispatchItem(t) {
        Object(a.o)(this.logCollectionForPost) || (this.logCollectionForPost = new s.a("aw")), this.logCollectionForPost.add(t.getAll()), this.dispatcherForPost.fire(this.logCollectionForPost, "aw", this.requestOption), this.logCollectionForPost = null
      }
    }
    const d = new u;
    o.locator.register(d.EVENT_ID, d)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "RuleEngineHandler", (function() {
      return h
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(0),
      a = n(21),
      u = n(1),
      d = n(24),
      l = n(75);
    class h {
      constructor() {
        this.EVENT_ID = "re", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(s.c)(this.config.loggingPercentage), this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta)
      }
      handleEvent(t, e) {
        if (this.isLogDisabled) return;
        Object(c.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID));
        const n = t.data.ruleEngineProp,
          r = new a.a;
        r.getAll().set("gisdgsdwk", n.adUnitPath).set("his", n.encryptedFloorPrice).set("iis", n.finalFloorPrice).set("pgn", n.maxDynamicKey).set("pgi", n.maxDynamicFloor).set("uiv", n.ruleFetchStatus).set("ui", n.ruleFloor).set("us", n.rulePriority).set("vuf", n.source).set("oshu", this.config.loggingPercentage), this.logCollection.add(r.getAll()), e && this.fire()
      }
      fire() {
        Object(c.o)(this.logCollection) && (this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null)
      }
    }
    const g = new h;
    u.locator.register(g.EVENT_ID, g), d.a.on("lgTrigger", () => g.fire(), !1), l.mdom.onDOMLoad(() => d.a.timer("lgTrigger", 2e3))
  }, function(t, e) {
    t.exports = function(t) {
      if (!t.webpackPolyfill) {
        var e = Object.create(t);
        e.children || (e.children = []), Object.defineProperty(e, "loaded", {
          enumerable: !0,
          get: function() {
            return e.l
          }
        }), Object.defineProperty(e, "id", {
          enumerable: !0,
          get: function() {
            return e.i
          }
        }), Object.defineProperty(e, "exports", {
          enumerable: !0
        }), e.webpackPolyfill = 1
      }
      return e
    }
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(105),
      s = n(90),
      i = n(14),
      o = n(1),
      c = n(0),
      a = n(38);
    class u extends r.a {
      constructor() {
        const t = s.a.getConfigOf("stream");
        super(t.requestLimit, t.encryptionVersion)
      }
      static parseResponseProviderInfo(t, e) {
        e.setResponseProviderInfo(t)
      }
      static parseResponseMeta(t, e) {
        e.setResponseMeta(t)
      }
      static parseResponseMetaSSP(t, e) {
        e.setResponseSSPMeta(t)
      }
      addMessageListenersToSource(t) {
        const e = t => {
          const e = this.deMultiplexer.getResponse(t);
          this.resolveClientInvalidResponse(this.deMultiplexer.getCreativeIdProviderMap(t), e)
        };
        t.addEventListener("metaSSP", t => {
          this.deMultiplexer.getAllFanoutIndices().forEach(e => {
            const n = Object(i.b)(t.data),
              r = this.deMultiplexer.getResponse(e);
            u.parseResponseMetaSSP(n, r)
          })
        }, !1), t.addEventListener("closeSSP", n => {
          "CLOSE" === n.data.toString() && this.deMultiplexer.getAllFanoutIndices().forEach(t => {
            e(t)
          }), t.close()
        }, !1), t.addEventListener("error", () => {
          this.deMultiplexer.getAllFanoutIndices().forEach(t => {
            e(t)
          }), t.close()
        }, !1), this.deMultiplexer.getAllFanoutIndices().forEach(n => {
          const r = n;
          t.addEventListener(Object(a.a)("errorSSP", r), t => {
            e(r)
          }), t.addEventListener(Object(a.a)("close", r), t => {
            "CLOSE" === t.data.toString() && e(r)
          }), t.addEventListener(Object(a.a)("pinfo", r), t => {
            const e = Object(i.b)(t.data),
              n = this.deMultiplexer.getResponse(r);
            u.parseResponseProviderInfo(e, n)
          }, !1), t.addEventListener(Object(a.a)("resp", r), t => {
            const e = Object(i.b)(t.data),
              n = this.deMultiplexer.getResponse(r);
            this.handle(e, n)
          }, !1), t.addEventListener(Object(a.a)("meta", r), t => {
            const e = Object(i.b)(t.data),
              n = this.deMultiplexer.getResponse(r);
            u.parseResponseMeta(e, n)
          })
        })
      }
      submitRequest(t) {
        const e = o.locator.resolve("streamnetworkservice");
        if (this.state = 2, !Object(c.o)(e)) throw new Error("Network Service is not available");
        const n = e.stream({
          payload: t,
          url: u.bidStreamUrl
        }, {
          method: "GET",
          tags: ["sbr"],
          type: "es"
        });
        n && this.addMessageListenersToSource(n)
      }
      fire(t, e) {
        if (2 === this.state) return;
        this.state = 2, this.deMultiplexer.splitRequests(this.scheduledPlacementRequests);
        const n = this.getSspRequest(t, e),
          r = n.properties.get("vvsUhtLg");
        this.startClockForSSPRequests(r), this.submitRequest(n.buildParameters())
      }
    }
    u.bidStreamUrl = s.a.getConfigOf("stream").apiUrl;
    o.locator.register("stream", () => new u)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(105),
      s = n(90),
      i = n(0),
      o = n(1);
    class c extends r.a {
      constructor() {
        const t = s.a.getConfigOf("script");
        super(t.requestLimit, t.encryptionVersion)
      }
      handleSSPResponse(t, e) {
        const n = t.tl,
          r = this.deMultiplexer.getResponse(e).setResponseSSPMeta(t.metaSSP).setResponseMeta(t.meta).setResponseProviderInfo(t.pinfo).setResponseTagList(n);
        Object(i.c)(n, ({
          bl: t = {}
        }) => {
          Object(i.c)(t, t => {
            this.handle(t, r)
          })
        }), this.resolveClientInvalidResponse(this.deMultiplexer.getCreativeIdProviderMap(e), r)
      }
      submitRequest(t) {
        const e = {
            payload: t,
            url: c.bidScriptUrl
          },
          n = o.locator.resolve("simplenetworkservice");
        if (!Object(i.o)(n)) throw new Error("Network Service is not available");
        n.submit([e], {
          method: "GET",
          tags: ["sbr"],
          type: "scriptType"
        })
      }
      fire(t, e) {
        if (2 === this.state) return;
        this.state = 2, this.deMultiplexer.splitRequests(this.scheduledPlacementRequests), this.deMultiplexer.setCallbacks((t, e) => {
          this.handleSSPResponse(t, e)
        });
        const n = this.getSspRequest(t, e),
          r = n.properties.get("vvsUhtLg");
        this.startClockForSSPRequests(r), this.submitRequest(n.buildParameters())
      }
    }
    c.bidScriptUrl = s.a.getConfigOf("script").apiUrl;
    o.locator.register("script", () => new c)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1),
      s = n(11),
      i = n(0);
    const o = ["GET"];
    const c = {
      supports: t => o.indexOf(t) > -1,
      process(t, e) {
        const n = t.map(t => function(t, e) {
          return new Promise((e, n) => {
            const r = new Image;
            Object(i.q)(t.payload) ? r.src = t.url + "?" + t.payload : r.src = t.url, r.addEventListener("load", () => e(!0)), r.addEventListener("error", () => e(!1))
          })
        }(t));
        return Promise.all(n)
      }
    };
    r.locator.register("image", Object(s.a)(c))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1),
      s = n(0);
    const i = ["GET"];
    const o = {
      supports: t => i.indexOf(t) > -1,
      process(t, e) {
        const n = t.map(t => function(t, e) {
          return new Promise((e, n) => {
            const r = document.createElement("script"),
              i = document.getElementsByTagName("script")[0];
            let o = !1;
            r.type = "text/javascript", r.async = !0;
            const c = Object(s.q)(t.payload) ? "?" + t.payload : "";
            if (r.src = t.url + c, r.onload = r.onreadystatechange = function() {
                o || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (o = !0, e(!0))
              }, r.onerror = () => {
                e(!1)
              }, !i.parentNode) return e(!1);
            i.parentNode.insertBefore(r, i)
          })
        }(t));
        return Promise.all(n)
      }
    };
    r.locator.register("scriptType", o)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1);
    const s = ["POST"];
    const i = {
      supports: t => s.indexOf(t) > -1,
      process(t, e) {
        const n = t.map(t => function(t, e) {
          return new Promise((e, n) => {
            window.navigator && "function" != typeof window.navigator.sendBeacon && n();
            e(window.navigator.sendBeacon(t.url, t.payload))
          })
        }(t));
        return Promise.all(n)
      }
    };
    r.locator.register("beacon", i)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1),
      s = n(130),
      i = n(0);
    const o = ["GET", "POST"];

    function c(t, e) {
      return new Promise((n, r) => {
        let o, c = !1;
        o = Object(i.h)(XMLHttpRequest) ? new XMLHttpRequest : Object(i.h)(s.XDomainRequest) ? new s.XDomainRequest : new ActiveXObject("Microsoft.XMLHTTP"), "withCredentials" in o && (o.withCredentials = e.withCredentials || !0);
        const a = function(t, e) {
          if ("POST" === e.method) return t.url;
          let n = t.url;
          return !Object(i.a)(n, "?") && Object(i.q)(t.payload) && (n += "?"), n + t.payload
        }(t, e);
        o.open(e.method, a, !0), o.onload = o.onreadystatechange = () => {
          c || 4 !== o.readyState || (c = !0, 200 === o.status ? n(o.response || o.responseText) : r(""))
        }, o.onerror = () => {
          r("")
        }, o.send(t.payload)
      })
    }
    const a = {
      supports: t => o.indexOf(t) > -1,
      process(t, e) {
        const n = t.map(t => c(t, e));
        return Promise.all(n)
      }
    };
    r.locator.register("xhr", a)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(0),
      s = n(2),
      i = n(14),
      o = n(1),
      c = n(11);
    const a = ["GET"];

    function u(t, e) {
      return new Promise((n, o) => {
        Object(r.o)(e) && Object(r.o)(t) || o("Failed to create Iframe");
        let c = e.frameData;
        Object(r.o)(c) || (c = {
          content: null,
          id: "",
          onloadFunction: null,
          properties: {}
        });
        const a = c.properties || {},
          u = Object(i.a)({}, a);
        let d = t.url;
        !Object(r.a)(d, "?") && Object(r.q)(t.payload) && (d += "?"), u.src = d + t.payload;
        const l = function t(e, n, i, o) {
          let c;
          if (!(i = Object(r.o)(i) ? i : Object(s.w)("@body:0"))) return Object(s.E)("@body:0", 100, () => t(e, n, null, o), !1), null;
          if (c = (new s.a).set("marginWidth", 0).set("marginHeight", 0).set("scrolling", "no").set("frameBorder", 0).set("height", 0).set("width", 0).set("id", e).overrideStyle("display:none !important;").done(), o)
            for (const t in o) o.hasOwnProperty(t) && (c[t] = o[t]);
          return Object(s.d)(i, c), n && Object(s.F)(c, n), c
        }(c.id, c.content, document.body, u);
        Object(r.o)(l) ? (l.addEventListener("load", () => n(!0)), l.addEventListener("error", () => n(!1))) : o("Failed to create a FRAME")
      })
    }
    const d = {
      supports: t => a.indexOf(t) > -1,
      process(t, e) {
        const n = t.map(t => u(t, e));
        return Promise.all(n)
      }
    };
    o.locator.register("nb_iframe", Object(c.a)(d))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1),
      s = n(0);
    const i = {
      submit: (t, e) => new Promise((n, i) => {
        const o = r.locator.resolve(e.type);
        return Object(s.o)(o) ? o.supports(e.method) ? o.process(t, e).then(t => {
          n(t)
        }).catch(t => {
          i(t)
        }) : i("".concat(e.method, " UnSupportedRequestMethod")) : i("".concat(e.type, " HandlerNotFound"))
      })
    };
    r.locator.register("simplenetworkservice", i)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    const r = {
      stream(t, e) {
        try {
          const {
            withCredentials: n = !0
          } = e, r = [t.url, t.payload].join("?").replace(/\?$/, "");
          return new window.EventSource(r, {
            withCredentials: n
          })
        } catch (t) {
          return null
        }
      }
    };
    n(1).locator.register("streamnetworkservice", r)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(0),
      s = n(2),
      i = n(14),
      o = n(1),
      c = n(11);
    const a = ["GET"];

    function u(t) {
      return new Promise((e, n) => {
        Object(r.o)(t) || n("Failed to create Iframe");
        const o = t.frameData;
        if (!Object(r.o)(o)) return void n(!1);
        const c = o && o.properties,
          a = Object(i.a)({}, c),
          u = function t(e, n, i, o) {
            let c;
            if (!(i = Object(r.o)(i) ? i : Object(s.w)("@body:0"))) return Object(s.E)("@body:0", 100, () => t(e, n, null, o), !1), null;
            if (c = (new s.a).set("marginWidth", 0).set("marginHeight", 0).set("scrolling", "no").set("frameBorder", 0).set("height", 0).set("width", 0).set("id", e).overrideStyle("display:none !important;").done(), o)
              for (const t in o) o.hasOwnProperty(t) && (c[t] = o[t]);
            return Object(s.d)(i, c), n && Object(s.F)(c, n), c
          }(o.id, o.content, document.body, a);
        Object(r.o)(u) ? (u.addEventListener("load", () => e(!1)), u.addEventListener("error", () => e(!1))) : n("Failed to create a FRAME")
      })
    }
    const d = {
      supports: t => a.indexOf(t) > -1,
      process(t, e) {
        const n = u(e);
        return Promise.all([n])
      }
    };
    o.locator.register("src_less", Object(c.a)(d))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "UnifiedAuctionHelper", (function() {
      return o
    }));
    var r = n(1),
      s = n(28),
      i = n(0);
    const o = {
      getWinners(t) {
        const e = t.getWinnerOf(s.a);
        return Object(i.o)(e) ? [e] : []
      },
      getSecondWinner(t) {
        const e = t.getTopN(s.a, 2);
        if (e.length > 1 && Object(i.o)(e[1])) return e[1]
      }
    };
    r.locator.register("auctionhelper", o)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "realTimeUserSyncService", (function() {
      return c
    }));
    var r = n(1),
      s = n(0),
      i = n(11),
      o = n(17);
    const c = {
      getExistingUser: t => {
        const e = r.locator.resolve(t);
        return Object(s.o)(e) ? e.getExistingUser(t) : ""
      },
      getUser: t => {
        const e = r.locator.resolve(t);
        return Object(s.o)(e) ? o.a.isActionApplicable("DISABLE_COOKIESYNC") && !e.isAllowedOnGDPR() ? Promise.reject(null) : e.getUser() : Promise.reject(null)
      },
      tokenExists: t => {
        const e = r.locator.resolve(t);
        return !!Object(s.o)(e) && e.tokenExists
      }
    };
    r.locator.register("realtimeusersyncservice", Object(i.a)(c))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "exchangeUserSyncService", (function() {
      return d
    }));
    var r = n(1),
      s = n(0),
      i = n(11),
      o = n(17),
      c = n(20),
      a = n(10),
      u = n(58);
    const d = {
      knownUser: (t, e) => {
        const n = r.locator.resolve(t);
        return !!Object(s.o)(n) && n.knownUser(e)
      },
      shouldOptOut: t => {
        const e = r.locator.resolve(t);
        return !!Object(s.o)(e) && e.hasUserOptedOut()
      },
      sync: t => {
        const e = r.locator.resolve(t);
        !Object(s.o)(e) || e.hasUserOptedOut() || e.done() || o.a.isActionApplicable("DISABLE_COOKIESYNC") && !e.isAllowedOnGDPR() || (e.sync(), a.a.on("cschange", () => e.sync(), !1), c.a.on("cschange", () => e.sync(), !1), u.a.on("cschange", () => e.sync(), !1))
      }
    };
    r.locator.register("exchangeusersyncservice", Object(i.a)(d))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "proxyResponseGetter", (function() {
      return l
    }));
    var r = n(107),
      s = n(39),
      i = n(100),
      o = n(0),
      c = n(8),
      a = n(1);
    const u = {};
    let d = 1;
    const l = new class {
      constructor() {
        this.iframeConfig = r.a.get("iframeConfig"), this.subDomain = this.iframeConfig.subDomain
      }
      processResponse(t) {
        const e = t,
          n = e.type,
          r = e.uid,
          s = u[r];
        if ("bidResponse" === n && Object(o.o)(s)) try {
          const t = e.response;
          let n = t;
          Object(o.p)(t) && (n = JSON.parse(t)), s.resolve(n)
        } catch (t) {
          s.reject(t)
        }
      }
      load() {
        const t = this.iframeConfig.iframeId,
          e = this.iframeConfig.subDomainPath;
        this.frameInstance = (new s.a).create(t).setTargetOrigin(this.subDomain).withSource(this.subDomain + e).withSandBoxAttributes(s.a.sandboxAttributes).hide().setFrameName({}).attachToDom(window.document.documentElement), this.frameInstance.on("msgReceived", (t, e) => this.processResponse(e), !1)
      }
      getResponse(t) {
        return new Promise((e, n) => {
          const r = this.frameInstance,
            s = d++;
          u[s] = {
            resolve: e,
            reject: n
          }, r.send(this.getPostData(s, t))
        })
      }
      getPostData(t, e) {
        return (new i.a).setSourceOrigin(Object(c.f)()).setTargetOrigin(this.subDomain).set("nData", e.nData).set("nType", e.nType).set("uid", t).set("type", "request")
      }
    };
    a.locator.register("resgetter", l)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "locHandler", (function() {
      return i
    }));
    var r = n(1),
      s = n(104);
    const i = {
      render: t => new Promise((e, n) => {
        const r = Object(s.a)(t.frameWindow),
          i = t.adCode;
        r.hbContent = "<!DOCTYPE html><html><head></head><body>" + i + "</body></html>", r.location.replace('javascript:window["hbContent"];'), e(!0)
      })
    };
    r.locator.register("LOC", i)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(27),
      s = n(9),
      i = n(0),
      o = n(1);
    let c = "";

    function a(t) {
      if (!window.history) return;
      const e = window.history;
      if (!e[t]) return;
      const n = e[t];
      e[t] = (t, r, o) => {
        o = o || "";
        const a = Object(s.h)(Object(s.b)(o));
        Object(i.q)(c) || (c = Object(s.h)(window.location.pathname)),
          function(t) {
            return !!Object(i.q)(t) && !Object(i.a)(c, t)
          }(a) && (c = a, d.emit("urlChange")), n.call(e, t, r, o), d.emit("historyState")
      }
    }
    class u extends r.a {
      constructor() {
        super()
      }
      start() {
        a("pushState"), a("replaceState")
      }
    }
    const d = new u;
    o.locator.register("historyApiProxy", d)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(89),
      s = n(2),
      i = n(0),
      o = n(1);
    o.locator.register("VIEW_STRAT_IO", new class {
      constructor() {
        const t = {
            threshold: .5
          },
          e = {
            threshold: .3
          };
        this.isSupported() && (this.IOForAds = new IntersectionObserver(this.handlerForAds.bind(this), t), this.IOForLargeAds = new IntersectionObserver(this.handlerForLargeAds.bind(this), e)), this.elementInViewMap = new Map, this.elementDebounceIdMap = new Map
      }
      handlerForAds(t, e) {
        t.forEach(t => {
          const e = t.target;
          if (t.intersectionRatio >= .5) {
            this.elementInViewMap.set(e, !0);
            const t = this.elementDebounceIdMap.has(e) && this.elementDebounceIdMap.get(e) || null,
              n = Object(s.g)(t, 1e3, this.postThresholdTimeCheck(e));
            this.elementDebounceIdMap.set(e, n)
          } else this.elementInViewMap.set(e, !1)
        })
      }
      handlerForLargeAds(t, e) {
        t.forEach(t => {
          const e = t.target;
          if (t.intersectionRatio >= .3) {
            this.elementInViewMap.set(e, !0);
            const t = this.elementDebounceIdMap.has(e) && this.elementDebounceIdMap.get(e) || null,
              n = Object(s.g)(t, 1e3, this.postThresholdTimeCheck(e));
            this.elementDebounceIdMap.set(e, n)
          } else this.elementInViewMap.set(e, !1)
        })
      }
      postThresholdTimeCheck(t) {
        return () => {
          this.elementInViewMap.has(t) && this.elementInViewMap.get(t) && Object(i.h)(this.genericCallbackForElements) && this.genericCallbackForElements(t, {
            strategyUsed: 3
          })
        }
      }
      set fireCallbackForElement(t) {
        this.genericCallbackForElements = t
      }
      observe(t) {
        switch (Object(r.a)(t)) {
          case 0:
            Object(i.o)(this.IOForAds) && this.IOForAds.observe(t);
            break;
          case 1:
            Object(i.o)(this.IOForLargeAds) && this.IOForLargeAds.observe(t)
        }
      }
      unobserve(t) {
        switch (Object(r.a)(t)) {
          case 0:
            Object(i.o)(this.IOForAds) && this.IOForAds.unobserve(t);
            break;
          case 1:
            Object(i.o)(this.IOForLargeAds) && this.IOForLargeAds.unobserve(t)
        }
      }
      isSupported() {
        return Object(i.h)(window.IntersectionObserver)
      }
    })
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(99);
    const s = new class {
      closeAuction(t) {
        return t.sort(this.bidsMapSorter)
      }
      runPostAuctionClose(t) {}
      bidsMapSorter(t, e) {
        return e.cpm - t.cpm
      }
    };
    r.a.register("cpm", s)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(0);
    class s {
      constructor(t) {
        s.executeCommands(t)
      }
      push(...t) {
        s.executeCommands(t)
      }
      static executeCommands(t) {
        Object(r.e)(t) && t.forEach(t => {
          try {
            t()
          } catch (t) {
            window.console && window.console.error(t)
          }
        })
      }
    }
    var i = n(1);
    const o = [];
    const c = (...t) => {
        o.push(...t)
      },
      a = () => {
        let t, e;
        return o.some(n => {
          const r = n.evaluate();
          return r && (t = n.action, e = n.reason), !0 === r
        }), !!Object(r.o)(e) && (function(t, e) {
          i.log.addEvent("fl", {
            data: {
              action: e,
              reason: t
            }
          })
        }(e, t), !0)
      };
    var u = n(8),
      d = n(2),
      l = n(23),
      h = n(3);
    const g = new h.a({});
    var p = n(57),
      f = n(10);

    function b() {
      return Object(p.a)() && Object(u.m)() && parseInt(d.D.split("msie")[1], 10) <= 9
    }

    function m() {
      return Object(r.o)(window.aax) && Object(r.h)(window.aax.filterImpressions) && window.aax.filterImpressions()
    }

    function v() {
      return !1
    }

    function w() {
      const t = i.locator.resolve("abpdetectionservice");
      return !t || t.isAbpDetected("high")
    }

    function O() {
      const t = l.a.cleaned,
        e = g.get("hbUrlBlockRegex");
      return !!Object(r.o)(e) && Object(r.b)(e, t)
    }

    function y() {
      return -1 !== l.a.cleaned.indexOf("force_hbnobid=1")
    }

    function E() {
      return !!Object(d.p)() && !(1 === g.get("enInIfr"))
    }

    function j() {
      return !!f.a.isApplicable() && 1 === g.get("killOnGdpr")
    }
    var S = n(30);
    var I = n(52);
    const C = new h.a({
      "adUtMx": 0,
      "adUtp": "AAX",
      "subDn": "https://redditad.com",
      "subDnPath": "/display.html?_otarOg={origin}&_cpub=AAX763KC6&_csvr=011310_169&_cgdpr={gdpr}&_cgdprconsent={gdprconsent}&_cusp_status={usp_status}&_ccoppa={coppa}",
      "enPreFrm": true
    });
    var A = n(12),
      P = n(22);
    class R extends A.a {
      get incrementalSize() {
        return this.get("incSz")
      }
      get renderingPosition() {
        return this.get("rp")
      }
      get renderingType() {
        return this.get("rt")
      }
    }
    const T = Object(h.d)(R, {
      "134261223": {
        "id": "134261223",
        "incSz": [0, 0],
        "rt": 2,
        "rp": 2
      },
      "225338683": {
        "id": "225338683",
        "incSz": [0, 0],
        "rt": 2,
        "rp": 2
      },
      "284486949": {
        "id": "284486949",
        "incSz": [0, 0],
        "rt": 2,
        "rp": 2
      },
      "597733264": {
        "id": "597733264",
        "incSz": [0, 0],
        "rt": 2,
        "rp": 2
      },
      "843965741": {
        "id": "843965741",
        "incSz": [0, 0],
        "rt": 2,
        "rp": 2
      }
    }, new P.a);
    var x, D, _, M = n(39),
      k = n(100),
      L = n(25);
    ! function(t) {
      t[t.DIRECT = 1] = "DIRECT", t[t.DFP = 2] = "DFP"
    }(x || (x = {})),
    function(t) {
      t[t.SIBLING = 1] = "SIBLING", t[t.CHILD = 2] = "CHILD", t[t.MAIN_FRAME = 3] = "MAIN_FRAME"
    }(D || (D = {})),
    function(t) {
      t[t.WIDTH = 0] = "WIDTH", t[t.HEIGHT = 1] = "HEIGHT"
    }(_ || (_ = {}));
    const N = new h.a({});

    function B(t) {
      let e = t.getAdUnitPath();
      0 !== e.indexOf("/") && (e = "/" + e);
      let n = e.split("/");
      var s;
      return (s = n).splice(2, 0, C.get("adUtp")), n = s, n = function(t) {
        const e = C.get("adUtMx");
        if (Object(r.o)(e)) {
          const n = e + 3;
          t = t.slice(0, n)
        }
        return t
      }(n), n.join("/")
    }

    function F(t, e, n, s, i) {
      if (t.renderingType === x.DFP) {
        const n = [];
        return e.forEach(e => {
            n.push([e.width + t.incrementalSize[_.WIDTH], e.height + t.incrementalSize[_.HEIGHT]])
          }),
          function(t) {
            if (!Object(r.o)(N)) return !1;
            const e = N.get(t);
            return !!Object(r.o)(e) && 1 === e.enable
          }(s.id) && function(t) {
            if (!Object(r.o)(t) || !Object(r.h)(t.getSizes)) return !1;
            const e = t.getSizes();
            return 0 !== e.length && e.some(t => Object(r.p)(t) && "fluid" === t)
          }(i) && n.push("fluid"), n
      }
      if (Object(r.o)(n)) {
        return [new L.a(n.get("size")).toArray()]
      }
      return []
    }

    function q(t, e, n) {
      const r = Object(L.b)(t.sizes);
      if (e.setFrameSize(r.width, r.height), n === D.SIBLING && Object(d.z)(e.getParentElement()), "DirectAdsInventory" === t.type) {
        t.getProp("directSlot").applyCss(r.width)
      }
      V(e.getParentElement())
    }

    function V(t) {
      let e = t;
      for (; e && "body" !== e.nodeName.toLowerCase();) 1 === e.nodeType && "none" === Object(d.i)(e, "display") && Object(d.z)(e), e = e.parentElement
    }

    function z() {
      const t = {};
      try {
        return window.googletag.pubads().getTargetingKeys().forEach(e => {
          t[e] = window.googletag.pubads().getTargeting(e)
        }), t
      } catch (e) {
        return t
      }
    }
    var U = n(15),
      $ = n(28),
      H = n(4);
    const W = new h.a({});
    var G = n(5);

    function Y(t) {
      return "40" === t || ! function(t) {
        const e = function(t) {
          return W && (W.get("all") || W.get(t)) || 0
        }(t);
        if (0 === e || Object(G.c)(1, 100) > e) return !1;
        return !0
      }(t)
    }

    function K(t) {
      return Object.keys(t).forEach(e => {
        (function(t) {
          const e = ["^mnet"];
          if (!Object(r.o)(e) || 0 === e.length) return !1;
          return e.some(e => new RegExp(e).test(t))
        })(e) && delete t[e]
      }), t
    }

    function X(t) {
      const e = class {
        static getAdCodeTransformerType(t) {
          return H.f.getConfigOf(t).isNative ? "native" : Y(t) ? void 0 : "creativeCop"
        }
        static get(t) {
          const e = this.getAdCodeTransformerType(t);
          return Object(r.o)(e) ? i.locator.resolve(e) : null
        }
      }.get(t.providerId);
      return Object(r.o)(e) ? e.transform(t) : Promise.resolve({
        adCode: t.adcode,
        parsedAdCode: {},
        trackers: []
      })
    }

    function J(t, e) {
      return Object(r.o)(e) ? (t.set("pvid", e.providerId), function(t, e) {
        const n = e.get("lpx") || [];
        return X(e).then(r => (t.set("ac", r.adCode), t.set("lpx", [...n, ...r.trackers]), e.set("lpx", []), t)).catch(r => (t.set("ac", ""), t.set("lpx", n), e.set("lpx", []), t))
      }(t, e)) : Promise.resolve(t)
    }

    function Q(t, e, n, s) {
      const o = e.getProp("dfpSlot");
      if (n.renderingType === x.DFP) {
        const e = function(t, e) {
            const n = t.getWinnerOf($.a);
            if (Object(r.o)(n)) {
              const t = new L.a(n.get("size"));
              return new L.a([t.width + e.incrementalSize[_.WIDTH], t.height + e.incrementalSize[_.HEIGHT]]).toString()
            }
            return ""
          }(s, n),
          c = function(t, e) {
            const n = i.locator.resolve("targetingservice");
            if (!Object(r.o)(n)) throw new Error("Unable to resolve targeting service");
            return n.getTargetingMap("auctiontargethandler", {
              auctioneer: t,
              size: e
            })
          }(s, e) || {
            slot: {},
            global: {}
          };
        let a = {
            ...Object(U.e)(o),
            ...c.slot
          },
          u = {
            ...z(),
            ...c.global
          };
        a = K(a), u = K(u), t.set("auPt", B(o)).set("tarM", a).set("gtm", u)
      }
      s.auctionState = 4
    }
    class Z extends class {
      constructor(t) {
        this.properties = new h.a(t)
      }
      get(t) {
        return this.properties.get(t)
      }
    } {
      get(t) {
        return this.properties.get(t)
      }
      get adCode() {
        return this.properties.get("adc")
      }
      get frameId() {
        return this.properties.get("pfid")
      }
      isEmpty() {
        return "1" === this.properties.get("isEmp")
      }
    }
    const tt = {};

    function et(t, e, n) {
      const s = nt(e.id);
      let i = tt[s];
      Object(r.o)(i) && i.removeFromDom();
      if (!1 === (t.get("isAaxWon") || !1)) return;
      if (!1 === t.get("sRdOut")) return;
      if (e.hide(), i = function(t, e) {
          const n = t.getParentElement();
          if (!Object(r.o)(n)) return;
          const [s, i] = e.get("sz").split("x");
          return (new M.a).create(nt(t.id)).setFrameSize(parseInt(s, 10), parseInt(i, 10)).attachToDom(n)
        }(e, t), !Object(r.o)(i)) return;
      tt[s] = i;
      const o = i.frameElement,
        c = o.contentWindow;
      Object(r.o)(o) && (rt(o, n.adcode), st(c, n))
    }

    function nt(t) {
      return t + "sibling"
    }

    function rt(t, e) {
      const n = t.contentWindow;
      if (Object(r.o)(n)) try {
        n.document.open(), n.document.write(e), n.document.close()
      } catch (t) {}
    }

    function st(t, e) {
      if (!t) return;
      const n = e.placementId,
        s = e.providerId,
        o = i.locator.resolve("feedback");
      if (!Object(r.o)(o)) return;
      const c = o(e);
      c.addStyleSheet(t), c.initFeedback(t, e), c.changeVisibilityOfIcons(n, s)
    }

    function it(t, e) {
      const n = t.frameId,
        s = Object(M.b)(n);
      ! function(t, e) {
        const n = t.get("sz");
        if (Object(r.o)(n)) {
          const t = new L.a(n);
          e.setFrameSize(t.width, t.height)
        }
      }(t, s),
      function(t, e) {
        "1" === t.get("isEmp") ? Object(d.o)(e.getParentElement()) : V(e.frameElement)
      }(t, s), et(t, s, e)
    }
    class ot {
      constructor() {
        this.tasks = []
      }
      addTask(t) {
        return this.tasks.push(t), this
      }
      perform() {
        this.tasks.forEach(t => t.do())
      }
    }
    class ct {
      constructor(t, e, n) {
        this.auctioneer = t, this.winner = e, this.size = n
      }
      do() {
        i.log.addEvent("adc", {
          data: {
            auctionSerial: this.auctioneer.auctionSerial,
            bid: this.winner,
            size: this.size
          }
        })
      }
    }
    var at = n(33),
      ut = n(67);

    function dt(t, e, n, r) {
      let s = (new at.a).create().setMockedValidBidProperties(t, e, r).build();
      return s = lt(n, s), s = ut.a.applyRevContract(s), s = function(t, e) {
        const n = t.get("auPt") || "",
          r = t.get("srcAgnCrid");
        return e.set("paId", n.replace(/\/+$/, "")).set("pcrid", String(r))
      }(n, s), s
    }

    function lt(t, e) {
      const n = t.get("srcAgnCrid"),
        r = t.get("srcAgnLid");
      return e.set("srcAgnCrid", n).set("srcAgnLid", r).set("dfpadvid", t.get("dfpadvid")).set("dfpcmpid", t.get("dfpcmpid")).set("isEmp", t.get("isEmp")).set("dsid", t.get("auPt")).set("crtid", t.get("crtid")).set("liid", t.get("liid")).set("sz", t.get("sz")).set("lbid", t.get("lbid")).set("isbckfl", t.get("isbckfl")).set("srvcnm", t.get("srvcnm"))
    }
    const ht = {};
    var gt = n(14);
    const pt = new Map,
      ft = (t, e) => {
        const n = pt.get(t) || [];
        n.push(e), pt.set(t, n)
      },
      bt = (t, e) => {
        const n = pt.get(t);
        Object(r.o)(n) && n.forEach(n => {
          try {
            const r = Object(gt.a)({}, e);
            r.type = t, n.call(null, r)
          } catch (t) {}
        })
      };
    class mt {
      constructor(t, e, n) {
        this.eventType = "slotRenderEnded", this.renderNotificationConfig = t, this.winner = e, this.inventory = n
      }
      getWinnerType() {
        return this.renderNotificationConfig.get("isAaxWon") ? "NON_DFP" : "DFP"
      }
      getSREParams() {
        const t = new L.a(this.winner.get("sz"));
        return {
          cpm: this.winner.get("dfBd"),
          dfpDetails: {
            advertiserId: this.renderNotificationConfig.get("dfpadvid"),
            campaignId: this.renderNotificationConfig.get("dfpcmpid"),
            creativeId: this.renderNotificationConfig.get("crtid"),
            isEmpty: this.renderNotificationConfig.isEmpty(),
            lineItemId: this.renderNotificationConfig.get("liid"),
            serviceName: this.renderNotificationConfig.get("srvcnm"),
            size: this.renderNotificationConfig.get("sz"),
            slot: this.inventory.getProp("dfpSlot"),
            sourceAgnosticCreativeId: this.renderNotificationConfig.get("srcAgnCrid"),
            sourceAgnosticLineItemId: this.renderNotificationConfig.get("srcAgnLid")
          },
          divId: this.inventory.domRef,
          height: t.height,
          size: t.toString(),
          width: t.width,
          winner: this.getWinnerType()
        }
      }
      do() {
        bt(this.eventType, this.getSREParams())
      }
    }
    class vt {
      constructor(t, e) {
        this.auctioneer = t, this.winner = e
      }
      do() {
        const t = this.auctioneer.placementSubmitted.domReference,
          e = i.locator.resolve("adperformancetrackerservice");
        if (!Object(r.o)(e) || !t) return;
        const n = e.getNewTracker([S.a.VIEW, S.a.CLICK], t);
        Object(r.o)(n) && (n.on("IMPRESSION_VIEWED", (t, e) => {
          const n = e;
          this.logAdPerformanceEvent("vimp", !0, n)
        }), n.on("IMPRESSION_CLICKED", (t, e) => {
          const n = e;
          this.logAdPerformanceEvent("adclick", !1, n)
        }, !1))
      }
      logAdPerformanceEvent(t, e = !1, n = {}) {
        i.log.addEvent(t, {
          data: {
            adPerfEventData: n,
            auctioneer: this.auctioneer,
            winner: this.winner
          }
        }, !e)
      }
    }
    class wt {
      constructor(t, e, n, r) {
        this.externalExchangeIds = ["245", "90", "128"], this.auctioneer = t, this.renderNotificationConfig = e, this.winnerDFPBidPrice = n, this.originalSize = r, this.overrideAdxProviderId = "$OverrideAdxProvider$", this.addAdxProvider()
      }
      do() {
        i.log.addEvent("ap", {
          data: {
            auctioneer: this.auctioneer,
            bids: this.getParticipants()
          }
        }), i.log.addEvent("pr", {
          data: this.getParticipants()
        })
      }
      addAdxProvider() {
        "1" === this.overrideAdxProviderId ? this.externalExchangeIds.push("230") : this.externalExchangeIds.push("89")
      }
      getParticipants() {
        return this.externalExchangeIds.map(t => {
          const e = dt(t, this.winnerDFPBidPrice, this.renderNotificationConfig, this.originalSize);
          return e.set("s", 0), e.set("crid", this.auctioneer.placementSubmitted.id), e.set("dfpDId", this.auctioneer.placementSubmitted.domReference || ""), e
        })
      }
    }
    class Ot {
      constructor(t, e, n) {
        this.auctioneer = t, this.didAAXWin = n, this.winner = e
      }
      do() {
        i.log.addEvent("aw", {
          data: {
            auctioneer: this.auctioneer,
            runner: this.getRunner(),
            winner: this.winner
          }
        }, !1)
      }
      getRunner() {
        const [t, e] = this.auctioneer.getTopN($.a, 2);
        return this.didAAXWin ? e : t
      }
    }

    function yt(t, e, n) {
      const s = new Z(t),
        i = T.getConfigOf(e.placementSubmitted.id),
        o = function(t, e) {
          if (!Object(r.q)(e.get("sz"))) return new L.a([]);
          const n = new L.a(e.get("sz"));
          return t.renderingType === x.DFP ? new L.a([n.width - t.incrementalSize[_.WIDTH], n.height - t.incrementalSize[_.HEIGHT]]) : n
        }(i, s),
        c = function(t, e, n) {
          const r = t.get("isAaxWon") || !1;
          let s = e.getWinnerOf($.a);
          return r ? (s = lt(t, s), ht[e.auctionId] = s, s) : (s = dt("-1", s && Object(G.a)(s.originalCpm) || "0.0", t, n), s.set("adc", t.adCode).set("crid", e.placementSubmitted.id).set("dfpDId", e.placementSubmitted.domReference || "").set("ra_sz", n.toString()), ht[e.auctionId] = s, s)
        }(s, e, o);
      it(s, c), e.auctionState = 5;
      const a = s.get("isAaxWon") || !1,
        u = new ot,
        d = Object(G.a)(c.originalCpm);
      i.renderingType === x.DFP && u.addTask(new wt(e, s, d, o)), u.addTask(new Ot(e, c, a)).addTask(new ct(e, c, o.toString())).addTask(new mt(s, c, n)).addTask(new vt(e, c)).perform()
    }
    class Et {
      constructor(t, e) {
        this.eventType = "impressionViewable", this.inventory = e, this.inViewImpressionData = t
      }
      getVisibleImprParams() {
        return {
          dfpDetails: {
            serviceName: this.inViewImpressionData.srvcnm,
            slot: this.inventory.getProp("dfpSlot")
          },
          divId: this.inventory.domRef
        }
      }
      do() {
        bt(this.eventType, this.getVisibleImprParams())
      }
    }

    function jt(t, e) {
      const n = t,
        s = n.type,
        o = parseInt(n.aId, 10),
        c = I.a.findAuctioneer().bySerial(o);
      var a;
      if (Object(r.o)(c)) switch (s) {
        case "renderad":
          yt(n, c, e);
          break;
        case "feedback":
          ! function(t, e) {
            Object(r.o)(e) && i.log.addEvent("fd", {
              data: {
                bid: e,
                feedbackData: t
              }
            })
          }(n, (a = c.auctionId, ht[a] || null));
          break;
        case "viewImpr":
          ! function(t, e) {
            (new ot).addTask(new Et(t, e)).perform()
          }(n, e)
      }
    }
    var St = n(20),
      It = n(17),
      Ct = n(78);
    const At = {},
      Pt = t => {
        const e = It.a.isActionApplicable("APPLY_GOOGLE_RESTRICTION") ? "0" : "1",
          n = It.a.isActionApplicable("APPLY_GOOGLE_TFCD_RESTRICTION") ? "1" : "0";
        return t.replace("{origin}", encodeURIComponent(Object(u.f)())).replace("{gdpr}", encodeURIComponent(f.a.isApplicable() ? "1" : "0")).replace("{gdprconsent}", encodeURIComponent(e)).replace("{usp_status}", encodeURIComponent(St.a.isApplicable() ? "1" : "0")).replace("{usp_consent}", encodeURIComponent(e)).replace("{coppa}", encodeURIComponent(n))
      };

    function Rt(t, e) {
      if ("DirectAdsInventory" === e.type) {
        e.getProp("directSlot").createDiv()
      }
      const n = T.getConfigOf(t),
        r = function(t, e) {
          const n = Object(d.w)("#" + t);
          let r;
          return n.innerHTML = "", e === D.CHILD ? (r = document.createElement("div"), r.id = "aax_" + n.id, Object(d.d)(n, r)) : (r = Object(d.e)(n, !1), r.id = "aax_" + n.id, Object(d.c)(n, r), r.style.cssText = n.style.cssText, n.style.cssText = (n.style.cssText || "") + ";display:none !important;"), r
        }(e.domRef, n.renderingPosition),
        s = "aax_if_" + r.id,
        i = C.get("subDn"),
        o = C.get("subDnPath"),
        c = Pt(o),
        a = {
          type: n.renderingType
        },
        u = (new M.a).create(s).setTargetOrigin(i).setFrameName(a);
      return n.renderingPosition !== D.MAIN_FRAME && u.withSource(i + c).withSandBoxAttributes(M.a.sandboxAttributes), At[e.domRef] = u.attachToDom(r), u
    }

    function Tt(t, e) {
      i.metrics.markStart("rti_" + t.auctionId);
      const n = At[e.domRef],
        s = t.getBidToRender($.a);
      if (!Object(r.o)(n)) throw new Error("frame not found for dom reference: ".concat(e.domRef));
      const o = T.getConfigOf(t.placementSubmitted.id);
      if (o.renderingType !== x.DIRECT || Object(r.o)(s)) {
        if (o.renderingType === x.DFP && "DfpInventory" !== e.type) throw new Error("DFP rendering type cannot be used on Non-DFP inventory! dom reference: ".concat(e.domRef));
        o.renderingPosition === D.MAIN_FRAME ? function(t, e, n, s) {
          q(e, n, s.renderingPosition);
          const i = At[e.domRef],
            o = t.getWinnerOf($.a);
          if (!Object(r.o)(o) || !Object(r.o)(i) || !Object(r.o)(i.frameElement)) return;
          const c = i.frameElement,
            a = c.contentWindow;
          rt(c, o.adcode), st(a, o)
        }(t, e, n, o) : function(t, e, n, r) {
          (function(t, e) {
            const n = T.getConfigOf(t.placementSubmitted.id),
              r = e.getProp("dfpSlot"),
              s = F(n, e.sizes, t.getWinnerOf($.a), t.placementSubmitted, r),
              i = It.a.isActionApplicable("NON_PERSONALIZED_ADS") ? "1" : "0",
              o = (new k.a).setSourceOrigin(Object(u.f)()).setTargetOrigin(C.get("subDn")).set("type", "initRen").set("aId", t.auctionSerial).set("szs", s).set("crid", t.placementSubmitted.id).set("npa", i).set("ncp", Ct.a.finalConsent).set("tcf", f.a.isTcfV2Enabled);
            return Q(o, e, n, t), J(o, t.getWinnerOf($.a))
          })(t, e).then(t => {
            n.on("msgReceived", (t, n) => jt(n, e), !1), n.send(t), q(e, n, r.renderingPosition)
          })
        }(t, e, n, o)
      }
    }

    function xt(t, e) {
      try {
        Rt(t.placementSubmitted.id, e), i.metrics.markEnd("dspl_time_" + t.auctionId)
      } catch (n) {
        i.log.addEvent("el", {
          data: {
            name: "FRAME_NOT_CREATED",
            stack: "slotId:" + t.placementSubmitted.domReference + "|type:" + e.type
          }
        })
      }
    }

    function Dt(t, e) {
      const n = i.locator.resolve("abpdetectionservice");
      Object(r.o)(n) && n.onSuccess("high", () => {
        ! function(t) {
          i.log.addEvent("psi", {
            data: {
              auctioneer: t
            }
          })
        }(t);
        try {
          Tt(t, e)
        } catch (t) {}! function(t) {
          i.log.addEvent("ap", {
            data: {
              auctioneer: t,
              bids: t.getAllBids
            }
          })
        }(t)
      })
    }
    var _t = n(54);
    class Mt {
      onAuctionStart(t) {
        t.used = !0;
        const e = t.placementSubmitted.domReference || "",
          n = Object(_t.a)(e);
        Object(r.o)(n) && xt(t, n)
      }
      onAuctionEnd(t) {
        const e = t.placementSubmitted.domReference || "",
          n = Object(_t.a)(e);
        Object(r.o)(n) && Dt(t, n)
      }
      onAuctionUsed(t) {}
      onAuctionRendered(t) {}
      onAuctionFreeze(t) {}
    }
    class kt {
      constructor(t, e, n, s, i) {
        this.config = t, this.sizes = e, this.isRefresh = !Object(r.o)(n) || n, this.domRef = Object(r.o)(s) ? s : null, this.placementRefreshCount = Object(r.o)(i) ? i : null
      }
      get id() {
        return this.config.id
      }
      get placementConfig() {
        return this.config
      }
      get expectedSizes() {
        return this.sizes
      }
      get refresh() {
        return this.isRefresh
      }
      set domReference(t) {
        this.domRef = t
      }
      get domReference() {
        return this.domRef
      }
      get refreshCount() {
        return this.placementRefreshCount
      }
    }
    class Lt {
      constructor() {
        this.mIsRefresh = !1, this.mDomRef = void 0, this.mRefreshCount = void 0
      }
      config(t) {
        return this.mConfig = t, this
      }
      size(t) {
        return this.mSizes = t, this
      }
      isRefresh(t) {
        return this.mIsRefresh = t, this
      }
      domRef(t) {
        return this.mDomRef = t, this
      }
      refreshCount(t) {
        return this.mRefreshCount = t, this
      }
      done() {
        if (!Object(r.o)(this.mConfig) || !Object(r.o)(this.mSizes)) throw new Error("placement config or size not set");
        return new kt(this.mConfig, this.mSizes, this.mIsRefresh, this.mDomRef, this.mRefreshCount)
      }
    }
    var Nt = n(27);
    class Bt extends A.a {}
    class Ft {
      constructor() {
        this.impressionProperties = {}
      }
      setId() {
        this.impressionProperties.id = Object(G.c)(1e4, 99999).toString()
      }
      set(t, e) {
        return this.impressionProperties[t] = e, this
      }
      getAll() {
        return this.impressionProperties
      }
    }
    class qt {
      constructor(t) {
        this.toBeDecoratedItem = t
      }
    }
    class Vt extends qt {
      constructor(t) {
        super(t)
      }
      getAll() {
        const t = i.app.envProperties,
          e = this.toBeDecoratedItem.getAll();
        return e.city = t.ip2ct, e.refUrl = t.eprurl, e.cugd = t.cugd, e.cc = t.ip2c, e.dma = t.dma, e.ssl = t.ssl, e.sugd = t.sugd, e.sc = t.ip2sc, e.visitor = t.mNVsid, e.dn = t.dn, e.servname = t.servname, e.sver = t.sver, e.ver = t.version, e.zn = t.ip2z, e
      }
    }
    class zt extends qt {
      constructor(t) {
        super(t)
      }
      getAll() {
        const t = this.toBeDecoratedItem.getAll();
        return t.itype = H.d.get("iType"), t.partner = H.d.get("partner"), t.cid = H.d.get("cid"), t.id = Object(h.b)(), t
      }
    }
    class Ut extends qt {
      constructor(t) {
        super(t)
      }
      getAll() {
        const t = this.toBeDecoratedItem.getAll();
        return t.gdpr = f.a.isApplicable() ? "1" : "0", t
      }
    }
    class $t extends qt {
      constructor(t) {
        super(t)
      }
      getAll() {
        const t = this.toBeDecoratedItem.getAll();
        return t.usp_status = St.a.isApplicable() ? "1" : "0", t.usp_final_cstr = St.a.finalConsent, t
      }
    }
    var Ht = n(69);
    class Wt extends qt {
      constructor(t) {
        super(t)
      }
      getChannel() {
        return window.aax.channel || ""
      }
      getSection() {
        let t = window.aax.section || "";
        return Wt.sectionIgnoreList.indexOf(t) >= 0 && (t = ""), t
      }
      getAll() {
        const t = this.toBeDecoratedItem.getAll();
        return t.pubUrl = l.a.cleaned, t.sec = this.getSection(), t.chnm = this.getChannel(), t.pgh = Object(u.e)(), t.refUrl = Ht.a.cleaned, t
      }
    }
    Wt.sectionIgnoreList = ["<section name>"];
    class Gt extends qt {
      constructor(t) {
        super(t)
      }
      getAll() {
        const t = this.toBeDecoratedItem.getAll(),
          e = Object(u.a)(),
          n = Object(u.b)();
        return t.vh = Object(r.o)(e) ? e : 0, t.vw = Object(r.o)(n) ? n : 0, t.scrsz = Object(u.i)(), t
      }
    }
    var Yt = n(79);
    class Kt extends qt {
      constructor(t) {
        super(t)
      }
      getAll() {
        const t = this.toBeDecoratedItem.getAll();
        return t.sd = Object(Yt.a)(), t.viewId = i.app.envProperties.viewId, t
      }
    }
    class Xt extends Nt.a {
      constructor(t) {
        super(), this.impressionState = "loading", this.impressionConfig = new Bt(this.setupImpression().getAll()), this.impressionPlacements = t
      }
      setupImpression() {
        let t = new Ft;
        return t = new Vt(t), t = new zt(t), t = new Ut(t), t = new $t(t), t = new Wt(t), t = new Gt(t), t = new Kt(t), t
      }
      get placements() {
        return this.impressionPlacements
      }
      getVars(t) {
        return this.impressionConfig.get(t)
      }
      get id() {
        return this.getVars("id")
      }
      get designatedMarketArea() {
        return this.getVars("dma")
      }
      get city() {
        return this.getVars("city")
      }
      get consentExists() {
        return this.getVars("gdprconsent")
      }
      get gdpr() {
        return this.getVars("gdpr")
      }
      get countryCode() {
        return this.getVars("cc")
      }
      get stateCode() {
        return this.getVars("sc")
      }
      get zoneCode() {
        return this.getVars("zn")
      }
      get publisherID() {
        return this.getVars("cid")
      }
      get partnerId() {
        return this.getVars("partner")
      }
      get integrationType() {
        return this.getVars("itype")
      }
      get sessionDepth() {
        return this.getVars("sd")
      }
      get visitorId() {
        return this.getVars("visitor")
      }
      get channel() {
        return this.getVars("chnm")
      }
      get section() {
        return this.getVars("sec")
      }
      get clientDeviceType() {
        return this.getVars("cugd")
      }
      get serverDeviceType() {
        return this.getVars("sugd")
      }
      get isSSLEnabled() {
        return this.getVars("ssl")
      }
      get publisherUrl() {
        return this.getVars("pubUrl")
      }
      get referrer() {
        return this.getVars("refUrl")
      }
      get pageHeight() {
        return this.getVars("pgh")
      }
      get referrerUrl() {
        return this.getVars("refUrl")
      }
      get screenSize() {
        return this.getVars("scrsz")
      }
      get viewId() {
        return this.getVars("viewId")
      }
      get viewPortHeight() {
        return this.getVars("vh")
      }
      get viewPortWidth() {
        return this.getVars("vw")
      }
      setState(t) {
        this.impressionState !== t && (this.impressionState = t, this.emit("onstatechange", t))
      }
      get state() {
        return this.impressionState
      }
      get type() {
        return this.impressionType
      }
      set type(t) {
        this.impressionType = t
      }
    }
    const Jt = new Map;

    function Qt(t) {
      return Jt.get(t) || 0
    }

    function Zt(t) {
      const e = t.map(te);
      return e.length > 0 ? function(t) {
        const e = new Xt(t),
          n = H.g.get("ngfd"),
          r = I.a.submitAuctionRequest(e, n);
        return r.forEach(t => {
          i.metrics.markStart("dspl_time_" + t.auctionId), t.observe(new Mt), t.start()
        }), e.setState("ready"), r
      }(e) : []
    }

    function te(t) {
      const e = t.getProp("placementID"),
        n = 2 === t.state ? function(t) {
          const e = Qt(t);
          return Jt.set(t, e + 1), Qt(t)
        }(t.domRef) : 0;
      return (new Lt).config(H.e.find(e)).size(t.sizes).refreshCount(n).domRef(t.domRef).done()
    }
    const ee = {
      matchInventories: function(t) {
        const e = [];
        return t.forEach(t => {
          const n = function(t) {
            return I.a.findAuctioneers().byPlacement(t).find(t => !t.used)
          }(t.getProp("placementID"));
          Object(r.o)(n) && (i.metrics.markStart("dspl_time_" + n.auctionId), n.used = !0, n.placementSubmitted.domReference = t.domRef, function(t, e) {
            if (2 === t.auctionState) xt(t, e), Dt(t, e);
            else {
              const n = function(t) {
                const e = H.g.get("gfd"),
                  n = H.g.get("dat");
                return "DirectAdsInventory" === t.type ? n : e
              }(e);
              t.observe(new Mt), t.maxTime = n, setTimeout(t.requestClose.bind(t), n)
            }
          }(n, t), e.push(n))
        }), e
      },
      submit: t => Zt(t)
    };
    var ne = n(45);
    const re = {
      handleDisplay(t, e) {
        if (m()) return Promise.reject("Block AAX");
        ! function(t) {
          const e = i.locator.resolve("adperformancetrackerservice");
          Object(r.o)(e) && t.forEach(t => {
            const n = e.getTracker(t.domRef);
            Object(r.o)(n) && n.kill([S.a.VIEW, S.a.CLICK])
          })
        }(t);
        const n = function(t) {
            return t.filter(t => {
              const e = t.getProp("placementID"),
                n = 2 === t.state;
              return Object(r.o)(e) && !n
            })
          }(t),
          s = [];
        return n.length > 0 && (s.push(... function(t) {
          const e = [];
          e.push(...ee.matchInventories(t));
          const n = function(t, e) {
            return t.filter(t => !e.some(e => e.placementSubmitted.domReference === t.domRef))
          }(t, e);
          return Object(r.e)(n) && n.length > 0 && e.push(...ee.submit(n)), e
        }(n)), ne.a.addAuctioneer(e, s)), Promise.reject("Block AAX")
      },
      notifyApiRelease(t) {
        ne.a.getAuctioneers(t).forEach(t => {
          t.requestClose()
        }), ne.a.release(t)
      }
    };
    class se {
      constructor(t) {
        this.properties = t
      }
      get(t) {
        return this.properties[t]
      }
      get size() {
        return this.get("sz")
      }
      get epc() {
        return this.get("epc")
      }
    }
    class ie extends A.a {
      constructor(t) {
        return super(t), this.sizeMapping = [], this.sizes = [], this.externalPlacementCodes = [], this.setSizeMapping(), this
      }
      loadSizesAndEPCs(t) {
        if (!t) return [];
        const e = [];
        return t.forEach(t => {
          const n = new se(t);
          e.push(n)
        }), e
      }
      setSizeMapping() {
        this.sizeMapping = this.loadSizesAndEPCs(this.get("szs")), this.updateSizesAndEPCs()
      }
      get sizeEpcMap() {
        return this.sizeMapping
      }
      get enabledSizes() {
        return this.sizes
      }
      get epcsMapped() {
        return this.externalPlacementCodes
      }
      updateSizesAndEPCs() {
        this.sizeMapping.forEach(t => {
          this.sizes.push(t.size), this.externalPlacementCodes.push(t.epc)
        })
      }
    }
    class oe extends A.a {
      constructor(t) {
        return super(t), this
      }
      get floorPrice() {
        return this.get("fp")
      }
    }
    class ce extends A.a {
      constructor(t) {
        super(t), this.availableSizes = []
      }
      get guaranteed() {
        return this.get("g")
      }
      get globalTargeting() {
        return this.get("gtar") || !1
      }
      get isSizeBased() {
        const t = this.get("sb") || !1;
        return !this.guaranteed && t
      }
      mapProviders(t) {
        return this.providerConfigManager = t, this
      }
      withSizes(t) {
        return this.availableSizes = t, this
      }
      mapFloorRules(t) {
        return this.floorPriceConfigManager = t, this
      }
      get providersMapped() {
        return this.providerConfigManager
      }
      get floorRules() {
        return this.floorPriceConfigManager
      }
      get sizes() {
        return this.availableSizes
      }
      isResponsive() {
        const t = this.get("fs");
        return Object(r.o)(t) && !t
      }
      isSafeFrameEnabled() {
        return !!this.get("iabsf")
      }
      isDfpLogsEnabled() {
        return !!this.get("dlog")
      }
      get code() {
        return this.get("code")
      }
      isPureNativeSlot() {
        const t = this.get("isDisp");
        return Object(r.o)(t) && !1 === t
      }
    }

    function ae(t, e) {
      return new ce(e).withSizes((n = e.szs, n.map(t => new L.a(t)))).mapProviders(function(t) {
        const e = {
            "134261223": {
              "99": {
                "br": false,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "99",
                "szs": [{
                  "epc": "134261223",
                  "sz": "600x600"
                }],
                "tm": true,
                "auto": 0
              }
            },
            "225338683": {
              "203": {
                "br": false,
                "ecc": "8CU22I65U",
                "hb": true,
                "prf": false,
                "id": "203",
                "szs": [{
                  "epc": "225338683_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "214": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "214",
                "szs": [{
                  "epc": "225338683_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "222": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "222",
                "szs": [{
                  "epc": "225338683_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "99": {
                "br": false,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "99",
                "szs": [{
                  "epc": "225338683",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              }
            },
            "284486949": {
              "102": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "102",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": true,
                "auto": 0
              },
              "109": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "109",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "117": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "117",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "145": {
                "br": true,
                "ecc": "100600",
                "hb": true,
                "prf": true,
                "id": "145",
                "szs": [{
                  "epc": "347383",
                  "sz": "300x250"
                }, {
                  "epc": "347383",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "157": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "157",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "159": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "159",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": true,
                "auto": 0
              },
              "167": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "167",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "172": {
                "br": true,
                "ecc": "1353756",
                "hb": true,
                "prf": true,
                "id": "172",
                "szs": [{
                  "epc": "15331445",
                  "sz": "300x250"
                }, {
                  "epc": "15331445",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "173": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "173",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": true,
                "auto": 0
              },
              "174": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "174",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "175": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "175",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": true,
                "auto": 0
              },
              "178": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "178",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "201": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "201",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "203": {
                "br": false,
                "ecc": "8CU22I65U",
                "hb": true,
                "prf": false,
                "id": "203",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "206": {
                "br": true,
                "ecc": "37093",
                "hb": true,
                "prf": false,
                "id": "206",
                "szs": [{
                  "epc": "37093",
                  "sz": "300x250"
                }, {
                  "epc": "37093",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "208": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "208",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "209": {
                "br": true,
                "ecc": "158984",
                "hb": true,
                "prf": false,
                "id": "209",
                "szs": [{
                  "epc": "2622762_651308",
                  "sz": "300x250"
                }, {
                  "epc": "2622763_651308",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "214": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "214",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "222": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "222",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "23": {
                "br": false,
                "ecc": "1635406",
                "hb": true,
                "prf": false,
                "id": "23",
                "szs": [{
                  "epc": "18047311",
                  "sz": "300x250"
                }, {
                  "epc": "18047311",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "241": {
                "br": true,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "241",
                "szs": [{
                  "epc": "534512",
                  "sz": "300x250"
                }, {
                  "epc": "534512",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "249": {
                "br": true,
                "ecc": "580828",
                "hb": true,
                "prf": false,
                "id": "249",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "26": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "26",
                "szs": [{
                  "epc": "820653366",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "265": {
                "br": true,
                "ecc": "651308",
                "hb": true,
                "prf": false,
                "id": "265",
                "szs": [{
                  "epc": "651308",
                  "sz": "300x250"
                }, {
                  "epc": "651308",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "3004": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "3004",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "3007": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3007",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "3010": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3010",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "3015": {
                "br": false,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3015",
                "szs": [{
                  "epc": "284486949",
                  "sz": "300x250"
                }, {
                  "epc": "284486949",
                  "sz": "300x600"
                }],
                "tm": true,
                "auto": 0
              },
              "38": {
                "br": true,
                "ecc": "83729e979b",
                "hb": true,
                "prf": false,
                "id": "38",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "41": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": true,
                "id": "41",
                "szs": [{
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_8CUFDS56E",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "51": {
                "br": false,
                "ecc": "1346592",
                "hb": true,
                "prf": true,
                "id": "51",
                "szs": [{
                  "epc": "15650470",
                  "sz": "300x250"
                }, {
                  "epc": "15650470",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "76": {
                "br": true,
                "ecc": "258817",
                "hb": true,
                "prf": false,
                "id": "76",
                "szs": [{
                  "epc": "654806",
                  "sz": "300x250"
                }, {
                  "epc": "654807",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "79": {
                "br": false,
                "ecc": "158386",
                "hb": true,
                "prf": false,
                "id": "79",
                "szs": [{
                  "epc": "2568330_586371",
                  "sz": "300x250"
                }, {
                  "epc": "2568333_586371",
                  "sz": "300x600"
                }],
                "tm": false,
                "auto": 0
              },
              "80": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "80",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }],
                "tm": true,
                "auto": 0
              },
              "97": {
                "br": false,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "97",
                "szs": [{
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x600"
                }, {
                  "epc": "284486949_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "99": {
                "br": false,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "99",
                "szs": [{
                  "epc": "284486949",
                  "sz": "300x600"
                }, {
                  "epc": "",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              }
            },
            "597733264": {
              "102": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "102",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              },
              "109": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "109",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "117": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "117",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "145": {
                "br": true,
                "ecc": "100600",
                "hb": true,
                "prf": true,
                "id": "145",
                "szs": [{
                  "epc": "347382",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "157": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "157",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "159": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "159",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              },
              "167": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "167",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "172": {
                "br": true,
                "ecc": "1353756",
                "hb": true,
                "prf": true,
                "id": "172",
                "szs": [{
                  "epc": "15331446",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "173": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "173",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              },
              "174": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "174",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "175": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "175",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              },
              "178": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "178",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "201": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "201",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "203": {
                "br": false,
                "ecc": "8CU22I65U",
                "hb": true,
                "prf": false,
                "id": "203",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "206": {
                "br": true,
                "ecc": "37093",
                "hb": true,
                "prf": false,
                "id": "206",
                "szs": [{
                  "epc": "37093",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "208": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "208",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "209": {
                "br": true,
                "ecc": "158984",
                "hb": true,
                "prf": false,
                "id": "209",
                "szs": [{
                  "epc": "2622764_651308",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "214": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "214",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "222": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "222",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "23": {
                "br": false,
                "ecc": "1635406",
                "hb": true,
                "prf": false,
                "id": "23",
                "szs": [{
                  "epc": "18047313",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "241": {
                "br": true,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "241",
                "szs": [{
                  "epc": "534513",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "249": {
                "br": true,
                "ecc": "580828",
                "hb": true,
                "prf": false,
                "id": "249",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "26": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "26",
                "szs": [{
                  "epc": "402418601",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "265": {
                "br": true,
                "ecc": "651308",
                "hb": true,
                "prf": false,
                "id": "265",
                "szs": [{
                  "epc": "651308",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "3004": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "3004",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "3007": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3007",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "3010": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3010",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "3015": {
                "br": false,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3015",
                "szs": [{
                  "epc": "597733264",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              },
              "33": {
                "br": true,
                "ecc": "1353756",
                "hb": true,
                "prf": true,
                "id": "33",
                "szs": [{
                  "epc": "14188441",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              },
              "38": {
                "br": true,
                "ecc": "83729e979b",
                "hb": true,
                "prf": false,
                "id": "38",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "41": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": true,
                "id": "41",
                "szs": [{
                  "epc": "597733264_8CUFDS56E",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "51": {
                "br": false,
                "ecc": "1346592",
                "hb": true,
                "prf": true,
                "id": "51",
                "szs": [{
                  "epc": "15650469",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "76": {
                "br": true,
                "ecc": "258817",
                "hb": true,
                "prf": false,
                "id": "76",
                "szs": [{
                  "epc": "654808",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "79": {
                "br": false,
                "ecc": "158386",
                "hb": true,
                "prf": false,
                "id": "79",
                "szs": [{
                  "epc": "2568330_586371",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "80": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "80",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              },
              "97": {
                "br": false,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "97",
                "szs": [{
                  "epc": "597733264_AAX763KC6",
                  "sz": "300x250"
                }],
                "tm": false,
                "auto": 0
              },
              "99": {
                "br": false,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "99",
                "szs": [{
                  "epc": "597733264",
                  "sz": "300x250"
                }],
                "tm": true,
                "auto": 0
              }
            },
            "843965741": {
              "101": {
                "br": false,
                "ecc": "102",
                "hb": true,
                "prf": false,
                "id": "101",
                "szs": [{
                  "epc": "",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              },
              "102": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "102",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              },
              "108": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "108",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "109": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "109",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "117": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "117",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "145": {
                "br": true,
                "ecc": "100600",
                "hb": true,
                "prf": true,
                "id": "145",
                "szs": [{
                  "epc": "255921",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "157": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "157",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "159": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "159",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              },
              "167": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "167",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "170": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "170",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              },
              "172": {
                "br": true,
                "ecc": "1353756",
                "hb": true,
                "prf": true,
                "id": "172",
                "szs": [{
                  "epc": "15331469",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "173": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "173",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              },
              "174": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "174",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "175": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "175",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              },
              "178": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "178",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "201": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "201",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "203": {
                "br": false,
                "ecc": "8CU22I65U",
                "hb": true,
                "prf": false,
                "id": "203",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "206": {
                "br": true,
                "ecc": "37093",
                "hb": true,
                "prf": false,
                "id": "206",
                "szs": [{
                  "epc": "37093",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "208": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "208",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "209": {
                "br": true,
                "ecc": "158984",
                "hb": true,
                "prf": false,
                "id": "209",
                "szs": [{
                  "epc": "2622765_651308",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "214": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "214",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "222": {
                "br": false,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "222",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "241": {
                "br": true,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "241",
                "szs": [{
                  "epc": "534514",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "249": {
                "br": true,
                "ecc": "580828",
                "hb": true,
                "prf": false,
                "id": "249",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "26": {
                "br": true,
                "ecc": "8CUFDS56E",
                "hb": true,
                "prf": false,
                "id": "26",
                "szs": [{
                  "epc": "314835771",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "265": {
                "br": true,
                "ecc": "651308",
                "hb": true,
                "prf": false,
                "id": "265",
                "szs": [{
                  "epc": "651308",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "3004": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": true,
                "id": "3004",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "3007": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3007",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "3010": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3010",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "3012": {
                "br": true,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3012",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "3015": {
                "br": false,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "3015",
                "szs": [{
                  "epc": "843965741",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              },
              "38": {
                "br": true,
                "ecc": "83729e979b",
                "hb": true,
                "prf": false,
                "id": "38",
                "szs": [{
                  "epc": "843965741_8CUFDS56E",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "51": {
                "br": false,
                "ecc": "1346592",
                "hb": true,
                "prf": true,
                "id": "51",
                "szs": [{
                  "epc": "14163096",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "76": {
                "br": true,
                "ecc": "258817",
                "hb": true,
                "prf": false,
                "id": "76",
                "szs": [{
                  "epc": "654805",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "79": {
                "br": false,
                "ecc": "158386",
                "hb": true,
                "prf": false,
                "id": "79",
                "szs": [{
                  "epc": "2568332_586371",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "89": {
                "br": false,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "89",
                "szs": [{
                  "epc": "",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              },
              "90": {
                "br": false,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "90",
                "szs": [{
                  "epc": "",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              },
              "97": {
                "br": false,
                "ecc": "AAX763KC6",
                "hb": true,
                "prf": false,
                "id": "97",
                "szs": [{
                  "epc": "843965741_AAX763KC6",
                  "sz": "728x90"
                }],
                "tm": false,
                "auto": 0
              },
              "99": {
                "br": false,
                "ecc": "",
                "hb": true,
                "prf": false,
                "id": "99",
                "szs": [{
                  "epc": "843965741",
                  "sz": "728x90"
                }],
                "tm": true,
                "auto": 0
              }
            }
          } [t],
          n = new P.a;
        return Object(r.c)(e, (t, e) => {
          if ("10000" === e) {
            const e = t.auto,
              n = Object(r.o)(e) && Object(G.c)(0, 100) <= e ? "4" : "9";
            t.id = n
          }
          n.add(new ie(t))
        }), n
      }(t)).mapFloorRules(function(t) {
        const e = {
            "134261223": {
              "3015": {
                "fp": 0,
                "id": "3015"
              },
              "99": {
                "fp": 0,
                "id": "99"
              }
            },
            "225338683": {
              "203": {
                "fp": 0,
                "id": "203"
              },
              "208": {
                "fp": 0,
                "id": "208"
              },
              "214": {
                "fp": 0,
                "id": "214"
              },
              "222": {
                "fp": 0,
                "id": "222"
              },
              "99": {
                "fp": 0,
                "id": "99"
              }
            },
            "284486949": {
              "102": {
                "fp": 0,
                "id": "102"
              },
              "109": {
                "fp": 0.01,
                "id": "109"
              },
              "117": {
                "fp": 0.01,
                "id": "117"
              },
              "145": {
                "fp": 0,
                "id": "145"
              },
              "157": {
                "fp": 0,
                "id": "157"
              },
              "159": {
                "fp": 0,
                "id": "159"
              },
              "167": {
                "fp": 0,
                "id": "167"
              },
              "172": {
                "fp": 0,
                "id": "172"
              },
              "173": {
                "fp": 0,
                "id": "173"
              },
              "174": {
                "fp": 0.01,
                "id": "174"
              },
              "175": {
                "fp": 0.01,
                "id": "175"
              },
              "178": {
                "fp": 0,
                "id": "178"
              },
              "201": {
                "fp": 0,
                "id": "201"
              },
              "203": {
                "fp": 0,
                "id": "203"
              },
              "206": {
                "fp": 0,
                "id": "206"
              },
              "208": {
                "fp": 0,
                "id": "208"
              },
              "209": {
                "fp": 0,
                "id": "209"
              },
              "214": {
                "fp": 0,
                "id": "214"
              },
              "222": {
                "fp": 0,
                "id": "222"
              },
              "23": {
                "fp": 0,
                "id": "23"
              },
              "241": {
                "fp": 0,
                "id": "241"
              },
              "249": {
                "fp": 0,
                "id": "249"
              },
              "26": {
                "fp": 0,
                "id": "26"
              },
              "265": {
                "fp": 0.1,
                "id": "265"
              },
              "3004": {
                "fp": 0,
                "id": "3004"
              },
              "3007": {
                "fp": 0.01,
                "id": "3007"
              },
              "3010": {
                "fp": 0,
                "id": "3010"
              },
              "3015": {
                "fp": 0,
                "id": "3015"
              },
              "38": {
                "fp": 0,
                "id": "38"
              },
              "41": {
                "fp": 0,
                "id": "41"
              },
              "51": {
                "fp": 0,
                "id": "51"
              },
              "76": {
                "fp": 0,
                "id": "76"
              },
              "79": {
                "fp": 0,
                "id": "79"
              },
              "80": {
                "fp": 0,
                "id": "80"
              },
              "97": {
                "fp": 0,
                "id": "97"
              },
              "99": {
                "fp": 0,
                "id": "99"
              }
            },
            "597733264": {
              "102": {
                "fp": 0,
                "id": "102"
              },
              "109": {
                "fp": 0.01,
                "id": "109"
              },
              "117": {
                "fp": 0.01,
                "id": "117"
              },
              "145": {
                "fp": 0,
                "id": "145"
              },
              "157": {
                "fp": 0,
                "id": "157"
              },
              "159": {
                "fp": 0,
                "id": "159"
              },
              "167": {
                "fp": 0,
                "id": "167"
              },
              "172": {
                "fp": 0,
                "id": "172"
              },
              "173": {
                "fp": 0,
                "id": "173"
              },
              "174": {
                "fp": 0.01,
                "id": "174"
              },
              "175": {
                "fp": 0.01,
                "id": "175"
              },
              "178": {
                "fp": 0,
                "id": "178"
              },
              "201": {
                "fp": 0,
                "id": "201"
              },
              "203": {
                "fp": 0,
                "id": "203"
              },
              "206": {
                "fp": 0,
                "id": "206"
              },
              "208": {
                "fp": 0,
                "id": "208"
              },
              "209": {
                "fp": 0,
                "id": "209"
              },
              "214": {
                "fp": 0,
                "id": "214"
              },
              "222": {
                "fp": 0,
                "id": "222"
              },
              "23": {
                "fp": 0,
                "id": "23"
              },
              "241": {
                "fp": 0,
                "id": "241"
              },
              "249": {
                "fp": 0,
                "id": "249"
              },
              "26": {
                "fp": 0,
                "id": "26"
              },
              "265": {
                "fp": 0.1,
                "id": "265"
              },
              "3004": {
                "fp": 0,
                "id": "3004"
              },
              "3007": {
                "fp": 0.01,
                "id": "3007"
              },
              "3010": {
                "fp": 0,
                "id": "3010"
              },
              "3015": {
                "fp": 0,
                "id": "3015"
              },
              "33": {
                "fp": 0,
                "id": "33"
              },
              "38": {
                "fp": 0,
                "id": "38"
              },
              "41": {
                "fp": 0,
                "id": "41"
              },
              "51": {
                "fp": 0,
                "id": "51"
              },
              "76": {
                "fp": 0,
                "id": "76"
              },
              "79": {
                "fp": 0,
                "id": "79"
              },
              "80": {
                "fp": 0,
                "id": "80"
              },
              "97": {
                "fp": 0,
                "id": "97"
              },
              "99": {
                "fp": 0,
                "id": "99"
              }
            },
            "843965741": {
              "101": {
                "fp": 0,
                "id": "101"
              },
              "102": {
                "fp": 0,
                "id": "102"
              },
              "108": {
                "fp": 0,
                "id": "108"
              },
              "109": {
                "fp": 0.01,
                "id": "109"
              },
              "117": {
                "fp": 0.01,
                "id": "117"
              },
              "145": {
                "fp": 0,
                "id": "145"
              },
              "157": {
                "fp": 0,
                "id": "157"
              },
              "159": {
                "fp": 0,
                "id": "159"
              },
              "167": {
                "fp": 0,
                "id": "167"
              },
              "170": {
                "fp": 0,
                "id": "170"
              },
              "172": {
                "fp": 0,
                "id": "172"
              },
              "173": {
                "fp": 0,
                "id": "173"
              },
              "174": {
                "fp": 0.01,
                "id": "174"
              },
              "175": {
                "fp": 0.01,
                "id": "175"
              },
              "178": {
                "fp": 0,
                "id": "178"
              },
              "201": {
                "fp": 0,
                "id": "201"
              },
              "203": {
                "fp": 0,
                "id": "203"
              },
              "206": {
                "fp": 0,
                "id": "206"
              },
              "208": {
                "fp": 0,
                "id": "208"
              },
              "209": {
                "fp": 0,
                "id": "209"
              },
              "214": {
                "fp": 0,
                "id": "214"
              },
              "222": {
                "fp": 0,
                "id": "222"
              },
              "241": {
                "fp": 0,
                "id": "241"
              },
              "249": {
                "fp": 0,
                "id": "249"
              },
              "26": {
                "fp": 0,
                "id": "26"
              },
              "265": {
                "fp": 0.1,
                "id": "265"
              },
              "3004": {
                "fp": 0,
                "id": "3004"
              },
              "3007": {
                "fp": 0.01,
                "id": "3007"
              },
              "3010": {
                "fp": 0,
                "id": "3010"
              },
              "3012": {
                "fp": 0,
                "id": "3012"
              },
              "3015": {
                "fp": 0,
                "id": "3015"
              },
              "38": {
                "fp": 0,
                "id": "38"
              },
              "51": {
                "fp": 0,
                "id": "51"
              },
              "76": {
                "fp": 0,
                "id": "76"
              },
              "79": {
                "fp": 0,
                "id": "79"
              },
              "89": {
                "fp": 0,
                "id": "89"
              },
              "90": {
                "fp": 0,
                "id": "90"
              },
              "97": {
                "fp": 0,
                "id": "97"
              },
              "99": {
                "fp": 0,
                "id": "99"
              }
            }
          } [t],
          n = new P.a;
        return Object(r.c)(e, (t, e) => {
          n.add(new oe(t))
        }), n
      }(t));
      var n
    }

    function ue() {
      Object(r.c)({
        "134261223": {
          "amp": 0,
          "cTpId": "",
          "code": "promotedAds",
          "id": "134261223",
          "g": false,
          "pdt": "20",
          "szs": [
            [600, 600]
          ]
        },
        "225338683": {
          "amp": 0,
          "cTpId": "",
          "code": "Test",
          "id": "225338683",
          "g": false,
          "pdt": "20",
          "szs": [
            [300, 250]
          ]
        },
        "284486949": {
          "amp": 0,
          "cTpId": "TNWNNWK_300x250",
          "code": "atf_sidebar_0",
          "id": "284486949",
          "g": false,
          "isDisp": true,
          "fs": true,
          "pdt": "20",
          "szs": [
            [300, 250],
            [300, 600]
          ]
        },
        "597733264": {
          "amp": 0,
          "cTpId": "TNWNNWK_300x250",
          "code": "btf_sidebar_1",
          "id": "597733264",
          "g": true,
          "isDisp": true,
          "fs": true,
          "pdt": "20",
          "szs": [
            [300, 250]
          ]
        },
        "843965741": {
          "amp": 0,
          "cTpId": "TCY0WB4_728x90",
          "code": "atf_leaderboard",
          "id": "843965741",
          "g": false,
          "isDisp": true,
          "fs": true,
          "pdt": "20",
          "szs": [
            [728, 90]
          ]
        }
      }, (t, e) => {
        H.e.add(ae(e, t))
      })
    }

    function de() {
      const t = function() {
          const t = [];
          return t.push({
            action: 0,
            evaluate: j,
            reason: 209
          }), t.push({
            action: 0,
            evaluate: E,
            reason: 208
          }), t.push({
            action: 0,
            evaluate: y,
            reason: 215
          }), t.push({
            action: 0,
            evaluate: O,
            reason: 204
          }), t.push({
            action: 0,
            evaluate: v,
            reason: 203
          }), t.push({
            action: 0,
            evaluate: m,
            reason: 207
          }), t.push({
            action: 0,
            evaluate: b,
            reason: 206
          }), t
        }() || [],
        e = [];
      return e.push({
        action: 0,
        evaluate: u.n,
        reason: 205
      }), t.concat(e)
    }
    var le = n(7),
      he = n(26);
    const ge = {};

    function pe() {
      if (Object(r.o)(window.__cmp) || !Object(r.h)(window.postMessage)) return;
      const t = Object(d.l)("__cmpLocator");
      t && (! function(t) {
        window.__cmp = (e, n, s) => {
          const i = Math.random() + "",
            o = {
              __cmpCall: {
                callId: i,
                command: e,
                parameter: n
              }
            };
          ge[i] = s, Object(r.o)(t) && t.postMessage(o, "*")
        }
      }(t), window.addEventListener("message", t => {
        const e = Object(r.q)(t.data) ? JSON.parse(t.data) : t.data;
        if (e.__cmpReturn) {
          const t = e.__cmpReturn;
          Object(r.h)(ge[t.callId]) && ge[t.callId](t.returnValue, t.success), delete ge[t.callId]
        }
      }, !1))
    }

    function fe() {
      Object(d.p)() && pe(), window.__cmp && window.__cmp("getConsentData", 1, (t, e) => {
        !0 === e && (he.a.setPublisherDetected(t.gdprApplies), he.a.consent = t.consentData)
      }), window.aax.setGDPRApplicable = Object(le.b)(t => {
        he.a.setPublisherDetected(t)
      }), window.aax.setGDPRConsent = Object(le.b)(t => {
        he.a.consent = t
      }), window.aax.consentExists = Object(le.b)(t => {
        he.a.blanketConsent = t
      })
    }
    const be = {};

    function me() {
      if (Object(r.o)(window.__uspapi) || !Object(r.h)(window.postMessage)) return;
      const t = Object(d.l)("__uspapiLocator");
      t && (! function(t) {
        window.__uspapi = (e, n, s, i) => {
          const o = Math.random() + "",
            c = {
              __uspapiCall: {
                callId: o,
                command: e,
                parameter: i,
                version: n
              }
            };
          be[o] = s, Object(r.o)(t) && t.postMessage(c, "*")
        }
      }(t), window.addEventListener("message", t => {
        const e = Object(r.q)(t.data) ? JSON.parse(t.data) : t.data;
        if (e.__uspapiReturn) {
          const t = e.__uspapiReturn;
          Object(r.h)(be[t.callId]) && be[t.callId](t.returnValue, t.success), delete be[t.callId]
        }
      }, !1))
    }

    function ve() {
      Object(d.p)() && me(),
        function() {
          if (Object(r.h)(window.__uspapi)) try {
            window.__uspapi("getUSPData", 1, (t, e) => {
              e && Object(r.o)(t) && Object(r.q)(t.uspString) && (St.a.consent = t.uspString.toUpperCase())
            })
          } catch (t) {}
        }(), window.aax.limitDataProcessing = Object(le.b)(t => {
          St.a.blanketConsent = t
        })
    }
    const we = {};

    function Oe(t) {
      let e, n;
      try {
        e = Object(r.p)(t.data) ? JSON.parse(t.data) : t.data, n = e.__tcfapiReturn
      } catch (t) {}
      n && Object(r.h)(we[n.callId]) && (we[n.callId](n.returnValue, n.success), delete we[n.callId])
    }

    function ye() {
      if (Object(r.o)(window.__tcfapi) || !Object(r.h)(window.postMessage)) return;
      const t = Object(d.l)("__tcfapiLocator");
      t && (! function(t) {
        window.__tcfapi = (e, n, r, s) => {
          const i = Math.random() + "",
            o = {
              __tcfapiCall: {
                callId: i,
                command: e,
                parameter: s,
                version: n
              }
            };
          we[i] = r, t.postMessage(o, "*")
        }
      }(t), window.addEventListener("message", Oe, !1))
    }

    function Ee() {
      Object(r.h)(window.__tcfapi) && window.__tcfapi("addEventListener", 2, (t, e) => {
        e && Object(r.o)(t) && f.a.setIABApiInfo(t)
      })
    }

    function je() {
      const t = i.locator.resolve("simplenetworkservice");
      if (!0 === window.aax.isAdServerLoaded || window.googletag && window.googletag._loadStarted_ || !Object(r.o)(t)) return;
      const e = {
        payload: "",
        url: "//www.googletagservices.com/tag/js/gpt.js"
      };
      t.submit([e], {
        method: "GET",
        tags: ["misc"],
        type: "scriptType"
      }), window.aax.isAdServerLoaded = !0
    }
    var Se = n(58);
    var Ie = n(24);

    function Ce() {
      const t = i.locator.resolve("inventorytracker");
      Object(r.o)(t) && t.track()
    }

    function Ae() {
      const t = function() {
        const t = [];
        return t.push({
          action: 0,
          evaluate: w,
          reason: 216
        }), t.push({
          action: 0,
          evaluate: O,
          reason: 215
        }), t
      }();
      c(...t), a() || function() {
        const t = i.locator.resolve("simpleinventoryservice");
        Object(r.o)(t) && (t.reset("DfpInventory"), t.reset("DirectAdsInventory"))
      }()
    }

    function Pe(t) {
      window.aax.getAbpStatus = () => "1" === t, window.aax.cmd = new s(window.aax.cmd), window.aax.safeExec = new s(window.aax.safeExec),
        function() {
          window.aax.incrementPage = () => {};
          const t = i.locator.resolve("infiniteScrollService");
          Object(r.o)(t) && (window.aax.incrementPage = Object(le.b)(t.start))
        }(), window.aax.reset = () => {}, Object(p.c)() && (window.aax.reset = Object(le.b)(Ae, window.aax))
    }

    function Re() {
      a() || (! function() {
        const t = i.locator.resolve("simpleinventoryservice");
        Object(r.o)(t) && (t.addObserver("DfpInventory", re), t.addObserver("DirectAdsInventory", re))
      }(), je())
    }

    function Te() {
      const t = i.locator.resolve("nativetemplarerepository");
      if (!Object(r.o)(t)) return;
      t.loadAll().catch(() => {})
    }

    function xe() {
      a() || function() {
        if (!C.get("enPreFrm")) return;
        const t = C.get("subDn"),
          e = C.get("subDnPath"),
          n = Pt(e),
          r = {
            type: "prefetch_frame"
          };
        (new M.a).create("aax_if_prefetch_frame").withSource(t + n).withSandBoxAttributes(M.a.sandboxAttributes).setTargetOrigin(t).setFrameName(r).hide().attachToDom(document.documentElement)
      }()
    }

    function De() {
      if (a()) return;
      ue();
      const t = function() {
        const t = {
            g: !0
          },
          e = H.e.where(t).map(t => {
            const e = t.sizes;
            return new kt(t, e)
          });
        return new Xt(e)
      }();
      I.a.submitAuctionRequest(t).forEach(t => t.start()), t.setState("ready")
    }

    function _e() {
      const t = i.locator.resolve("resgetter");
      Object(r.o)(t) && t.load()
    }
    i.app.on("start", (function() {
      Object(Yt.b)(),
        function() {
          const t = de();
          c(...t)
        }();
      const t = i.locator.resolve("abpdetectionservice");
      Object(r.o)(t) && (t.onSuccess("low", _e), t.onSuccess("low", De), t.onSuccess("low", xe), t.onSuccess("low", Te), t.onSuccess("medium", Re), t.onCompletion("high", Pe), t.onCompletion("high", Ce), t.start()), fe(), ve(), window.aax.coppa = Object(le.b)(t => {
          Se.a.blanketConsent = t
        }), Object(d.p)() && ye(), Ee(), window.aax.setNonPersonalizedAds = Object(le.b)(t => {
          Object(r.f)(t) && (Ct.a.blanketConsent = t)
        }),
        function() {
          const t = i.locator.resolve("historyApiProxy");
          Object(r.o)(t) && (t.start(), t.on("historyState", l.a.resetUrl.bind(l.a), !1))
        }(), window.aax.execute = new s(window.aax.execute), Object(d.n)() ? Ie.a.timer("lgTrigger", 2e3) : Object(d.b)(window, "load", () => Ie.a.timer("lgTrigger", 2e3)),
        function() {
          if (!Object(r.o)(null) || !Object(r.e)(null) || 0 === null.length) return;
          null.forEach(t => {
            const e = i.locator.resolve(t);
            Object(r.o)(e) && e.init()
          })
        }(), window.aax.addEventListener = Object(le.b)(ft)
    }))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(15),
      s = n(27),
      i = n(0),
      o = n(3);
    const c = new o.a({
      "overrides": ["clear", "destroySlots", "display", "enableSingleRequest", "missedSlots", "refresh"]
    });
    let a = {
      clear: {
        method: void 0,
        scope: void 0
      },
      defineSlot: {
        method: void 0,
        scope: void 0
      },
      destroySlots: {
        method: void 0,
        scope: void 0
      },
      display: {
        method: void 0,
        scope: void 0
      },
      enableSingleRequest: {
        method: void 0,
        scope: void 0
      },
      refresh: {
        method: void 0,
        scope: void 0
      }
    };

    function u(t) {
      let e;
      e = t ? t.filter(r.g) : Object(r.a)();
      const n = {
        data: {
          slotList: e
        },
        src: "clearSlots"
      };
      return R.emit("clearSlots", n), a.clear.method.apply(a.clear.scope, Array.prototype.slice.call(arguments))
    }
    class d extends s.a {}
    const l = new d;
    class h {
      constructor(t) {
        this.slot = t, t && Object(i.h)(t.setTargeting) && (this.setTargetingMethod = t.setTargeting)
      }
      setTargeting(t, e) {
        if (!Object(i.o)(this.setTargetingMethod)) return this.slot;
        const n = Array.prototype.slice.call(arguments),
          r = this.setTargetingMethod.apply(this.slot, n),
          s = {
            data: {
              slotList: [r]
            },
            src: "setTargeting"
          };
        return l.emit("setTargeting", s), r
      }
    }

    function g(t) {
      const e = new h(t);
      t.setTargeting = e.setTargeting.bind(e)
    }

    function p(t, e, n) {
      const r = Array.prototype.slice.call(arguments),
        s = a.defineSlot.method.apply(a.defineSlot.scope, r);
      null !== s && g(s);
      const i = {
        data: {
          slotList: [s]
        },
        src: "defineSlot"
      };
      return R.emit("defineSlot", i), s
    }

    function f(t) {
      let e;
      e = t ? t.filter(r.g) : Object(r.a)();
      const n = {
        data: {
          slotList: e
        },
        src: "destroySlots"
      };
      return R.emit("destroySlots", n), a.destroySlots.method.apply(a.destroySlots.scope, Array.prototype.slice.call(arguments))
    }
    let b = !1;

    function m() {
      const t = Array.prototype.slice.call(arguments);
      return b = a.enableSingleRequest.method.apply(a.enableSingleRequest.scope, t), b
    }

    function v() {
      try {
        return window.googletag.pubads().isInitialLoadDisabled()
      } catch (t) {
        return !1
      }
    }

    function w() {
      return b && !v()
    }

    function O(t) {
      const e = Array.prototype.slice.call(arguments);
      let n = [];
      if (v()) return void a.display.method.apply(a.display.scope, e);
      if (w()) n = Object(r.a)();
      else {
        let e;
        e = Object(r.g)(t) ? t : Object(r.d)(t), e && (n = [e])
      }
      const s = {
        data: {
          dfpCallback: () => a.display.method.apply(a.display.scope, e),
          slotList: n
        },
        src: "slotsDisplay"
      };
      R.emit("slotsDisplay", s)
    }

    function y(t) {
      const e = Array.prototype.slice.call(arguments);
      let n;
      n = t && Object(i.e)(t) ? t.filter(r.g) : Object(r.a)();
      const s = {
        data: {
          dfpCallback: () => a.refresh.method.apply(a.refresh.scope, e),
          slotList: n
        },
        src: "slotsRefresh"
      };
      R.emit("slotsRefresh", s)
    }
    var E = n(7);
    const j = {};

    function S() {
      const t = Object(r.a)().filter(r.f).filter(t => !j[Object(r.c)(t)]);
      if (0 === t.length) return;
      const e = {
        data: {
          slotList: t
        },
        src: "slotsMissed"
      };
      R.emit("slotsMissed", e), t.forEach(t => {
        j[Object(r.c)(t)] = !0
      })
    }

    function I() {
      ! function(t, e, n) {
        let r, s = 0;
        const o = () => {
          !Object(i.o)(n) || s < n ? (t(), s++, r = setTimeout(o, e)) : clearTimeout(r)
        };
        r = setTimeout(Object(E.b)(o), e)
      }(S, 100, 10)
    }
    var C = n(1);

    function A() {
      window.googletag.pubads().addEventListener("slotRenderEnded", t => {
        const e = t;
        if (!Object(i.o)(e) || !Object(i.o)(e.slot)) return;
        const n = C.locator.resolve("dfploggingservice");
        Object(i.o)(n) && n.submit(e)
      })
    }
    class P extends s.a {
      start() {
        P.overrideGoogleFunctions(), window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], window.googletag.apiReady || !Object(i.h)(window.googletag.cmd.unshift) ? window.googletag.cmd.push(A) : window.googletag.cmd.unshift(A)
      }
      static overrideGoogleFunctions() {
        window.googletag && window.googletag.cmd || (window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || []), window.googletag.apiReady || !Object(i.h)(window.googletag.cmd.unshift) ? window.googletag.cmd.push(P.updateGoogleFunctions) : window.googletag.cmd.unshift(P.updateGoogleFunctions)
      }
      static updateGoogleFunctions() {
        c.get("overrides").forEach(t => {
          switch (t) {
            case "clear":
              a.clear = {
                method: window.googletag.pubads().clear,
                scope: window.googletag.pubads()
              }, window.googletag.pubads().clear = u;
              break;
            case "defineSlot":
              a.defineSlot = {
                method: window.googletag.defineSlot,
                scope: window.googletag
              }, window.googletag.defineSlot = p;
              break;
            case "destroySlots":
              a.destroySlots = {
                method: window.googletag.destroySlots,
                scope: window.googletag
              }, window.googletag.destroySlots = f;
              break;
            case "display":
              a.display = {
                method: window.googletag.display,
                scope: window.googletag
              }, window.googletag.display = O;
              break;
            case "enableSingleRequest":
              a.enableSingleRequest = {
                method: window.googletag.pubads().enableSingleRequest,
                scope: window.googletag.pubads()
              }, window.googletag.pubads().enableSingleRequest = m;
              break;
            case "missedSlots":
              I();
              break;
            case "refresh":
              a.refresh = {
                method: window.googletag.pubads().refresh,
                scope: window.googletag.pubads()
              }, window.googletag.pubads().refresh = y
          }
        })
      }
    }
    const R = new P;
    var T = n(54);
    class x extends o.a {
      constructor(t) {
        super(t)
      }
      getMiddleware(t) {
        switch (t) {
          case "DfpInventory":
            return this.get("dfp") || [];
          case "DirectAdsInventory":
            return this.get("direct") || []
        }
        return []
      }
    }
    const D = new x({
      "dfp": ["inventoryPlacement", "aaxFreshRefreshSlot", "aaxSlotDebugLogger"],
      "direct": null
    });
    var _ = n(45);
    class M {
      constructor(t, e, n, r) {
        this.observers = [], this.domReference = t, this.invSizes = e, this.mState = n, this.invType = r, this.properties = {}
      }
      get domRef() {
        return this.domReference
      }
      get type() {
        return this.invType
      }
      get sizes() {
        return this.invSizes
      }
      get state() {
        return this.mState
      }
      set state(t) {
        const e = this.mState;
        this.mState = t, this.notify(e, t)
      }
      getProp(t) {
        return this.properties[t]
      }
      setProp(t, e) {
        return this.properties[t] = e, this
      }
      onStateChange(...t) {
        this.observers.push(...t)
      }
      notify(t, e) {
        this.observers.forEach(n => {
          n(t, e, this)
        })
      }
    }
    var k = n(11);
    C.locator.register("DfpInventory", Object(k.a)(new class extends class {
      constructor() {
        this.running = !1, this.middleware = [], this.observers = []
      }
      addMiddleware(...t) {
        this.middleware.push(...t)
      }
      notifyApiRelease(t) {
        this.observers.forEach(e => {
          e.notifyApiRelease(t)
        }), this.triggerDfpCallbacks(t)
      }
      triggerDfpCallbacks(t) {
        _.a.getDfpCallbacks(t).forEach(t => {
          t()
        })
      }
      addObserver(t) {
        this.observers.push(t), this.running || this.runDetector()
      }
      notify(t, e) {
        t = this.runMiddleware(t);
        const n = this.observers.map(n => {
          const r = function(t) {
              const e = [
                []
              ];
              return t.forEach(t => {
                let n = !1;
                const r = t.getProp("placementID");
                if (Object(i.o)(r)) {
                  for (const s of e)
                    if (n = !s.some(t => t.getProp("placementID") === r), n) {
                      s.push(t);
                      break
                    } n || e.push([t])
                } else e[0].push(t)
              }), e
            }(t),
            s = [];
          return r.forEach(t => {
            const r = Object(E.a)(n.handleDisplay, [t, e]);
            s.push(r)
          }), Promise.all(s)
        });
        return Promise.all(n)
      }
      initializeNonDisplayInventories(t) {
        t = this.runMiddleware(t), this.observers.forEach(e => {
          Object(i.h)(e.handleNonDisplayInventories) && e.handleNonDisplayInventories(t)
        })
      }
      runDetector() {
        const t = (e = this.inventoryType, D.getMiddleware(e).map(t => C.locator.resolve(t)).filter(i.o));
        var e;
        this.addMiddleware(...t), this.start(), this.running = !0
      }
      runMiddleware(t) {
        return this.middleware.forEach(e => {
          t = e(t)
        }), t
      }
    } {
      constructor() {
        super(...arguments), this.inventoryType = "DfpInventory", this.displayedSlotsPromiseMap = new Map
      }
      resetSlots(t, e) {
        const n = e;
        n.data.slotList.forEach(t => {
          const e = Object(r.c)(t),
            s = Object(T.a)(e);
          s && ("destroySlots" === n.src ? s.state = 5 : s.state = 6);
          const i = s && s.domRef || t.getSlotElementId();
          Object(T.c)(i), this.displayedSlotsPromiseMap.delete(i)
        })
      }
      handleSlots(t, e) {
        const n = e,
          r = n.data.dfpCallback,
          s = w() && "slotsDisplay" === n.src,
          o = _.a.getBatch(s);
        _.a.addDfpCallback(o, r);
        const c = n.data.slotList.filter(i.o).map(this.getInventory(n)).filter(i.o);
        this.triggerEvent(c, s, o)
      }
      getInventory(t) {
        return e => {
          const n = Object(r.c)(e),
            s = this.getInventoryState(t, e);
          if (Object(i.o)(this.displayedSlotsPromiseMap.get(n)) && 1 === s) return null;
          let o = Object(T.a)(n);
          if (o) o.state = s;
          else {
            const t = Object(r.b)(e);
            if (0 === t.length) return null;
            o = new M(n, t, s, this.inventoryType), o.setProp("dfpSlot", e), Object(T.b)(n, o)
          }
          return o
        }
      }
      getInventoryState(t, e) {
        return "defineSlot" === t.src ? 0 : "slotsRefresh" === t.src ? Object(r.f)(e) || Object(i.o)(this.displayedSlotsPromiseMap.get(e.getSlotElementId())) ? 2 : 1 : "slotsMissed" === t.src ? 3 : "setTargeting" === t.src ? 7 : 1
      }
      triggerEvent(t, e, n) {
        this.hasNonDisplayInventory(t) ? this.handleNonDisplayInventory(t, n) : this.handleDisplayInventory(t, e, n)
      }
      handleDisplayInventory(t, e, n) {
        const r = this.notify(t, n),
          s = () => {};
        this.updateDisplayPromiseMap(t, r), e && _.a.isBatchInWire(n) ? r.catch(s) : (_.a.wire(n), r.then(() => {
          this.notifyApiRelease(n)
        }).catch(s))
      }
      handleNonDisplayInventory(t, e) {
        this.initializeNonDisplayInventories(t), this.triggerDfpCallbacks(e)
      }
      updateDisplayPromiseMap(t, e) {
        t.forEach(t => {
          1 === t.state && this.displayedSlotsPromiseMap.set(t.domRef, e)
        })
      }
      hasNonDisplayInventory(t) {
        return t.some(t => 7 === t.state || 0 === t.state)
      }
      start() {
        R.on("clearSlots", this.resetSlots.bind(this), !1), R.on("destroySlots", this.resetSlots.bind(this), !1), R.on("defineSlot", this.handleSlots.bind(this), !1), R.on("slotsDisplay", this.handleSlots.bind(this), !1), R.on("slotsMissed", this.handleSlots.bind(this), !1), R.on("slotsRefresh", this.handleSlots.bind(this), !1), l.on("setTargeting", this.handleSlots.bind(this), !1), R.start()
      }
      reset() {}
    }))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "unifiedAuctionTargetsHandler", (function() {
      return S
    }));
    var r = n(28);
    class s {
      constructor() {
        this.targetMap = {}
      }
      getAll() {
        return this.targetMap
      }
    }
    var i = n(0);
    class o extends class {
      constructor(t) {
        this.targetMap = {}, this.toBeDecoratedItem = t
      }
    } {
      constructor(t, e) {
        super(t), this.config = e
      }
      updateTargetMap(t, e, n, r) {
        let s = this.config.get(e);
        Object(i.o)(r) && (s += r), Object(i.o)(t[s]) || (t[s] = n)
      }
    }
    var c = n(3);
    const a = new c.a({
        "crid": "aax_auid",
        "plc": "aax_aun"
      }),
      u = new c.a({
        "cc": "aax_ctry",
        "cv": "aax_cv",
        "fp": "mnetFloor",
        "pgId": "aax_auc",
        "pubId": "aax_pub",
        "ugd": "aax_dvt"
      }),
      d = new c.a({
        "act": "aax_at",
        "adapter": "aax_dpt",
        "bid": "aax_dp",
        "nat": "aax_nat",
        "pvid": "aax_dpid",
        "scPvid": "aax_sdpid",
        "size": "aax_ausz",
        "td": "aax_etc",
        "test": "aax_demo"
      }),
      l = new c.a({
        "nb": "aax_nb",
        "np": "aax_nap"
      }),
      h = new c.a({
        "hv": "aax_hi"
      });
    new c.a({
      "act": "aax_at",
      "adapter": "aax_dpt",
      "nat": "aax_nat",
      "pvid": "aax_dpid",
      "scPvid": "aax_sdpid",
      "td": "aax_etc",
      "test": "aax_demo",
      "pbp": "aaxpbp",
      "pdi": "aaxpdi",
      "psz": "aaxpsz",
      "pbid": "aaxplb",
      "plb": "aaxpbid",
      "pwb": "aaxpwb",
      "obp": "aaxobp",
      "osz": "aaxosz",
      "olb": "aaxolb",
      "owb": "aaxowb"
    });
    class g extends o {
      constructor(t, e) {
        super(t, u), this.auctioneer = e
      }
      getAll() {
        if (!Object(i.o)(this.config)) throw new Error("Target keys not found for DefaultTargets");
        const t = this.auctioneer.impressionSubmitted,
          e = {};
        return this.updateTargetMap(e, "pgId", String(this.auctioneer.auctionSerial)), this.updateTargetMap(e, "cc", t.countryCode), this.updateTargetMap(e, "cv", "1"), this.updateTargetMap(e, "ugd", String(t.clientDeviceType)), this.updateTargetMap(e, "pubId", t.publisherID), {
          ...this.toBeDecoratedItem.getAll(),
          ...e
        }
      }
    }
    class p extends o {
      constructor(t) {
        super(t, l)
      }
      getAll() {
        if (!Object(i.o)(this.config)) throw new Error("Target keys not found for NoBidTargets");
        const t = {};
        return this.updateTargetMap(t, "nb", "1"), {
          ...this.toBeDecoratedItem.getAll(),
          ...t
        }
      }
    }
    class f extends o {
      constructor(t, e) {
        super(t, a), this.auctioneer = e
      }
      getAll() {
        if (!Object(i.o)(this.config)) throw new Error("Target keys not found for CommonTargets");
        const t = {};
        return this.updateTargetMap(t, "plc", this.auctioneer.placementSubmitted.id), this.updateTargetMap(t, "crid", this.auctioneer.placementSubmitted.id), {
          ...this.toBeDecoratedItem.getAll(),
          ...t
        }
      }
    }
    class b extends o {
      constructor(t, e, n, r) {
        super(t, d), this.winningSize = r, this.winner = e, this.runner = n
      }
      handleWinnerTargets(t) {
        Object(i.o)(this.winner) && (this.updateTargetMap(t, "bid", this.winner.get("dfBd")), this.updateTargetMap(t, "act", this.winner.get("bidFor")), this.updateTargetMap(t, "pvid", this.winner.providerId), this.updateTargetMap(t, "size", this.winningSize || this.winner.get("size")), "99" === this.winner.providerId && this.updateTargetMap(t, "test", "1"), "NATIVE" === this.winner.get("adTp") && this.updateTargetMap(t, "nat", "1"))
      }
      handleRunnerTargets(t) {
        Object(i.o)(this.runner) && this.updateTargetMap(t, "scPvid", this.runner.providerId)
      }
      getAll() {
        if (!Object(i.o)(this.config)) throw new Error("Target keys not found for MnetTargets");
        const t = {};
        return this.handleWinnerTargets(t), this.handleRunnerTargets(t), {
          ...this.toBeDecoratedItem.getAll(),
          ...t
        }
      }
    }
    var m = n(1);
    class v extends o {
      constructor(t, e) {
        super(t, u), this.auctioneer = e
      }
      getAll() {
        if (!Object(i.o)(this.config)) throw new Error("Target keys not found for DefaultTargets");
        const t = this.auctioneer.impressionSubmitted,
          e = {},
          n = this.auctioneer.placementSubmitted.placementConfig.code;
        return this.updateTargetMap(e, "pgId", String(this.auctioneer.auctionSerial), n), this.updateTargetMap(e, "cc", t.countryCode, n), this.updateTargetMap(e, "cv", "1", n), this.updateTargetMap(e, "ugd", String(t.clientDeviceType), n), this.updateTargetMap(e, "pubId", t.publisherID, n), {
          ...this.toBeDecoratedItem.getAll(),
          ...e
        }
      }
    }
    class w extends o {
      constructor(t, e) {
        super(t, a), this.auctioneer = e
      }
      getAll() {
        if (!Object(i.o)(this.config)) throw new Error("Target keys not found for CommonTargets");
        const t = {},
          e = this.auctioneer.placementSubmitted.placementConfig.code;
        return this.updateTargetMap(t, "plc", this.auctioneer.placementSubmitted.id, e), this.updateTargetMap(t, "crid", this.auctioneer.placementSubmitted.id, e), {
          ...this.toBeDecoratedItem.getAll(),
          ...t
        }
      }
    }
    var O = n(4);
    class y extends o {
      constructor(t, e, n, r) {
        super(t, d), this.winningSize = r, this.winner = e, this.runner = n
      }
      handleWinnerTargets(t) {
        if (!Object(i.o)(this.winner)) return;
        const e = O.e.getConfigOf(this.winner.placementId).code;
        this.updateTargetMap(t, "bid", this.winner.get("dfBd"), e), this.updateTargetMap(t, "act", this.winner.get("bidFor"), e), this.updateTargetMap(t, "pvid", this.winner.providerId, e), this.updateTargetMap(t, "size", this.winningSize || this.winner.get("size"), e), "99" === this.winner.providerId && this.updateTargetMap(t, "test", "1", e), "NATIVE" === this.winner.get("adTp") && this.updateTargetMap(t, "nat", "1", e)
      }
      getAll() {
        if (!Object(i.o)(this.config)) throw new Error("Target keys not found for MnetTargets");
        const t = {};
        return this.handleWinnerTargets(t), {
          ...this.toBeDecoratedItem.getAll(),
          ...t
        }
      }
    }
    class E extends o {
      constructor(t, e) {
        super(t, h), this.targetMnetHV = "0", this.bid = e
      }
      shouldTargetHighValueBid() {
        return !!Object(i.o)(this.bid) && (!(!Object(i.q)(this.targetMnetHV) || "0" === this.targetMnetHV) && parseInt(this.bid.get("dfBd"), 10) >= parseInt(this.targetMnetHV, 10))
      }
      getAll() {
        if (!Object(i.o)(this.config)) throw new Error("Target keys not found for HighValueTargets");
        const t = {};
        return this.shouldTargetHighValueBid() && this.updateTargetMap(t, "hv", "1"), {
          ...this.toBeDecoratedItem.getAll(),
          ...t
        }
      }
    }
    class j extends o {
      constructor(t, e) {
        super(t, h), this.targetMnetHV = "0", this.bid = e
      }
      shouldTargetHighValueBid() {
        return !!Object(i.o)(this.bid) && (!(!Object(i.q)(this.targetMnetHV) || "0" === this.targetMnetHV) && parseInt(this.bid.get("dfBd"), 10) >= parseInt(this.targetMnetHV, 10))
      }
      getAll() {
        if (!Object(i.o)(this.config)) throw new Error("Target keys not found for HighValueTargets");
        const t = {};
        if (this.shouldTargetHighValueBid()) {
          const e = O.e.getConfigOf(this.bid.placementId).code;
          this.updateTargetMap(t, "hv", "1", e)
        }
        return {
          ...this.toBeDecoratedItem.getAll(),
          ...t
        }
      }
    }
    const S = {
      getTargets: t => {
        const {
          auctioneer: e,
          size: n
        } = t;
        let o = {},
          c = {};
        return e.placementSubmitted.placementConfig.globalTargeting ? o = function(t, e) {
          let n = new s;
          if (!Object(i.o)(t.getWinnerOf(r.a))) return n.getAll();
          n = new v(n, t);
          const [o, c] = t.getTopN(r.a, 2);
          return n = new w(n, t), n = new y(n, o, c, e), n = new j(n, o), n.getAll()
        }(e, n) : c = function(t, e) {
          let n = new s;
          if (n = new g(n, t), !Object(i.o)(t.getWinnerOf(r.a))) return n = new p(n), n.getAll();
          const [o, c] = t.getTopN(r.a, 2);
          return n = new f(n, t), n = new b(n, o, c, e), n = new E(n, o), n.getAll()
        }(e, n), {
          global: o,
          slot: c
        }
      }
    };
    m.locator.register("auctiontargethandler", S)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(12),
      s = n(22),
      i = n(3);
    class o extends r.a {
      constructor(t) {
        super(t)
      }
      get divID() {
        return this.get("div")
      }
      get targeting() {
        return this.get("targ")
      }
    }
    const c = Object(i.d)(o, {
      "134261223": {
        "id": "134261223",
        "div": "promotedlink",
        "targ": []
      },
      "225338683": {
        "id": "225338683",
        "div": "test-aax",
        "targ": []
      },
      "284486949": {
        "id": "284486949",
        "div": "sidebar-atf-0,overlay-sidebar-atf-0,ad_0,ad_1,ad_2",
        "targ": []
      },
      "597733264": {
        "id": "597733264",
        "div": "sidebar-btf-1,overlay-sidebar-btf-1,ad_4,ad_5,ad_6,ad_3,ad_7,ad_8,ad_9,sidebar-btf-0",
        "targ": []
      },
      "843965741": {
        "id": "843965741",
        "div": "ad_comments,comment-atf,overlay-comment-atf",
        "targ": []
      }
    }, new s.a);
    var a = n(0),
      u = n(4),
      d = n(72);
    const l = new Map;

    function h(t, e) {
      return u.e.getConfigOf(t).sizes.some(t => e.sizes.some(e => g(e.width, t.width) && g(e.height, t.height)))
    }

    function g(t, e, n) {
      return Object(a.o)(n) || (n = 10), t >= e && t <= e + n
    }
    var p = n(52),
      f = n(1);

    function b(t, e) {
      return function(t, e) {
        return t.some(t => {
          const n = e.getTargeting(t.key)[0],
            r = t.value.split("|");
          return Object(a.q)(n) && r.some(t => n === t)
        }) || !1
      }(t, e) || function(t, e) {
        const n = t.filter(t => t.key.startsWith("regex:"));
        if (0 === n.length) return !1;
        return !n.some(t => function(t, e) {
          const n = t.key,
            r = t.value;
          switch (n) {
            case "regex:adunit_path_ex":
              let t = e.getAdUnitPath();
              return Object(a.h)(e.getSlotId) && (t = e.getSlotId().getId()), new RegExp(r).test(t);
            case "regex:div_id_ex":
              const n = e.getSlotElementId();
              return new RegExp(r).test(n)
          }
          if (n.endsWith("_ex")) {
            const t = "regex:".length,
              s = n.indexOf("_ex"),
              i = n.substring(t, s),
              o = e.getTargeting(i)[0];
            if (Object(a.q)(o)) return new RegExp(r).test(o)
          }
          return !1
        }(t, e)) && n.some(t => function(t, e) {
          const n = t.key,
            r = t.value;
          switch (n) {
            case "regex:adunit_path":
              let t = e.getAdUnitPath();
              return Object(a.h)(e.getSlotId) && (t = e.getSlotId().getId()), new RegExp(r).test(t);
            case "regex:div_id":
              const n = e.getSlotElementId();
              return new RegExp(r).test(n)
          }
          if (!n.endsWith("_ex")) {
            const t = "regex:".length,
              s = n.substring(t),
              i = e.getTargeting(s)[0];
            if (Object(a.q)(i)) return new RegExp(r).test(i)
          }
          return !1
        }(t, e))
      }(t, e)
    }
    const m = new class {
        constructor(t) {
          this.properties = new i.a(t)
        }
        isErrorLogEnabledForOneSlotMultiplePlacements() {
          return this.properties.get("osMpEl")
        }
      }({}),
      v = {};

    function w(t) {
      const e = v[t];
      if (v[t] = [], !Object(a.o)(e)) return;
      if (e.length < 2) return e[0];
      e.sort(O);
      const n = e[0];
      return function(t, e, n) {
        if (!m.isErrorLogEnabledForOneSlotMultiplePlacements()) return;
        f.log.addEvent("el", {
          data: {
            crid: n,
            level: 2,
            name: "MULTIPLE_PLACEMENTS_ONE_SLOT",
            slotId: t,
            stack: e.sort()
          }
        })
      }(t, e, n), n
    }

    function O(t, e) {
      const n = y(t);
      if (n === y(e)) {
        const n = u.e.getConfigOf(t).guaranteed;
        return n === u.e.getConfigOf(e).guaranteed ? 0 : n ? -1 : 1
      }
      return n ? -1 : 1
    }

    function y(t) {
      const e = p.a.findAuctioneer().byPlacement(t);
      if (!Object(a.o)(e)) return !1;
      return !Object(a.d)([3, 5], e.auctionState)
    }

    function E(t) {
      const e = [];
      return c.each((n, r) => {
        h(r, t) && function(t) {
          return u.e.find(t).isSizeBased
        }(r) && e.push(r)
      }), e[0]
    }
    const j = {
      getPlacementID(t) {
        const e = t.getProp("dfpSlot");
        if (!e) return;
        c.each((n, r) => {
          h(r, t) && function(t, e, n) {
            const r = function(t, e) {
              return (t.divID + ",").includes(e + ",")
            }(t, n) || b(t.targeting, e);
            v[n] = v[n] || [], r && v[n].push(t.id)
          }(n, e, t.domRef)
        });
        const n = w(t.domRef);
        return Object(a.o)(n) ? n : function(t) {
          let e;
          return c.each((n, r) => {
            var s;
            !Object(a.o)(e) && h(r, t) && function(t) {
              if (l.get(t)) return !1;
              const e = u.c.get("mode") === d.b.SCAVENGE,
                n = u.e.getConfigOf(t).globalTargeting;
              return e && n
            }(r) && (e = r, s = r, l.set(s, !0))
          }), e
        }(t) || E(t)
      }
    };
    f.locator.register("dfpinventoryplacementfinder", j)
  }, function(t, e, n) {
    "use strict";
    var r;
    n.r(e),
      function(t) {
        t.C_CIPHER = "C_CIPHER"
      }(r || (r = {}));
    class s extends class {
      constructor(t) {
        this.validateKey(t), this.key = t
      }
    } {
      validateKey(t) {
        if (!t) throw new Error("Invalid Key")
      }
      encrypt(t, e) {
        let n = 0;
        n = e || parseInt(this.key.privateKey, 10);
        let r = "";
        for (let e = 0; e < t.length; e++) {
          let s = t[e];
          if (s.match(/[a-z]/i)) {
            const r = t.charCodeAt(e);
            r >= 65 && r <= 90 ? s = String.fromCharCode((r - 65 + n) % 26 + 65) : r >= 97 && r <= 122 && (s = String.fromCharCode((r - 97 + n) % 26 + 97))
          }
          r += s
        }
        return r
      }
      decrypt(t) {
        return this.encrypt(t, 26 - parseInt(this.key.privateKey, 10))
      }
    }
    class i {
      constructor() {
        this.privateKey = "", this.publicKey = ""
      }
      private(t) {
        return this.privateKey = t, this
      }
      public(t) {
        return this.publicKey = t, this
      }
    }
    var o = n(12);
    class c extends o.a {
      constructor(t) {
        super(t)
      }
      get strategy() {
        return this.get("id")
      }
      get key() {
        const t = this.get("privateKey"),
          e = this.get("publicKey"),
          n = new i;
        return e ? n.private(t).public(e) : n.private(t)
      }
    }
    var a = new c({
        "id": "C_CIPHER",
        "privateKey": "12",
        "publicKey": ""
      }),
      u = n(1),
      d = n(0);
    const l = class {
        static getAlgorithm(t, e) {
          switch (t) {
            case r.C_CIPHER:
              return new s(e);
            default:
              return null
          }
        }
      }.getAlgorithm(a.strategy, a.key),
      h = new class {
        constructor(t) {
          if (null === t) throw new Error("Invalid Algorithm");
          this.algorithm = t
        }
        encode(t) {
          return Object(d.o)(t) ? this.algorithm.encrypt(t) : ""
        }
        decode(t) {
          return Object(d.o)(t) ? this.algorithm.decrypt(t) : ""
        }
      }(l);
    u.locator.register("encryptionservice", h)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "ScriptInjectorV2", (function() {
      return A
    }));
    var r, s, i, o = n(1),
      c = n(5),
      a = n(0),
      u = n(88),
      d = n(44),
      l = n(76);

    function h(t, e) {
      switch (e) {
        case s.COOKIE:
        case s.SESSION:
          return d.a.getItem(t) || "";
        case s.LOCAL_STORAGE:
          return l.a.getItem(t) || ""
      }
    }

    function g(t) {
      const e = h(t.key, t.type);
      return Object(a.q)(e) && function(t) {
        try {
          const e = JSON.parse(t);
          return !!(Object(a.o)(e) && Object(a.o)(e.id) && Object(a.o)(e.ts)) && e.ts - Object(u.a)() > 0
        } catch (t) {
          return !1
        }
      }(e)
    }! function(t) {
      t.URL = "url", t.CODE = "code"
    }(r || (r = {})),
    function(t) {
      t.SESSION = "SESSION", t.LOCAL_STORAGE = "LOCALSTORAGE", t.COOKIE = "COOKIE"
    }(s || (s = {})),
    function(t) {
      t.SCRIPT = "script"
    }(i || (i = {}));

    function p(t) {
      return Object(a.o)(t) && Object(a.q)(t.type) && Object(a.q)(t.key)
    }

    function f(t, e) {
      const n = function(t, e) {
          const n = {
            id: t,
            ts: 6e4 * (e || 10) + Object(u.a)()
          };
          return JSON.stringify(n)
        }(e, t.mc),
        r = {
          expireInDays: (t.mc || 10) / 1440
        };
      ! function(t, e) {
        switch (e) {
          case s.COOKIE:
          case s.SESSION:
            Object(a.o)(t.options) && (t.options.path = t.options.path || "/", t.options.domain = t.options.domain || "", t.options.secure = t.options.secure || o.app.envProperties.ssl, t.options.expireInDays = t.options.expireInDays || 10 / 1440), d.a.setItem(t.key, t.value, t.options || {});
            break;
          case s.LOCAL_STORAGE:
            l.a.setItem(t.key, t.value)
        }
      }({
        key: t.key,
        value: n,
        options: r
      }, t.type)
    }
    var b = n(7),
      m = n(9),
      v = n(23);

    function w(t, e, n) {
      const r = t || 0;
      return Object(c.c)(0, 100) < r && function(t, e) {
        return !(Object(a.o)(e) && Object(a.q)(e)) || Object(m.g)(t, e)
      }(n, e)
    }

    function O(t) {
      const e = new Error;
      return e.message = t, e.name = "HB_SCRIPT_INJ_V2_ERROR", e
    }

    function y(t) {
      let e = 0;
      const n = Object(c.c)(0, 100),
        [r] = t.tags.filter(t => {
          const r = t.pb;
          return Object(a.o)(r) ? (e += r, n < e) : (Object(b.c)(O("RoundRobin tag found without probability")), !1)
        });
      if (!(e < 1 || e > 100) && Object(a.o)(r) && Object(a.o)(t.cache)) return function(t, e) {
        e.callback = Object(b.b)(() => {
          f(t, e.id)
        })
      }(t.cache, r), r
    }

    function E(t) {
      if (!Object(a.o)(t.cache)) return [];
      const e = function(t) {
        const e = h(t.key, t.type);
        try {
          return JSON.parse(e).id
        } catch (t) {
          return null
        }
      }(t.cache);
      if (!Object(a.o)(e)) return [];
      const n = t.tags.find(t => t.id == e);
      return Object(a.o)(n) && [n] || []
    }

    function j(t) {
      let e = [];
      const n = v.a.cleaned;
      return t.forEach(t => {
        t.tagGroups.forEach(t => {
          ! function(t) {
            const e = t.cache;
            return !(!Object(a.o)(e) || !p(e)) && g(e)
          }(t) ? w(t.traffic, t.urlPattern, n) && (e = e.concat(function(t) {
            const e = t.cache,
              n = t.rr;
            if (void 0 === n) return Object(b.c)(O("Config without declaring roundRobin attribute")), [];
            if (!n) return function(t) {
              return t.tags
            }(t);
            if (Object(a.o)(e) && !p(e)) return Object(b.c)(O("Error - script injection service cache exist but not valid")), [];
            const r = y(t);
            return Object(a.o)(r) ? [r] : []
          }(t))): e = e.concat(E(t))
        })
      }), e
    }
    var S = n(3);
    const I = Object(S.c)(class {
      constructor(t) {
        this.properties = new S.a(t)
      }
      get tagGroups() {
        return this.properties.get("tagGroups")
      }
    }, [{
      "tagGroups": [{
        "id": "MNET_HB",
        "rr": false,
        "traffic": 100,
        "cache": {
          "key": "",
          "type": "",
          "mc": 0
        },
        "tags": [{
          "id": "REDDIT_HB",
          "type": "url",
          "method": "script",
          "content": "https://hbx.media.net/bidexchange.js?cid=8CUS21A28&dn=www.reddit.com&version=5.1"
        }],
        "urlPattern": "force_hbtest"
      }]
    }], new Array);
    var C = n(2);
    class A {
      constructor() {
        j(I).forEach(t => {
          Object(a.o)(t) && (t.type !== r.URL ? t.type !== r.CODE || this.handleScriptContent(t) : this.handleUrlResources(t))
        })
      }
      handleUrlResources(t) {
        const e = o.locator.resolve("simplenetworkservice");
        if (!Object(a.o)(e)) return;
        const n = {
          payload: "",
          url: t.content
        };
        e.submit([n], {
          method: "GET",
          tags: ["misc"],
          type: "scriptType"
        }), this.callback(t)
      }
      handleScriptContent(t) {
        Object(C.q)(t.content), this.callback(t)
      }
      callback(t) {
        Object(a.h)(t.callback) && t.callback.apply(null)
      }
    }
    o.app.on("start", () => new A)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "default", (function() {
      return g
    }));
    var r = n(1),
      s = n(76),
      i = n(0);

    function o(t) {
      const e = s.a.getItem(t);
      let n = "",
        r = "";
      return Object(i.o)(e) && ([n, r] = e.split("|")), {
        isValid: (o = parseInt(r, 10), !isNaN(o) && o - Date.now() > 0),
        userId: n
      };
      var o
    }
    var c = n(11),
      a = n(12),
      u = n(3),
      d = n(22);
    class l extends a.a {
      constructor(t) {
        super(t)
      }
      get source() {
        return this.get("src")
      }
      get lookupId() {
        return this.get("lkId") || ""
      }
      get userExpiryTime() {
        return this.get("exp") || 0
      }
      get allowedOnGDPR() {
        return this.get("allowedOnGDPR") || !0
      }
    }
    const h = Object(u.d)(l, {
      "conv": {
        "allowedOnGDPR": false,
        "exp": 365,
        "id": "conv",
        "lkId": "covkn",
        "src": "https://c.aaxads.com/pubcid.php?itype=AAX&cb={callback}"
      },
      "crt": {
        "allowedOnGDPR": false,
        "exp": 3000,
        "id": "crt",
        "lkId": "crtkn",
        "src": "https://gum.criteo.com/sync?r=2&c={rtus_client_id}&j={callback}"
      }
    }, new d.a);
    class g extends class {
      constructor(t) {
        this.promiseResolver = [], this.rtusCompleted = !1, this.rtusConfig = h.getConfigOf(t), this.providerName = t
      }
      isAllowedOnGDPR() {
        return this.rtusConfig.allowedOnGDPR
      }
      done() {
        return this.rtusCompleted
      }
      responseHandler(t) {}
      getCallback() {
        return window.aax[this.providerName] = t => this.responseHandler(t), "window.aax." + this.providerName
      }
      replaceMacros(t) {
        return t
      }
      makeRtusRequest(t) {
        Object(i.o)(t) && this.promiseResolver.push(t), 0 !== this.state && (this.state = 0, this.rtusCompleted = function(t, e) {
          const n = {
              method: e,
              tags: ["misc"],
              type: "scriptType"
            },
            [s, o] = t.split("?"),
            c = r.locator.resolve("simplenetworkservice");
          return !!Object(i.o)(c) && (c.submit([{
            payload: o,
            url: s
          }], n), !0)
        }(this.replaceMacros(this.rtusConfig.source), "GET"))
      }
      getExistingUser() {
        const t = o(this.rtusConfig.lookupId);
        return t.isValid || this.makeRtusRequest(), t.userId
      }
      getUser() {
        return new Promise(t => {
          const e = o(this.rtusConfig.lookupId);
          Object(i.q)(e.userId) && t(e.userId), e.isValid || this.makeRtusRequest(t)
        })
      }
      get tokenExists() {
        const t = o(this.rtusConfig.lookupId);
        return Object(i.q)(t.userId)
      }
    } {
      responseHandler(t) {
        let e = "";
        if (this.state = 1, "OK" === t.status && (t.userid += "~~15", e = t.userid), "" !== e) {
          const t = 1e3 * this.rtusConfig.userExpiryTime;
          ! function(t, e, n) {
            const r = Date.now() + n;
            s.a.setItem(t, e + "|" + r)
          }(this.rtusConfig.lookupId, e, t)
        }
        this.promiseResolver.forEach(t => {
          t(e)
        })
      }
      replaceMacros(t) {
        return t = (t = t.split("{rtus_client_id}").join(String(g.RTUS_CLIENT_ID))).split("{callback}").join(this.getCallback())
      }
    }
    g.RTUS_CLIENT_ID = 321, r.locator.register("crt", Object(c.a)(new g("crt")))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r, s = n(66),
      i = n(2);
    ! function(t) {
      t[t.MOUSE_IN_TARGET = 0] = "MOUSE_IN_TARGET", t[t.CLICK_IN_TARGET = 1] = "CLICK_IN_TARGET"
    }(r || (r = {}));
    var o = n(0);
    class c {
      constructor() {
        this.isSupported = () => !0, this.elementList = new Map, this.elementEventMap = new Map, this.eventsAttached = !1
      }
      mouseDownEventHandler(t) {
        const e = this.elementList.get(t);
        Object(o.o)(e) && (e.set(r.CLICK_IN_TARGET, !0), setTimeout(() => {
          e.set(r.CLICK_IN_TARGET, !1)
        }, 100))
      }
      getDOMEventCallbackMap(t) {
        const e = new Map;
        return e.set("mousedown", () => {
          this.mouseDownEventHandler(t)
        }), e
      }
      static attachEvents(t, e) {
        for (const [n, r] of t) try {
          "mousedown" === n && "iframe" === e.tagName ? Object(i.b)(e.contentDocument, n, r) : Object(i.b)(e, n, r)
        } catch (t) {}
      }
      removeDOMEventsOnElement(t) {
        const e = this.elementEventMap.get(t);
        if (Object(o.o)(e))
          for (const [n, r] of e) "mousedown" === n && "iframe" === t.tagName ? Object(i.x)(t.contentDocument, n, r) : Object(i.x)(t, n, r);
        this.elementEventMap.delete(t)
      }
    }
    const a = new class {
      constructor() {
        this.currentPointerLocation = {
          x: 0,
          y: 0
        }
      }
      handle(t) {
        const e = t;
        this.currentPointerLocation = {
          x: e.pageX,
          y: e.pageY
        }
      }
      pointerLocation() {
        return this.currentPointerLocation
      }
    };
    var u = n(30),
      d = n(7);
    class l {
      constructor(t, e) {
        this.type = u.a.CLICK, this.event = "IMPRESSION_CLICKED", this.supportedElemMap = new Map, this.elementCallbackMap = new Map, this.name = t, this.eventHandler = e, this.eventHandler.fireCallbackForElement = this.onValidClickNotify.bind(this)
      }
      onValidClickNotify(t, e = {}) {
        const n = this.elementCallbackMap.get(t);
        Object(d.a)(n, [e])
      }
      static getSupportedElement(t) {
        const e = Object(i.w)(t);
        return Object(i.r)(e) ? this.getIframeElementIfPossible(e) : null
      }
      static getIframeElementIfPossible(t) {
        const e = t.getElementsByTagName("iframe");
        let n, r = 0;
        for (const t of e) {
          const e = t.getBoundingClientRect().height;
          r < e && (r = e, n = t)
        }
        return Object(o.o)(n) || (n = e[0]), Object(o.o)(n) ? n : t
      }
      isOneTimeEvent() {
        return !0
      }
      isSupported(t) {
        const e = l.getSupportedElement(t);
        return null !== e && (this.supportedElemMap.set(t, e), !0)
      }
      startTracking(t, e) {
        const n = this.supportedElemMap.get(e);
        Object(o.o)(n) && (this.elementCallbackMap.set(n, t), this.eventHandler.observe(n))
      }
      stopTracking(t) {
        const e = this.supportedElemMap.get(t);
        Object(o.o)(e) && (this.elementCallbackMap.delete(e), this.eventHandler.unobserve(e))
      }
    }
    s.a.register(new l("HEURISTIC_UNLOAD", new class extends c {
      constructor() {
        super(...arguments), this.visibilityChangeHandler = this.visibilityChangeEventHandler.bind(this), this.beforeUnloadHandler = this.beforeUnloadEventHandler.bind(this), this.throttledMouseMoveHandler = Object(i.B)(200, t => {
          a.handle(t)
        }), this.shouldCountEvent = !0, this.elementMouseLeaveTimerIdMap = new Map
      }
      mouseEnterEventHandler(t) {
        const e = this.elementList.get(t);
        Object(o.o)(e) && e.set(r.MOUSE_IN_TARGET, !0)
      }
      mouseLeaveEventHandler(t) {
        const e = this.elementList.get(t);
        if (Object(o.o)(e)) {
          let n = this.elementMouseLeaveTimerIdMap.get(t) || null;
          n = Object(i.g)(n, 20, () => {
            e.set(r.MOUSE_IN_TARGET, !1)
          }), this.elementMouseLeaveTimerIdMap.set(t, n)
        }
      }
      visibilityChangeEventHandler() {
        "hidden" === document.visibilityState && this.commonEventHandler(2)
      }
      beforeUnloadEventHandler() {
        this.commonEventHandler(1)
      }
      commonEventHandler(t) {
        if (this.shouldCountEvent) {
          this.shouldCountEvent = !1;
          for (const [e, n] of this.elementList)(n.get(r.MOUSE_IN_TARGET) || n.get(r.CLICK_IN_TARGET)) && this.fireCallbackForElement(e, {
            mousePos: a.pointerLocation(),
            strategyUsed: t
          });
          window.setTimeout(() => {
            this.shouldCountEvent = !0
          }, 100)
        }
      }
      attachDOMEventsOnElement(t) {
        const e = this.getDOMEventCallbackMap(t);
        e.set("mouseenter", () => {
          this.mouseEnterEventHandler(t)
        }), e.set("mouseleave", () => {
          this.mouseLeaveEventHandler(t)
        }), c.attachEvents(e, t), this.elementEventMap.set(t, e)
      }
      observe(t) {
        this.elementList.set(t, new Map), this.attachDOMEventsOnElement(t), this.eventsAttached || (Object(i.b)(window, "mousemove", this.throttledMouseMoveHandler), Object(i.b)(window, "beforeunload", this.beforeUnloadHandler), Object(i.b)(document, "visibilitychange", this.visibilityChangeHandler), this.eventsAttached = !0)
      }
      unobserve(t) {
        this.removeDOMEventsOnElement(t), 0 === this.elementList.size && (Object(i.x)(window, "mousemove", this.throttledMouseMoveHandler), Object(i.x)(window, "beforeunload", this.beforeUnloadHandler), Object(i.x)(document, "visibilitychange", this.visibilityChangeHandler), this.eventsAttached = !1), this.elementList.delete(t)
      }
    }))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1),
      s = n(0),
      i = n(12),
      o = n(3),
      c = n(22);
    class a extends i.a {
      constructor(t) {
        super(t)
      }
      get templateHost() {
        return this.get("tHost")
      }
    }
    const u = Object(o.d)(a, {
      "native": {
        "id": "native",
        "tHost": "https://s.aaxads.com/tcb.js"
      }
    }, new c.a);
    var d = n(9);
    class l {
      constructor() {
        this.properties = new Map
      }
      input(t, e) {
        return this.properties.set(t, e), this
      }
      build(t) {
        return Object(d.a)(this.properties, t)
      }
    }
    var h = n(5);
    const g = {
      fetch(t, e) {
        const n = r.locator.resolve("simplenetworkservice");
        if (!Object(s.o)(n)) throw new Error("Unable to resolver Network Service for template load");
        const i = u.getConfigOf("native"),
          o = {
            payload: function(t, e) {
              const n = t.join("|");
              return (new l).input("cb", e).input("req", Object(d.d)(n)).input("v", String(Object(h.c)(0, 99999))).build()
            }(t, e),
            url: i.templateHost
          };
        return n.submit([o], {
          method: "GET",
          tags: ["misc"],
          type: "scriptType"
        })
      }
    };
    r.locator.register("nativetemplateservice", g)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(3);
    class s extends r.a {
      constructor(t) {
        super(t)
      }
      get high() {
        return this.get("high")
      }
      get low() {
        return this.get("low")
      }
      get medium() {
        return this.get("medium")
      }
    }
    var i = new s({
        "levelMap": {
          "high": ["PIXEL"],
          "low": ["CACHE", "DOM", "PIXEL"],
          "medium": ["DOM", "PIXEL"]
        },
        "high": ["pixel"],
        "low": ["cache", "dom", "pixel"],
        "medium": ["dom", "pixel"]
      }),
      o = n(1);
    var c = t => {
        const e = new Array;
        return i[t].forEach(t => {
          const n = o.locator.resolve(t);
          n && e.push(n)
        }), e
      },
      a = n(0),
      u = n(11),
      d = n(7);
    o.locator.register("abpdetectionservice", Object(u.a)(new class {
      constructor() {
        this.accuracyLevelResultMap = new Map, this.accuracyLevelCallbackMap = {}, this.accuracyLevelResultMap.set("low", "0"), this.accuracyLevelResultMap.set("medium", "0"), this.accuracyLevelResultMap.set("high", "0"), this.accuracyLevelCallbackMap.low = [], this.accuracyLevelCallbackMap.medium = [], this.accuracyLevelCallbackMap.high = []
      }
      isAbpDetected(t) {
        return "1" === this.accuracyLevelResultMap.get(t)
      }
      getAbpStatus(t) {
        const e = this.accuracyLevelResultMap.get(t);
        return Object(a.o)(e) ? e : "0"
      }
      onCompletion(t, e) {
        "0" !== this.accuracyLevelResultMap.get(t) ? Object(d.a)(e, [this.getAbpStatus(t)]) : this.accuracyLevelCallbackMap[t].push(e)
      }
      onSuccess(t, e) {
        "1" === this.accuracyLevelResultMap.get(t) ? Object(d.a)(e) : this.accuracyLevelCallbackMap[t].push(t => {
          "1" === t && Object(d.a)(e)
        })
      }
      notify(t, e) {
        this.accuracyLevelCallbackMap[t].forEach(t => Object(d.a)(t, [e])), this.accuracyLevelCallbackMap[t] = []
      }
      executeStrategies(t, e) {
        return e.map(e => e.execute().then(e => {
          "1" !== this.accuracyLevelResultMap.get(t) && "1" === e.state && (this.accuracyLevelResultMap.set(t, "1"), this.notify(t, "1"))
        }))
      }
      execute(t) {
        if ("0" !== this.accuracyLevelResultMap.get(t)) return;
        if (this.isAbpDetected(t)) return void this.notify(t, "1");
        const e = c(t);
        if (!e) return;
        const n = this.executeStrategies(t, e);
        Promise.all(n).then(() => {
          "1" !== this.accuracyLevelResultMap.get(t) && (this.accuracyLevelResultMap.set(t, "2"), this.notify(t, "2"))
        })
      }
      start() {
        this.accuracyLevelResultMap.forEach((t, e) => {
          this.execute(e)
        })
      }
    }))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "AdQuality", (function() {
      return u
    }));
    var r = n(1),
      s = n(7),
      i = n(9);
    const o = new(n(3).a)({
      "host": "https://c.aaxads.com/ssapi/aqst",
      "nenc": "1",
      "pvids": ["241"]
    });
    class c {
      constructor() {
        this.query = new Map, this.host = o.get("host"), this.needsEncryption = o.get("nenc")
      }
      makeRequest() {
        const t = r.locator.resolve("simplenetworkservice");
        if (!t) return;
        "1" === this.needsEncryption && this.query.set("encryptionVersion", "1.0");
        const e = {
          payload: Object(i.a)(this.query, !0),
          url: this.host
        };
        t.submit([e], {
          method: "GET",
          tags: ["adquality", "misc"],
          type: "scriptType"
        }), this.query = new Map
      }
      addParam(t, e) {
        return this.query.set(t, e), this
      }
    }
    var a = n(0);
    class u {
      constructor() {
        this.handler = new c, this.counter = 0
      }
      check(t, e) {
        if (!this.isValid(t)) return void e(2);
        const n = t.get("pvid"),
          s = t.get("pcrid"),
          i = "w" === r.app.envProperties.ip2z ? "nc" : "nv",
          o = this.addResponseCallback(n, s, e);
        this.handler.addParam("elgghu_pds", n + "!crid~" + s).addParam("swulg", r.app.envProperties.pid).addParam("region", i).addParam("yhu", "2").addParam("fdooedfn", o), this.handler.makeRequest()
      }
      isRequired(t) {
        return this.isValid(t)
      }
      isValid(t) {
        const e = o.get("pvids"),
          n = t.get("pcrid");
        return Object(a.d)(e, t.providerId) && Object(a.o)(n)
      }
      addResponseCallback(t, e, n) {
        const r = "dtfdooedfn" + this.counter++;
        return window.aax[r] = Object(s.b)(r => {
          try {
            const s = r.status[t];
            if (Object(a.o)(s) && Object(a.o)(s.crid)) {
              const t = s.crid[e],
                r = t.blocked ? 0 : 1;
              n(r, t.reason)
            }
          } catch (t) {
            n(2)
          }
        }), "window.aax." + r
      }
    }
    r.locator.register("adqualityservice", new u)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(0),
      s = n(1),
      i = n(34),
      o = n(147),
      c = n(2);
    class a {
      constructor(t, e) {
        this.providerAlias = t, this.impressionType = e
      }
      get requestType() {
        const t = i.a.requestType;
        return Object(o.a)(window), "stream" === t && Object(c.s)() ? "stream" : "script"
      }
      toString() {
        return "".concat(this.requestType, "|").concat(this.providerAlias, "|").concat(this.impressionType)
      }
    }

    function u(t) {
      return Object(r.d)(i.a.strictUserCheckProviders, t)
    }

    function d(t) {
      return t.provider.isNative && !i.a.isSingleRequestForDisplayAndNativeEnabled() ? new a("NATIVE", t.impression.type) : new a("GLOBAL", t.impression.type)
    }

    function l(t) {
      const e = t.provider.get("alias"),
        n = s.locator.resolve("exchangeusersyncservice");
      return n && Object(r.o)(e) && n.knownUser("mnet", e)
    }

    function h(t) {
      return !u(t.provider.id) || function() {
        const t = s.locator.resolve("exchangeusersyncservice");
        return t && t.shouldOptOut("mnet")
      }() ? d(t) : l(t) ? (function(t) {
        const e = s.locator.resolve("realtimeusersyncservice"),
          n = t.provider.get("alias");
        Object(r.o)(e) && Object(r.o)(n) && e.getUser(n)
      }(t), d(t)) : function(t) {
        const e = s.locator.resolve("realtimeusersyncservice"),
          n = t.provider.get("alias");
        return Object(r.o)(n) && Object(r.o)(e) ? e.tokenExists(n) ? d(t) : t.provider.isNative && !i.a.isSingleRequestForDisplayAndNativeEnabled() ? new a(n + "NATIVE", t.impression.type) : new a(n, t.impression.type) : new a("GLOBAL", t.impression.type)
      }(t)
    }

    function g(t) {
      return !u(t.provider.id) || l(t) ? null : function(t) {
        const e = s.locator.resolve("realtimeusersyncservice"),
          n = t.provider.get("alias");
        return Object(r.o)(n) && Object(r.o)(e) ? e.getUser(n) : null
      }(t)
    }
    const p = new Map;

    function f(t, e, n) {
      "ready" !== t.state && "delivering" !== t.state ? t.on("onstatechange", (s, i) => {
        !Object(r.o)(s) && Object(r.o)(i) && "ready" === i && e.fire(t, n)
      }) : e.fire(t, n)
    }
    const b = t => {
      const e = h(t),
        n = p.get(e.toString());
      if (n && n.canAcceptMore()) return n;
      const i = (t => {
        const e = t.requestType;
        let n = s.locator.resolve("script");
        return "stream" === e && (n = s.locator.resolve("stream") || n), Object(r.o)(n) && p.set(t.toString(), n()), p.get(t.toString())
      })(e);
      if (!Object(r.o)(i)) return;
      const o = g(t);
      if (!Object(r.o)(o)) return f(t.impression, i, e.toString()), i;
      const c = () => {
        f(t.impression, i, e.toString())
      };
      return o.then(c).catch(c), i
    };
    var m = {
        add: function(t) {
          return new Promise((e, n) => {
            const s = b(t);
            return Object(r.o)(s) ? s.add(t).then(t => {
              e(t)
            }) : n({
              placement: t.placement,
              provider: t.provider,
              reason: 1201
            })
          })
        }
      },
      v = n(11);
    const w = {
      submit: t => new Promise(e => {
        m.add(t).then(t => {
          e(t)
        })
      })
    };
    s.locator.register("sspexchangeservice", Object(v.a)(w))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(4),
      s = n(1),
      i = n(14);
    const o = {};

    function c(t) {
      if (!Object(i.c)()) throw new Error("JSON is not supported to parse native adcode response");
      const e = JSON.parse(t).native,
        n = e.assets,
        r = e.link,
        s = e.privacy;
      return n.forEach(t => {
        const e = t.id;
        402 !== e ? 401 !== e ? 601 !== e ? (function(t, e) {
          o[e] = (n = t, n.data.value);
          var n
        }(t, e), function(t) {
          o[1e4] = t.url
        }(r), function(t) {
          o[10001] = t
        }(s)) : function(t) {
          o[601] = (e = t, e.title.text);
          var e
        }(t) : function(t) {
          const e = t;
          o[401] = a(e, "url"), o[10002] = String(a(e, "w")), o[10003] = String(a(e, "h"))
        }(t) : function(t) {
          o[402] = a(t, "url")
        }(t)
      }), {
        impressionTrackers: e.imptrackers || [],
        jsTracker: e.jstracker,
        parsedAdCode: o
      }
    }

    function a(t, e) {
      return t.img[e]
    }
    var u = n(0),
      d = n(37);
    const l = {
      ad_choices: 10001,
      ad_cta: 512,
      ad_desc: 502,
      ad_display_url: 511,
      ad_href: 1e4,
      ad_icon: 402,
      ad_image: 401,
      ad_price: 506,
      ad_secdesc: 510,
      ad_title: 601,
      adv_name: 501,
      image_height: 10002,
      image_width: 10003
    };

    function h(t, e) {
      const n = new d.a("{{([A-Za-z_]+)(_([0-9]+))?}}");
      return Object.keys(l).forEach(t => {
        const r = function(t) {
            return l[t]
          }(t),
          s = e[r] || "";
        n.input(t, s)
      }), n.resolveMacros(t.code)
    }
    var g = n(11);
    const p = {
      transform(t) {
        const e = t.placementId,
          n = r.e.getConfigOf(e).get("cTpId"),
          i = s.locator.resolve("nativetemplarerepository"),
          o = c(t.adcode);
        return Object(u.o)(i) ? Object(u.o)(n) ? i.find(n).then(t => {
          if (!Object(u.o)(t)) throw new Error("Template Unavailable to transform Adcode");
          let e = h(t, o.parsedAdCode);
          var n, r;
          return n = e, r = o.jsTracker, e = Object(u.o)(r) && Object(u.q)(r) ? n + r : n, {
            adCode: e,
            parsedAdCode: o,
            trackers: o.impressionTrackers
          }
        }) : Promise.reject("Client Template Id not present") : Promise.reject("Template Repository Unavailable")
      }
    };
    s.locator.register("native", Object(g.a)(p))
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "NativeTemplateRepository", (function() {
      return d
    }));
    var r = n(12),
      s = n(3),
      i = n(22);
    class o extends r.a {
      constructor(t) {
        super(t)
      }
    }
    const c = Object(s.d)(o, {
      "TCY0WB4_728x90": {
        "id": "TCY0WB4_728x90",
        "tv": "16"
      },
      "TNWNNWK_300x250": {
        "id": "TNWNNWK_300x250",
        "tv": "16"
      }
    }, new i.a);
    var a = n(1),
      u = n(0);
    class d {
      constructor() {
        this.templateRepo = new Map
      }
      loadAll() {
        return void 0 !== this.repoStatusPromise || (this.templateResponsePromise = new Promise((t, e) => {
          const n = function() {
              const t = [];
              return c.each((e, n) => {
                t.push(n)
              }), t
            }(),
            r = a.locator.resolve("nativetemplateservice");
          if (!Object(u.o)(r)) return e("Service Not Found Error: Template Service");
          r.fetch(n, this.exposeResponseCallback(t))
        }), this.repoStatusPromise = this.templateResponsePromise.then(t => (Object.keys(t).forEach(e => {
          this.add({
            code: t[e],
            id: e
          })
        }), !0)).catch(() => !1)), this.repoStatusPromise
      }
      exposeResponseCallback(t) {
        return window.aax.nativetemplatefetch = e => {
          t(e)
        }, "window.aax.nativetemplatefetch"
      }
      add(t) {
        this.templateRepo.set(t.id, t)
      }
      remove(t) {
        throw new Error("Method not implemented.")
      }
      find(t) {
        const e = this.templateRepo.get(t);
        return Object(u.o)(e) ? Promise.resolve(e) : this.repoStatusPromise.then(() => {
          const e = this.templateRepo.get(t);
          return Object(u.o)(e) ? e : null
        })
      }
      each(t) {
        throw new Error("Method not implemented.")
      }
    }
    a.locator.register("nativetemplarerepository", new d)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1),
      s = n(0);
    const i = new class {
      constructor() {
        this.trackerMap = new Map
      }
      add(t) {
        return Object(s.o)(t) && this.trackerMap.set(t.id, t), this
      }
      each(t) {
        this.trackerMap.forEach((e, n) => {
          t(e, n)
        })
      }
      find(t) {
        const e = this.trackerMap.get(t);
        return Object(s.o)(e) ? e : null
      }
      remove(t) {
        return this.trackerMap.delete(t.id), this
      }
    };
    var o, c = n(30),
      a = n(27);
    ! function(t) {
      t[t.TRACKING = 0] = "TRACKING", t[t.DISABLED = 1] = "DISABLED"
    }(o || (o = {}));
    class u extends a.a {
      constructor(t, e) {
        super(), this.stateMap = new Map, this.detectorMap = new Map, this.id = e;
        for (const e of t) this.stateMap.set(e.type, o.TRACKING), this.detectorMap.set(e.type, e), e.startTracking((t = {}) => {
          this.isActive(e.type) && (e.isOneTimeEvent() && (e.stopTracking(this.id), this.stateMap.set(e.type, o.DISABLED)), this.emit(e.event, t))
        }, this.id)
      }
      killType(t) {
        this.stateMap.set(t, o.DISABLED);
        const e = this.detectorMap.get(t);
        Object(s.o)(e) && e.stopTracking(this.id)
      }
      isActive(t) {
        return this.stateMap.get(t) === o.TRACKING
      }
      kill(t) {
        for (const e of t) this.killType(e)
      }
    }

    function d(t, e) {
      if (Object(s.o)(e)) {
        const n = function(t) {
          switch (t) {
            case c.a.VIEW:
              return r.locator.resolve("detectionserviceviewableimpression");
            case c.a.CLICK:
              return r.locator.resolve("detectionserviceclicktracking")
          }
          return null
        }(t);
        if (Object(s.h)(n)) return n(e)
      }
      return null
    }
    const l = {
      getNewTracker(t, e) {
        let n = i.find(e);
        null !== n && n.kill(t);
        const r = [];
        for (const n of t) {
          const t = d(n, e);
          Object(s.o)(t) && r.push(t)
        }
        return 0 === r.length ? null : (n = new u(r, e), i.add(n), n)
      },
      getTracker: t => i.find(t)
    };
    r.locator.register("adperformancetrackerservice", l)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    const r = new(n(3).a)(null);
    var s = n(1),
      i = n(9),
      o = n(0),
      c = n(23),
      a = n(11);
    s.locator.register("aax", Object(a.a)(new class {
      isTestMode(t) {
        return !0 === t.get("test_mode")
      }
      isAaxAdapterForced() {
        return -1 !== c.a.url.indexOf("force_aax")
      }
      shouldDelayLoad(t) {
        const e = t.get("urlr") || "",
          n = t.get("delay");
        if (!isFinite(n) || 0 === n) return !1;
        const r = new RegExp(e),
          s = c.a.url;
        return r.test(s)
      }
      isAdBlockWallPresent() {
        return Object(o.o)(window.aax) && Object(o.h)(window.aax.getAdBlockWallTime) && window.aax.getAdBlockWallTime()
      }
      loadAfterDelay() {
        this.isAdBlockWallPresent() ? s.log.addEvent("el", {
          data: {
            name: "AAX_BLOCKED_ON_AD_BLOCK_WALL"
          }
        }) : this.load(r)
      }
      init() {
        if (null !== r && !this.isTestMode(r) && !this.isAaxAdapterForced())
          if (this.shouldDelayLoad(r)) {
            const t = r.get("delay");
            setTimeout(() => {
              this.loadAfterDelay()
            }, t)
          } else this.load(r)
      }
      next() {
        window.aax && window.aax.incrementPage && Object(o.h)(window.aax.incrementPage) && window.aax.incrementPage()
      }
      addEventListeners() {
        s.app.on("nextcall", this.next)
      }
      getQueryParam(t) {
        const e = new Map;
        return e.set("pub", t.get("pubId")), e.set("ver", t.get("version") || 1.2), e.set("hst", window.location.hostname), e
      }
      load(t) {
        const e = s.locator.resolve("simplenetworkservice");
        if (!e) return;
        window.aax = window.aax || {}, window.aax.initTime = (new Date).getTime(), window.aax.deliverExchangeDemand = () => {};
        const n = "//" + t.get("endpoint"),
          r = {
            payload: Object(i.a)(this.getQueryParam(t), !0),
            url: n
          };
        this.addEventListeners(), e.submit([r], {
          method: "GET",
          tags: ["scr", "misc"],
          type: "scriptType"
        })
      }
    }))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(36),
      s = n(1),
      i = n(5),
      o = n(9),
      c = n(23);
    var a = n(106),
      u = n(37),
      d = n(4),
      l = n(69),
      h = n(0),
      g = n(70);
    const p = ["<!DOCTYPE html>", "<HTML>", "<HEAD>", "</HEAD>", "<BODY>", '<script id="mNCC" language="javascript">', "medianet_stime = new Date().getTime();", "{{", "VARIABLES", "}}", "(function() {", "var isSSL = 'https:' == document.location.protocol;", "var mnSrc = (isSSL ? 'https:' : 'http:') + '//contextual.media.net/nmedianet.js?cid={{", "MNET_CID", "}}{{", "NATIVE_TEMPLATE_ID_PARAM", "}}'+(isSSL ? '&https=1' : '');", "document.write('<scr'+'ipt type=\"text/javascript\" id=\"mNSC\" src=\"', mnSrc, '\"></scr'+'ipt>');", "})();", "<\/script>", "</BODY>", "</HTML>"].join("");

    function f(t) {
      const e = function(t, e, n, r) {
          let s = "";
          const i = {
            medianet_adt1: d.d.get("cid") || "",
            medianet_adt2: t.id || "",
            medianet_auctionid: "${acid}",
            medianet_bcktid: "",
            medianet_bdata: "",
            medianet_bdrId: e.id || "",
            medianet_chnm: b(),
            medianet_chnm2: d.d.get("cid") || "",
            medianet_chnm3: t.id || "",
            medianet_crid: n || "",
            medianet_height: r.split("x")[1],
            medianet_misc: '{"matchString": ""}',
            medianet_refurl: l.a.cleaned || "",
            medianet_requrl: c.a.cleaned || "",
            medianet_sbdrId: "",
            medianet_versionId: "111299",
            medianet_width: r.split("x")[0]
          };
          return Object(h.c)(i, (t, e) => {
            s += e + "='" + t + "';"
          }), s
        }(t.placement, t.provider, t.externalPlacementCode, t.size),
        n = function(t) {
          if (!0 === t.get("isDisp")) return "";
          const e = t.get("cTpId");
          if (!Object(h.o)(e)) return "";
          const n = e.split("_")[0];
          if (!Object(h.o)(n)) return "";
          return "&tpid=" + n
        }(t.placement);
      return function(t, e, n) {
        return new u.a("{{([A-Za-z_]+)}}").input("VARIABLES", t).input("MNET_CID", e).input("NATIVE_TEMPLATE_ID_PARAM", n).resolveMacros(p, !1)
      }(e, t.providerApiId, n)
    }

    function b() {
      return Object(g.a)() || ""
    }
    var m = n(32);
    class v {
      static getYAFAdCode(t) {
        const e = s.locator.resolve("yafcustomcode");
        if (Object(h.o)(e) && e.isSpecialSize(t.size)) {
          const n = e.getCodeFromConfig(t.placement.id);
          if (Object(h.q)(n)) return n
        }
        return f(t)
      }
      static getProviderCrid(t, e) {
        return [e, t, function() {
          const t = new Date,
            e = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())),
            n = new Date(Date.UTC(e.getUTCFullYear(), 0, 1));
          return e.setUTCDate(e.getUTCDate() + 4 - (e.getUTCDay() || 7)), Math.ceil(((e.getTime() - n.getTime()) / 864e5 + 1) / 7)
        }(), Object(i.c)(0, 29)].join("-")
      }
      getCreativeUrl(t, e, n) {
        const r = (new Map).set("cid", e).set("crid", t).set("size", n).set("requrl", c.a.cleaned);
        return "https://iurl-a.akamaihd.net/ybntag?" + Object(o.a)(r, !0)
      }
      createBid(t, e, n) {
        const s = new r.a,
          i = t.providersMapped.getConfigOf(e.id).get("ecc"),
          o = n.epcs[0] || "",
          c = n.sizes[0] || "",
          u = {
            externalPlacementCode: o,
            placement: t,
            provider: e,
            providerApiId: i,
            size: c
          };
        t.isPureNativeSlot() && s.set("adTp", "NATIVE");
        const d = v.getYAFAdCode(u);
        return s.set("s", 1).set("nbr", 0).set("type", "internal").set("crid", t.id).set("pvid", e.id).set("size", c).set("paId", o).set("prvApiId", i).set("epc", o).set("iurl", this.getCreativeUrl(o, i, c)).set("pcrid", v.getProviderCrid(o, i)).set("ogBid", a.a.getMinPrice(t.id, e.id)).set("adc", d).set("tc", "1").set("dbf", "1")
      }
      submit(t) {
        return new Promise(e => {
          const n = t.placement.placementConfig,
            r = t.provider;
          t.providerReqId = Object(m.a)(), s.metrics.markStart("ltime_" + t.providerReqId + n.id + r.id);
          const i = this.createBid(n, r, t.applicableSizes);
          i.set("cPvRqId", t.providerReqId), s.metrics.markEnd("ltime_" + t.providerReqId + n.id + r.id), s.log.addEvent("pr", {
            data: [i]
          }), e(i)
        })
      }
    }
    s.locator.register("adxfailoverbidderadapter", new v)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(10),
      s = n(29),
      i = n(0);
    class o {
      constructor(t, e) {
        this.tcfApiResponse = t, this.tcfConfig = e
      }
      isLegitimateInterestEstablishedWithVendor() {
        const t = this.tcfConfig.vendorId;
        return !0 === ((this.tcfApiResponse.vendor || {}).legitimateInterests || {})[t]
      }
      isLegitimateInterestEstablishedForPurpose(t) {
        if (!this.isLegitimateInterestEstablishedWithVendor()) return !1;
        return !0 === ((this.tcfApiResponse.purpose || {}).legitimateInterests || {})[t]
      }
      isConsentAvailableForVendor() {
        const t = this.tcfConfig.vendorId;
        return !0 === ((this.tcfApiResponse.vendor || {}).consents || {})[t]
      }
      isConsentAvailableForPurpose(t) {
        if (!this.isConsentAvailableForVendor()) return !1;
        return !0 === ((this.tcfApiResponse.purpose || {}).consents || {})[t]
      }
      getRestrictionFlag(t) {
        const e = this.tcfConfig.vendorId;
        return (((this.tcfApiResponse.publisher || {}).restrictions || {})[t] || {})[e]
      }
      isFlexiblePurposeAllowed(t) {
        const e = this.getRestrictionFlag(t);
        return 0 !== e && (1 === e ? this.isConsentAvailableForPurpose(t) : 2 === e ? this.isLegitimateInterestEstablishedForPurpose(t) : this.isLegitimateInterestEstablishedForPurpose(t) || this.isConsentAvailableForPurpose(t))
      }
    }
    var c = n(17),
      a = n(1);
    const u = s.a.getConfigOf("tcf"),
      d = new class {
        constructor(t, e) {
          this.purposesWithConsent = [], this.purposesWithoutConsent = [], this.actions = [], this.actionSet = !1, this.config = t, this.consentProvider = e, this.consentProvider.on("cschange", () => this.consentChangeListener(), !1)
        }
        isActionApplicable(t) {
          return !!this.consentProvider.isApplicable() && (this.actionSet || (this.setTcfActions(), this.setPurposeString()), Object(i.d)(this.actions, t))
        }
        setTcfActions() {
          const t = this.config.stateActionMap,
            e = this.consentProvider.getIABApiInfo();
          if (!Object(i.o)(e)) return;
          this.actionSet = !0;
          const n = new o(e, this.config);
          Object(i.c)(t, (t, e) => {
            e = String(e);
            const r = String(e).charAt(0),
              s = e.charAt(1);
            "C" === r && n.isConsentAvailableForPurpose(s) || "L" === r && n.isLegitimateInterestEstablishedForPurpose(s) || "F" === r && n.isFlexiblePurposeAllowed(s) ? this.purposesWithConsent.push(s) : (this.purposesWithoutConsent.push(s), this.actions = [...this.actions, ...t])
          })
        }
        setPurposeString() {
          const t = [];
          this.purposesWithConsent.forEach(e => {
            t[e - 1] = "1"
          }), this.purposesWithoutConsent.forEach(e => {
            t[e - 1] = "0"
          });
          for (let e = 0; e < t.length; e++) Object(i.o)(t[e]) || (t[e] = "-");
          this.consentProvider.purposeString = t.join("")
        }
        consentChangeListener() {
          this.setTcfActions(), this.setPurposeString()
        }
      }(u, r.a);
    r.a.isTcfV2Enabled && c.a.register(d), a.locator.register("tcfsrv", d)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "SlotDebugLogHandler", (function() {
      return m
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(21),
      a = n(0),
      u = n(51),
      d = n(24),
      l = n(1),
      h = n(6),
      g = n(75),
      p = n(15);

    function f(t) {
      return Object(a.o)(window.googletag) && Object(a.h)(window.googletag.pubads) && Object(p.f)(t)
    }
    class b extends h.a {
      constructor(t, e) {
        super(t), this.slot = e
      }
      getAll() {
        let t = "";
        Object(a.h)(this.slot.getSlotId) && (t = this.slot.getSlotId().getId());
        const e = "end" + this.slot.getSlotElementId(),
          n = l.metrics.measure(this.slot.getSlotElementId(), "appStart", e);
        return this.decoratorItem.getAll().set("vlg", this.slot.getSlotElementId() || "").set("gvlg", t).set("vcv", this.getSizes()).set("ws", this.getSlotLevelTargets()).set("odwh", f(this.slot) ? "1" : "0").set("vuw", n || "").set("oco", g.mdom.hasDOMLoaded() ? "1" : "0")
      }
      getSizes() {
        return Object(p.b)(this.slot).map(t => t.toString()).join("|")
      }
      getSlotLevelTargets() {
        if (Object(a.h)(this.slot.getTargetingMap)) {
          const t = this.slot.getTargetingMap(),
            e = [];
          return Object(a.c)(t, (t, n) => {
            e.push(n + "=" + t[0])
          }), e.join("|")
        }
        return ""
      }
    }
    class m {
      constructor() {
        this.EVENT_ID = "gpts", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(s.c)(this.config.loggingPercentage), this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta), this.loggedSlots = {}
      }
      handleEvent(t, e) {
        t.data.allSlots.forEach(t => {
          const n = t.getSlotElementId();
          if (this.isLogDisabled || this.loggedSlots[n]) return;
          this.loggedSlots[n] = !0, Object(a.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID));
          let r = new c.a;
          r = new b(r, t), Object(a.o)(n) && (r = new u.a(r, n)), this.logCollection.add(r.getAll()), e && this.fire()
        })
      }
      fire() {
        Object(a.o)(this.logCollection) && (this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null)
      }
    }
    const v = new m;
    l.locator.register(v.EVENT_ID, v), d.a.on("lgTrigger", () => v.fire(), !1)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "default", (function() {
      return f
    }));
    var r = n(1),
      s = n(12),
      i = n(3),
      o = n(22);
    class c extends s.a {
      constructor(t) {
        super(t)
      }
      get allowedOnGDPR() {
        return this.get("onGDPR") || !0
      }
      get optOut() {
        return this.get("optout") || !1
      }
      get source() {
        return this.get("src")
      }
      get syncType() {
        return this.get("syncType") || "image"
      }
      get cookiesAvailable() {
        return this.get("ca")
      }
    }
    const a = Object(i.d)(c, {
      "mnet": {
        "allowedOnGDPR": true,
        "ca": {
          "crt": "",
          "conv": ""
        },
        "id": "mnet",
        "optout": false,
        "src": "https://c.aaxads.com/aacxs.php?flg=AAX763KC6&fv=1&fy=37&ke=1&suylg=3010%2C108%2C33%2C178%2C51%2C159%2C174%2C212%2C222%2C89%2C209%2C76%2C90%2C172%2C3004%2C3007%2C3012%2C161%2C214%2C225%2C173%2C206%2C211%2C109%2C170%2C175%2C55%2C167%2C79%2C122%2C265%2C3014%2C38%2C41%2C157%2C145%2C208%2C241%2C117%2C203%2C97%2C249%2C3015%2C102%2C23%2C80%2C201%2C250&yvVbqf=1&uhiXuo={refurl}&gdpr={gdpr}&gdprconsent={gdprconsent}&gdprstring={gdprstring}&usp_status={usp_status}&usp_consent={usp_consent}&coppa={coppa}",
        "syncType": "iframe"
      }
    }, new o.a);
    var u = n(0),
      d = n(8),
      l = n(11),
      h = n(20),
      g = n(10),
      p = n(26);
    class f {
      constructor() {
        this.mnetConfig = a.getConfigOf("mnet"), this.isSyncDone = !1
      }
      hasUserOptedOut() {
        return this.mnetConfig.optOut
      }
      isAllowedOnGDPR() {
        return this.mnetConfig.allowedOnGDPR
      }
      done() {
        return this.isSyncDone
      }
      knownUser(t) {
        const e = this.mnetConfig.cookiesAvailable;
        return !(!Object(u.o)(e) || e === []) && (Object(u.o)(e[t]) && "" !== e[t])
      }
      sync() {
        const t = r.locator.resolve("simplenetworkservice");
        if (!Object(u.o)(t)) throw new Error("Could not sync providers ad network service is unavailable");
        const [e, n] = this.mnetConfig.source.split("?"), s = {
          payload: this.replaceMacros(n),
          url: e
        }, i = {
          frameData: {
            content: null,
            id: "mnet",
            onloadFunction: null,
            properties: {}
          },
          method: "GET",
          tags: ["misc"],
          type: "nb_iframe"
        };
        t.submit([s], i), this.isSyncDone = !0
      }
      getCcpaConsentFlag() {
        const t = r.locator.resolve("ccpasrv");
        return Object(u.o)(t) ? t.isActionApplicable("DISABLE_COOKIESYNC") ? 0 : t.isActionApplicable("ENABLE_COOKIESYNC_FOR_COCONTROLLERS") ? 2 : t.isActionApplicable("ENABLE_COOKIESYNC_FOR_SIGNATORIES") ? 3 : 1 : 1
      }
      getGdprConsentFlag() {
        if (g.a.isTcfV2Enabled) {
          const t = r.locator.resolve("tcfsrv");
          return Object(u.o)(t) ? t.isActionApplicable("DISABLE_COOKIESYNC") ? 0 : 1 : 0
        }
        const t = r.locator.resolve("gdprsrv");
        return Object(u.o)(t) ? t.isActionApplicable("DISABLE_COOKIESYNC") ? 0 : t.isActionApplicable("ENABLE_COOKIESYNC_FOR_COCONTROLLERS") ? 2 : p.a.consentForExternalServices : p.a.consentForExternalServices
      }
      getCoppaRestrictionFlag() {
        const t = r.locator.resolve("cpasrv");
        return Object(u.o)(t) && t.isActionApplicable("DISABLE_COOKIESYNC") ? 1 : 0
      }
      replaceMacros(t) {
        return t.replace("{refurl}", encodeURIComponent(Object(d.g)())).replace("{gdpr}", encodeURIComponent(g.a.isApplicable() ? "1" : "0")).replace("{gdprconsent}", encodeURIComponent(this.getGdprConsentFlag())).replace("{gdprstring}", encodeURIComponent(g.a.consent)).replace("{usp_status}", encodeURIComponent(h.a.isPrivacyUser() ? "1" : "0")).replace("{usp_consent}", encodeURIComponent(this.getCcpaConsentFlag())).replace("{coppa}", encodeURIComponent(this.getCoppaRestrictionFlag()))
      }
    }
    const b = new f;
    r.locator.register("mnet", Object(l.a)(b))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1),
      s = n(0);
    n(2);
    const i = t => {
      try {
        t.frameElement
      } catch (t) {
        return !0
      }
      return !1
    };
    var o = n(8);
    const c = {
      submit: t => {
        const e = function(t) {
            return t.isCustomCode ? "CCR" : t.sb && !Object(o.l)() ? "LOC" : i(t.frameWindow) ? "SFR" : t.isSafeFrameEnabled ? "IABSFR" : Object(o.l)() ? "DEFAULT" : "LOC"
          }(t),
          n = r.locator.resolve(e);
        if (!Object(s.o)(n)) throw new Error("Render Handler Unavailable");
        return n.render(t)
      }
    };
    r.locator.register("hbrenderingservice", c)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "safeFrameHandler", (function() {
      return a
    }));
    var r = n(1),
      s = n(0),
      i = n(14);

    function o(t) {
      if (!Object(s.o)(t)) return !1;
      const e = function(t) {
        try {
          if ("string" == typeof t && Object(i.c)()) return JSON.parse(t)
        } catch (e) {
          return t
        }
        return t
      }(t.data);
      return !(!e || !e.isMnetHB) && !(!Object(s.o)(e.safeframeRenderSuccess) || !Object(s.o)(e.auctionId))
    }
    var c = n(2);
    const a = {
      render: t => new Promise((e, n) => {
        t.frameWindow.postMessage(function(t) {
          const e = t.adCode,
            n = t.appliedSize;
          let r = "0",
            i = "0";
          return Object(s.o)(n) && (r = n.width, i = n.height), {
            adCode: e,
            height: i,
            isMnetHB: 1,
            width: r
          }
        }(t), "*"), Object(c.b)(window, "message", t => {
          if (o(t)) return e(!0)
        })
      })
    };
    r.locator.register("SFR", a)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(7),
      s = n(0),
      i = ["VIEW_STRAT_IO", "VIEW_STRAT_DOM"],
      o = n(127),
      c = n(1);
    var a = n(2),
      u = n(66),
      d = n(30);
    u.a.register(new class {
      constructor() {
        this.name = "DOM", this.type = d.a.VIEW, this.event = "IMPRESSION_VIEWED", this.elementIdMap = new Map, this.elementCallbackMap = new Map, this.detectorStrategy = (() => {
          for (const t of i) {
            const e = c.locator.resolve(t);
            if (Object(s.o)(e) && e.isSupported()) return e
          }
          return o.domBasedHandler
        })(), this.detectorStrategy.fireCallbackForElement = this.fireCallbackForElement.bind(this)
      }
      isSupported(t) {
        let e = null;
        return Object(s.q)(t) && (e = Object(a.w)(t)), !!Object(a.r)(e) && (this.elementIdMap.set(t, e), Object(a.t)())
      }
      isOneTimeEvent() {
        return !0
      }
      startTracking(t, e) {
        const n = this.elementIdMap.get(e);
        Object(s.o)(n) && (this.elementCallbackMap.set(n, t), this.detectorStrategy.observe(n))
      }
      stopTracking(t) {
        const e = this.elementIdMap.get(t);
        Object(s.o)(e) && this.elementCallbackMap.has(e) && (this.elementCallbackMap.delete(e), this.detectorStrategy.unobserve(e))
      }
      fireCallbackForElement(t, e = {}) {
        if (this.elementCallbackMap.has(t)) {
          const n = this.elementCallbackMap.get(t);
          Object(r.a)(n, [e])
        }
      }
    })
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    class r {
      constructor(t, e, n) {
        this.deviceId = t, this.deviceName = e, this.deviceRegexp = n
      }
      get name() {
        return this.deviceName
      }
      get id() {
        return this.deviceId
      }
      get regexp() {
        return this.deviceRegexp
      }
    }
    var s = n(1);
    const i = new r(0, "UNKNOWN_DEVICE", new RegExp("")),
      o = new r(1, "SMART_TV", new RegExp("smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv?|espial/[d]+|hbbtv/|tvstore|sonydtv|pov_tv-hdmi|nettv/|kylo/|viera;|vap430")),
      c = new r(2, "TABLET", new RegExp("hudl ht7s3 build|kindle( |/)|ipad|tablet|playbook|smartstab|gt-n8000|gt-n8013|gt-p[d][d][d][d]|me371mg|nexuss(7|8|9|[d][d])sbuild/|sm-t[d][d][d]|ssgp[d][d][d] build/|touchpad build|venue7s[d][d][d][d]s|gt-n5100 build|lenovoa3300[-]hv|kfjwisbuild/|shw-mddd[a-z]sbuild/|smarttab10-|sonystablets(s|p)s|huaweismediapadsbuild|thinkpadstablets|vodafonessmarttab|(kfapwa|kfapwi|kfarwi|kfaswi|kfjwa|kfjwi|kfot|kfsawa|kfsawi|kfsowi|kfthwa|kfthwi|kftt)sbuild|ideatabs|mediapads[d]+slitesbuild|midddddsbuild/")),
      a = new r(3, "MOBILE", new RegExp("fennec/|mobile|phone|iphone|ipod|blackberry|playbook|bb10|android|palm|windowss+ce|s60;ssymbos|seriess60|series40|samsung-gt-|sonyericsson|nokia|samsungsgt|nokia|mauisruntime|j2me/midp|brew|docomo/[d]+.[d]+|mis3wsmiui|mauiswapsbrowser|(d|)ddd[*]ddd(d|)(|;)[)]|spreadtrum[ ;]|oppo( |)[a-z][d]|neozenrevo|trendsmicroswtp|doradoswap-browser|huawei(shg520v|(/|_|)[a-z][d][d][d][d])|(alcatel[-_](ot-|ot|one_touch_|)[d][d][d])|deweb60|gionee|(gt-[a-z][d][d][d][d])|(huawei-u[d][d][d][d])|(htc_touch|htc_smart|htc[_-][a-z]+[d][d][d][d])|(karbonnswap-browsersk[d][d]|karbonn(/|[ _|]k[d][d]))|(kddi-[a-z][a-z][d][a-z0-9])|kkt50|lava.discover|lava.kkt|lava.spar|(lemon[ _]((s|t|gc)[d][d][d]|duo))|(samsung-([a-z]|sgh-[a-z])([d]|v)[d][d])|(lg[-/]([a-z]+|)[d][d][d](([a-z]|)/v|[ -]))|(micromax([ |]|)[a-z]+[d][d])|(mot-ex[d]|mot-v[d]|mot-razrv3|mot-l9/)|(nexian( |)nx(-|)[a-z][d])|pantechp|s8500|(sagetel[d]+([a-z]|)_)|softbank/|sonyd2105|(spices(m([ -]|)([d]|i-)[d]|qt(-|))[d][d])|tianyu-ktouch|zensp8|(zte[ -/][a-z](|[- ][a-z])[d][d][d])|videocon-A45")),
      u = new r(4, "DESKTOP", new RegExp("windows|win([d][d]|nt)(s|;|[)])|windowssntsd[.]d|cros;|cross|linux|oss+[x9]|solaris|bsd|x11|mac_powerpc|macintosh|200pleasebot|alexabot|adsbot-google|appengine-google;|asksjeeves/teoma|baiduspider|bingbot|caliperbot/|ccbot/[d]|commons-httpclient|crawler|facebookexternalhit|linkedinbot/|twitterbot/|google[.]com/[+]/web/snippet|feedfetcher-google|googlebot|ia_archiver|kishimobot|luasocket|magpierss|moodlebot|msnbot|nuhk|openbot|pingdom[.]com_bot_version|simplepie|sitesscannersbot|slurp|smtbot/[d]|spbot/[d]|spinn3r|startmebot/|statdom[.]ru/bot|uptimerobot|websspider|spider/|webspider|wget/|yammybot|yodaobot|yandexmetrika/|yandexbot|yacybot|google-http-java-client/|musobot/|yabrowser/")),
      d = new r(5, "GAME_CONSOLE", new RegExp("playstations[d]|playstationsportable|nintendo")),
      l = [o, c, a, u, d, i];
    const h = {
      getDevice: t => {
        let e = function(t) {
          t = t.toLowerCase();
          for (const e of l)
            if (e.regexp.test(t)) return e;
          return i
        }(t);
        return e.id === c.id && t.indexOf("tablet pc") > -1 && (e = u), t.indexOf("android") > -1 && t.indexOf("mobile") > -1 && e.id !== c.id && (e = a), e
      }
    };
    s.locator.register("uadetectorservice", h)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(80),
      s = n(101),
      i = n(2);
    class o {
      constructor() {
        this.activityState = 0, this.abpStatus = "0", this.callbacks = [], this.userPixelFailed = !1, this.extensionPixelFailed = !1, this.checkCount = 2
      }
      check(t, e, n) {
        const r = this.activityState;
        1 !== r ? 2 !== r ? (this.callbacks.push(n), this.activityState = 1, this.detectABP(t, e, t => {
          this.abpStatus = t ? "1" : "2", this.activityState = 2, this.callbacks.forEach(t => {
            t(this.abpStatus)
          })
        })) : n(this.abpStatus) : this.callbacks.push(n)
      }
      static firePixel(t, e, n) {
        const r = (() => {
          const t = new Image;
          return t.style.cssText = "display:none !important;", Object(i.E)("@body:0", 100, e => {
            e.appendChild(t)
          }, !1), t
        })();
        r.onload = e, r.onerror = n, r.src = t
      }
      detectABP(t, e, n) {
        let r, s = !1,
          i = 0;
        const c = t => {
            if (0 === this.checkCount || t > 1e3) return n(0 === this.checkCount && s), void clearTimeout(r);
            i = 2 * t, r = setTimeout(() => c(i), i)
          },
          a = () => {
            this.checkCount -= 1, this.checkCount > 0 || (s = !this.userPixelFailed && this.extensionPixelFailed, n(s), clearTimeout(r))
          };
        o.firePixel(t, a, () => {
          this.userPixelFailed = !0, a()
        }), o.firePixel(e, a, () => {
          this.extensionPixelFailed = !0, a()
        }), c(50)
      }
    }
    var c = new o,
      a = n(1);
    class u extends r.a {
      constructor() {
        super(...arguments), this.strategyName = "pixel", this.userPixel = "https://c.aaxads.com/pxusr.gif", this.extensionPixel = "https://www.aaxdetect.com/pxext.gif", this.cacheKey = "__aaxsc"
      }
      logABPStatus(t) {
        a.log.addEvent("abd", {
          data: {
            detectEnd: a.metrics.getMark("END" + this.strategyName),
            detectStart: a.metrics.getMark("START" + this.strategyName),
            status: t
          }
        })
      }
      execute() {
        return 0 !== this.executionStatus || (a.metrics.mark("START" + this.strategyName), this.executionStatus = 1, this.task = new Promise(t => {
          c.check(this.userPixel, this.extensionPixel, e => {
            this.executionStatus = 2, a.metrics.mark("END" + this.strategyName), this.abpStatus = e, this.logABPStatus(e), s.a.set(this.cacheKey, this.abpStatus), t({
              name: this.name,
              state: this.abpStatus
            })
          })
        })), this.task
      }
    }
    a.locator.register("pixel", new u)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "PrebidProviderAdapter", (function() {
      return u
    }));
    var r = n(1),
      s = n(0);
    const i = {
      getBidderFromCode(t) {
        const e = "Prebid_" + t;
        return r.locator.resolve(e) || void 0
      }
    };
    var o = n(41),
      c = n(46);
    const a = {};
    class u {
      getResponse(t) {
        const e = {
            nData: t,
            nType: "xhr"
          },
          n = r.locator.resolve("resgetter");
        return Object(s.o)(n) ? n.getResponse(e) : Promise.reject()
      }
      doUserSyncWithResponseGetter(t) {
        const e = {
            nData: t,
            nType: t.type
          },
          n = r.locator.resolve("resgetter");
        return Object(s.o)(n) ? n.getResponse(e) : Promise.reject()
      }
      syncPostBidRequest(t, e) {
        if (!Object(s.h)(t.getUserSyncs)) return;
        const n = t.getUserSyncs({
          iframeEnabled: !0,
          pixelEnabled: !0
        }, [{
          body: e
        }], Object(o.c)(), Object(o.e)());
        n && 0 !== n.length && n.forEach(t => this.doUserSyncWithResponseGetter(t))
      }
      sync(t) {
        if (!Object(s.h)(t.getUserSyncs) || a[t.name]) return;
        a[t.name] = !0;
        const e = t.getUserSyncs({
          iframeEnabled: !0,
          pixelEnabled: !0
        }, null, Object(o.c)(), Object(o.e)())[0];
        return e ? this.doUserSyncWithResponseGetter(e) : void 0
      }
      getPrebidRequest(t, e, n) {
        const r = t.placement.placementConfig.providersMapped.getConfigOf(e.id),
          s = n.configLoader({
            epbc: r.get("ecc"),
            epc: r.epcsMapped[0],
            inframe: Object(c.d)(),
            pvid: e.id
          }),
          i = Object(o.d)(t, e, s);
        return t.providerReqId = i.bidderRequestId, n.buildRequests(i.bids, i)
      }
      submit(t) {
        const e = t.provider,
          n = t.placement.id,
          c = e.id,
          a = i.getBidderFromCode(c);
        if (!Object(s.o)(a)) {
          const n = {
            placement: t.placement.placementConfig,
            provider: e,
            reason: 1205
          };
          return Promise.reject(n)
        }
        return this.sync(a), new Promise((s, i) => {
          const u = this.getPrebidRequest(t, e, a),
            d = t.providerReqId;
          r.metrics.markStart("ltime_" + d + n + c), this.getResponse(u).then(i => {
            e.needsUserSyncAfterRequest && this.syncPostBidRequest(a, i);
            const l = a.interpretResponse({
              body: i
            }, u);
            r.metrics.markEnd("ltime_" + d + n + c);
            const h = Object(o.a)(e, t.placement.placementConfig, l[0]),
              g = [];
            if (1 === h.get("s")) h.set("paId", t.applicableSizes.epcs[0]), h.set("epc", t.applicableSizes.epcs[0]);
            else {
              const e = t.applicableSizes.sizes[0];
              h.set("size", e)
            }
            h.set("cPvRqId", d), h.set("dbf", "1"), g.push(h, ...Object(o.b)(t, h.get("size"))), r.log.addEvent("pr", {
              data: g
            }), s(h)
          }).catch(() => {
            i({
              placement: t.placement.placementConfig,
              provider: e,
              reason: 1202
            })
          })
        })
      }
    }
    r.locator.register("prebidadapters", new u)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(93),
      s = n(1),
      i = n(11),
      o = n(0);
    class c extends r.HBClientAdapter {
      constructor() {
        super(...arguments), this.TEMPLATE_META_SEPARATOR = "_", this.NATIVE_SIZE = "1x1"
      }
      getCustomSizes(t) {
        const e = t.get("cTpId");
        if (!Object(o.o)(e)) throw new Error("Making request for a native provider without template");
        const [n] = e && e.split(this.TEMPLATE_META_SEPARATOR);
        return [
          [this.NATIVE_SIZE, n, 1].join(this.TEMPLATE_META_SEPARATOR)
        ]
      }
      get getAdType() {
        return "3"
      }
    }
    s.locator.register("nativeclientadapter", Object(i.a)(new c));
    s.locator.register("nativeadapter", Object(i.a)(new class extends c {
      constructor() {
        super(...arguments), this.clientTemplateMismatch = {}
      }
      processResponse(t, e, n, r) {
        const i = t.placement.get("cTpId"),
          c = s.locator.resolve("nativetemplarerepository"),
          a = {
            placement: t.placement,
            provider: t.provider,
            reason: 1208
          };
        if (!Object(o.o)(c) || !Object(o.o)(i)) return r(a);
        c.find(i).then(s => {
          if (!Object(o.o)(s) || "''" === s.code) return this.fireErrorLog(t.placement.id, i), r(a);
          this.parseAndResolveResponse(t, e, n)
        })
      }
      fireErrorLog(t, e) {
        if (!0 === this.clientTemplateMismatch[t]) return;
        const n = e.split("_")[1];
        s.log.addEvent("el", {
          data: {
            crid: t,
            name: "TEMPLATE_UNAVAILABLE_IN_FRAMEWORK_FOR_".concat(t, "_FOR_").concat(n)
          }
        }), this.clientTemplateMismatch[t] = !0
      }
    }))
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(36),
      s = n(1),
      i = n(106),
      o = n(69);
    var c = n(32);
    s.locator.register("roibidderadapter", new class {
      getEpc(t, e) {
        let n = "";
        return t.sizes.forEach((r, s) => {
          r === e && (n = t.epcs[s])
        }), n
      }
      createBid(t, e, n) {
        const s = new r.a,
          c = t.providersMapped.getConfigOf(e.id).get("ecc"),
          a = n.sizes[0] || "",
          u = this.getEpc(n, a);
        return s.set("s", 1).set("nbr", 0).set("type", "internal").set("crid", t.id).set("pvid", e.id).set("size", a).set("paId", u).set("prvApiId", c).set("epc", u).set("pcrid", u).set("ogBid", i.a.getMinPrice(t.id, e.id)).set("adc", function(t) {
          const e = "cache-busting";
          return ['<script type="text/javascript">\ndocument.writeln(\'<ins id="friendly_' + e + '">\\r\\n<scr\'+\'ipt type="text/javascript" src="https://serving.roimediaconsultants.com/servlet/view/banner/javascript/zone?zid=' + t + "&friendly=friendly_" + e + "&pid=12&fr=60&frlm=1&rmpid=true&random=" + e + "&origin='+encodeURIComponent((window!==top&&window.location.ancestorOrigins)?window.location.ancestorOrigins[window.location.ancestorOrigins.length-1]:document.location)+'&referrer=" + o.a.cleaned + "\"></scr'+'ipt>\\r\\n</ins>');\n<\/script>"].join("")
        }(u)).set("tc", "1").set("dbf", "1")
      }
      submit(t) {
        return new Promise(e => {
          const n = t.placement.placementConfig,
            r = t.provider;
          t.providerReqId = Object(c.a)(), s.metrics.markStart("ltime_" + t.providerReqId + n.id + r.id);
          const i = this.createBid(n, r, t.applicableSizes);
          i.set("cPvRqId", t.providerReqId), s.metrics.markEnd("ltime_" + t.providerReqId + n.id + r.id), s.log.addEvent("pr", {
            data: [i]
          }), e(i)
        })
      }
    })
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(78);
    var s = n(17),
      i = n(1);
    const o = new class {
      isActionApplicable(t) {
        return "NON_PERSONALIZED_ADS" === t && r.a.isApplicable()
      }
    };
    s.a.register(o), i.locator.register("npasrv", o)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "dfpInventoryTracker", (function() {
      return u
    }));
    var r = n(1),
      s = n(0),
      i = n(15);

    function o() {
      window.googletag.pubads().addEventListener("slotRenderEnded", t => {
        const e = "end" + t.slot.getSlotElementId();
        r.metrics.mark(e), c()
      })
    }

    function c() {
      const t = Object(i.a)();
      t.length && r.log.addEvent("gpts", {
        data: {
          allSlots: t
        }
      }, !1)
    }
    var a = n(75);
    const u = {
      track: () => {
        r.app.on("logSlots", c), a.mdom.onDOMLoad(c), window.googletag = window.googletag || {}, window.googletag.cmd = window.googletag.cmd || [], window.googletag.apiReady || !Object(s.h)(window.googletag.cmd.unshift) ? window.googletag.cmd.push(o) : window.googletag.cmd.unshift(o)
      }
    };
    r.locator.register("inventorytracker", u)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "AdBlockDetectLogHandler", (function() {
      return h
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(21),
      a = n(6);
    class u extends a.a {
      constructor(t, e) {
        super(t), this.adBlockDetect = {}, this.adBlockDetect = e
      }
      getAll() {
        return this.decoratorItem.getAll().set("deg", this.adBlockDetect.status || "0").set("gvwduw", this.adBlockDetect.detectStart || "0").set("ghqg", this.adBlockDetect.detectEnd || "0")
      }
    }
    var d = n(1),
      l = n(0);
    class h {
      constructor() {
        this.EVENT_ID = "abd", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(s.c)(this.config.loggingPercentage), this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta)
      }
      handleEvent(t) {
        if (this.isLogDisabled) return;
        Object(l.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID));
        let e = new c.a;
        e = new u(e, t.data), this.logCollection.add(e.getAll()), this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null
      }
    }
    const g = new h;
    d.locator.register(g.EVENT_ID, g)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "ErrorHandler", (function() {
      return g
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(21),
      a = n(1),
      u = n(0),
      d = n(6);
    class l extends d.a {
      constructor(t, e) {
        super(t), this.ERROR_LEVEL = 3, this.DEFAULT_ERROR_NAME = "UNKNOWN", this.DEFAULT_STACK = "NONE", this.errorObject = e || {}
      }
      getAll() {
        return this.decoratorItem.getAll().set("qdph", this.errorObject.name || this.DEFAULT_ERROR_NAME).set("vwdfn", this.errorObject.stack || this.DEFAULT_STACK).set("oyo", this.errorObject.level || this.ERROR_LEVEL).set("fulg", this.errorObject.crid || "").set("sylg", this.errorObject.pvid || "").set("gisGly", this.errorObject.slotId || "").set("ollg", this.errorObject.li || "").set("gisEg", this.errorObject.dfpbd || "").set("ufwu", this.errorObject.refreshCount || "")
      }
    }
    var h = n(24);
    class g {
      constructor() {
        this.EVENT_ID = "el", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(s.c)(this.config.loggingPercentage), this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta)
      }
      handleEvent(t) {
        const e = t.data;
        if (this.isLogDisabled) return;
        Object(u.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID));
        let n = new c.a;
        n = new l(n, e), n.getAll().set("oshu", this.config.loggingPercentage), this.logCollection.add(n.getAll()), this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null
      }
      fire(t, e) {
        Object(u.o)(this.logCollection) && (this.dispatcher.fire(this.logCollection, this.EVENT_ID, e), this.logCollection = null)
      }
    }
    const p = new g;
    a.locator.register(p.EVENT_ID, p), h.a.on("lgTrigger", () => p.fire(), !1)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "FeedbackLogHandler", (function() {
      return g
    }));
    var r = n(19),
      s = n(18),
      i = n(0),
      o = n(21),
      c = n(6);
    class a extends c.a {
      constructor(t, e) {
        super(t), this.feedbackData = e
      }
      getAll() {
        return this.decoratorItem.getAll().set("glvw", this.feedbackData.dist || "0").set("plvO", this.feedbackData.misL || "0").set("qwUho", this.feedbackData.ntRel || "0").set("suOe", this.feedbackData.prLb || "0").set("udwh", this.feedbackData.rate || "0").set("wrre", this.feedbackData.toob || "0")
      }
    }
    var u = n(1),
      d = n(16),
      l = n(49),
      h = n(35);
    class g {
      constructor() {
        this.EVENT_ID = "fd", this.config = d.a.getConfigOf(this.EVENT_ID), this.logCollection = null, this.dispatcher = r.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta)
      }
      handleEvent(t) {
        const e = t.data.feedbackData,
          n = t.data.bid;
        Object(i.o)(this.logCollection) || (this.logCollection = new s.a(this.EVENT_ID));
        let r = new o.a;
        r = new l.a(r, n), r = new h.a(r, n.providerId), r = new a(r, e), this.logCollection.add(r.getAll()), this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null
      }
    }
    const p = new g;
    u.locator.register(p.EVENT_ID, p)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "FailOverHandler", (function() {
      return h
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(21),
      a = n(6);
    class u extends a.a {
      constructor(t, e, n) {
        super(t), this.action = e, this.reason = n
      }
      getAll() {
        return this.decoratorItem.getAll().set("d", this.action).set("u", this.reason)
      }
    }
    var d = n(1),
      l = n(0);
    class h {
      constructor() {
        this.EVENT_ID = "fl", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(s.c)(this.config.loggingPercentage), this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta)
      }
      handleEvent(t) {
        const e = t.data.reason,
          n = t.data.action;
        if (this.isLogDisabled) return;
        Object(l.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID));
        let r = new c.a;
        r = new u(r, n, e), r.getAll().set("oshu", this.config.loggingPercentage), this.logCollection.add(r.getAll()), this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null
      }
    }
    const g = new h;
    d.locator.register(g.EVENT_ID, g)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "ProviderResponseHandler", (function() {
      return S
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(21),
      a = n(35),
      u = n(50),
      d = n(63),
      l = n(64),
      h = n(83),
      g = n(84),
      p = n(6);
    class f extends p.a {
      constructor(t, e) {
        super(t), this.bid = e
      }
      getAll() {
        return this.decoratorItem.getAll().set("gzqw", this.bid.get("dwnt") || 0).set("zw", this.bid.get("wt") || 0).set("gxu", this.bid.get("dur") || 0)
      }
    }
    var b = n(1),
      m = n(24),
      v = n(0),
      w = n(65),
      O = n(85),
      y = n(61),
      E = n(62),
      j = n(67);
    class S {
      constructor() {
        this.EVENT_ID = "pr", this.PMP_EVENT_ID = "pmppr", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogEnabled = !Object(s.c)(this.config.loggingPercentage), this.isLogEnabledForPrivateAuction = this.isLogEnabled, this.pmpLoggingPercentage = this.config.loggingPercentage, this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta), this.initialisePmpLoggingValues()
      }
      handleEvent(t, e) {
        t.data.filter(t => this.hasToBeLogged(t)).forEach(t => {
          this.handleBidResponseLogging(t)
        }), e && this.fire()
      }
      initialisePmpLoggingValues() {
        try {
          const t = r.a.getConfigOf(this.PMP_EVENT_ID);
          this.pmpLoggingPercentage = t.loggingPercentage, this.isLogEnabledForPrivateAuction = !Object(s.c)(this.pmpLoggingPercentage)
        } catch (t) {}
      }
      hasToBeLogged(t) {
        return t.isPrivateDeal() ? this.isLogEnabledForPrivateAuction : this.isLogEnabled
      }
      setLoggingPercentage(t, e) {
        const n = e.isPrivateDeal() ? this.pmpLoggingPercentage : this.config.loggingPercentage;
        t.getAll().set("oshu", n)
      }
      handleBidResponseLogging(t) {
        Object(v.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID)), t = j.a.applyRevContract(t);
        let e = new c.a;
        e = new a.a(e, t.providerId), e = new u.a(e, t.placementId), e = new d.a(e, t), e = new l.a(e, t), e = new y.a(e, t), e = new E.a(e, t), e = new h.a(e, t.get("mlogs")), e = new g.a(e, t.get("sp")), e = new w.a(e, t), e = new O.a(e, t.get("pageCat")), e = new f(e, t), this.setLoggingPercentage(e, t), this.logCollection.add(e.getAll())
      }
      fire() {
        Object(v.o)(this.logCollection) && (this.dispatcher.fire(this.logCollection, this.EVENT_ID), this.logCollection = null)
      }
    }
    const I = new S;
    b.locator.register(I.EVENT_ID, I), m.a.on("lgTrigger", () => I.fire(), !1)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "PublisherSlotImpressionHandler", (function() {
      return v
    }));
    var r = n(16),
      s = n(13),
      i = n(18),
      o = n(19),
      c = n(21),
      a = n(1),
      u = n(24),
      d = n(60),
      l = n(50),
      h = n(6),
      g = n(0);
    class p extends h.a {
      constructor(t, e) {
        super(t), this.auctioneer = e
      }
      getPlacementSize() {
        const t = this.auctioneer.placementSubmitted.placementConfig.sizes;
        return t.length > 0 ? t[0].toString() : ""
      }
      getAll() {
        const t = a.locator.resolve("auctionhelper");
        let e = [];
        Object(g.o)(t) && (e = t.getWinners(this.auctioneer));
        const n = e.length > 0;
        return this.decoratorItem.getAll().set("sylg", "0").set("v", 1).set("vqp", "success").set("wrfrqvlghu", "0").set("lze", n ? "1" : "0").set("vlch", this.getPlacementSize())
      }
    }
    var f = n(87),
      b = n(86),
      m = n(51);
    class v {
      constructor() {
        this.EVENT_ID = "psi", this.config = r.a.getConfigOf(this.EVENT_ID), this.isLogDisabled = Object(s.c)(this.config.loggingPercentage), this.logCollection = null, this.dispatcher = o.a.getDispatcher(this.config.method, this.EVENT_ID, this.config.meta)
      }
      handleEvent(t, e) {
        if (this.isLogDisabled) return;
        Object(g.o)(this.logCollection) || (this.logCollection = new i.a(this.EVENT_ID));
        const n = t.data.auctioneer;
        let r = new c.a;
        r = new d.a(r, n), r = new l.a(r, n.placementSubmitted.id), r = new p(r, n), r = new f.a(r, n), r = new b.a(r, n);
        const s = n.placementSubmitted.domReference;
        Object(g.o)(s) && (r = new m.a(r, s)), this.logDisplayTime(r, n), this.logDfpDivId(r, n), this.setLoggingPercentage(r), this.logCollection.add(r.getAll()), e && this.fire()
      }
      fire(t, e) {
        Object(g.o)(this.logCollection) && (this.dispatcher.fire(this.logCollection, this.EVENT_ID, e), this.logCollection = null)
      }
      logDisplayTime(t, e) {
        const n = a.metrics.measure("dspl_time_" + e.auctionId);
        t.getAll().set("gvsowlph", n)
      }
      logDfpDivId(t, e) {
        const n = e.placementSubmitted.domReference || "";
        t.getAll().set("gisGly", n)
      }
      setLoggingPercentage(t) {
        t.getAll().set("oshu", this.config.loggingPercentage)
      }
    }
    const w = new v;
    a.locator.register(w.EVENT_ID, w), u.a.on("lgTrigger", () => w.fire(), !1)
  }, function(t, e, n) {
    "use strict";
    n.r(e), n.d(e, "defaultHandler", (function() {
      return o
    }));
    var r = n(1),
      s = n(104),
      i = n(0);
    const o = {
      render: t => new Promise(e => {
        const n = t.adCode;
        let r;
        r = function(t) {
          let e = t.frameWindow;
          if (t.sb) {
            const t = Object(s.a)(e);
            e = Object(i.o)(t) ? t : e
          }
          return e
        }(t), r.document.open(), r.document.write(n), r.document.close(), e(!0)
      })
    };
    r.locator.register("DEFAULT", o)
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(0),
      s = n(66),
      i = n(30);
    n(1).locator.register("detectionserviceviewableimpression", t => {
      for (const e of ["DOM"]) {
        const n = s.a.resolve(e, i.a.VIEW);
        if (Object(r.o)(n) && n.isSupported(t)) return n
      }
      return null
    })
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(0),
      s = n(66),
      i = n(30);
    n(1).locator.register("detectionserviceclicktracking", t => {
      for (const e of ["HEURISTIC_UNLOAD"]) {
        const n = s.a.resolve(e, i.a.CLICK);
        if (Object(r.o)(n) && n.isSupported(t)) return n
      }
      return null
    })
  }, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(1),
      s = n(3),
      i = n(0),
      o = n(23),
      c = n(53),
      a = n(8),
      u = n(17),
      d = n(5);
    const l = new s.a({
      "ip2ct": "HAIFA",
      "cugd": "",
      "coc": "AS",
      "ip2c": "IL",
      "cid": "AAX763KC6",
      "dma": "",
      "app": "green",
      "dn": "old.reddit.com",
      "itype": "AAX",
      "pid": "8PR6YK195",
      "sver": "011310_169_011310_125_ssp",
      "sugd": "desktop",
      "servname": "rtb-nv-dcos-ssp-10-6-36-9-24100",
      "ssl": true,
      "ip2sc": "",
      "version": "4",
      "viewId": "1610613194",
      "mNVsid": "2512840698138346000V10",
      "ip": "77.139.102.135",
      "ip2z": "d",
      "sspAbTestBucket": "CONTROL"
    });
    const h = {
      eprurl: l.get("eprurl"),
      ip2ct: l.get("ip2ct"),
      cugd: function() {
        const t = r.locator.resolve("uadetectorservice"),
          e = t && t.getDevice(navigator.userAgent).id;
        return Object(i.o)(e) ? e : 0
      }(),
      coc: l.get("coc"),
      ip2c: l.get("ip2c"),
      dn: o.a.host,
      dma: l.get("dma"),
      app: l.get("app"),
      sugd: l.get("sugd"),
      servname: l.get("servname"),
      sver: l.get("sver"),
      ssl: l.get("ssl"),
      ip2sc: l.get("ip2sc"),
      version: l.get("version"),
      mNVsid: u.a.isActionApplicable("STOP_LOGGING_VISITOR_ID") ? "" : l.get("mNVsid"),
      ip2z: l.get("ip2z"),
      cid: l.get("cid"),
      pid: l.get("pid"),
      visitId: Object(a.j)(Object(c.c)((() => {
        const t = l.get("ip");
        return Object(i.o)(t) ? u.a.isActionApplicable("TRIM_LAST_OCTET") ? Object(c.d)(t) : t : Object(c.a)()
      })())),
      viewId: (() => {
        const t = Object(d.c)(1e8, 999999999).toString();
        return (l.get("viewId") || Math.round((new Date).getTime() / 1e3).toString()) + t
      })(),
      sspAbTestBucket: l.get("sspAbTestBucket")
    };
    r.app.env(h)
  }]);
  window.aax.app.start();