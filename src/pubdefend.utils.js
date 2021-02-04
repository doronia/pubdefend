import { config } from "./pubdefend.config";

/* Returns false for null and undefined, true for everything else. */
export const exists = (val) => {
	return val !== undefined && val !== null;
};

export const isObject = function (val) {
	return typeof val === "object" && exists(val) && !Array.isArray(val) && !(val instanceof RegExp) && !(val instanceof String) && !(val instanceof Number);
};

export const isString = function (val) {
	return typeof val === "string" || val instanceof String;
};

export const isEmpty = function (val) {
	if (isString(val) || isArray(val)) {
		return val.length === 0;
	} else if (isObject(val)) {
		for (var name in val) {
			return false;
		}
		return true;
	} else {
		throw new TypeError("Val must be a string, array or object");
	}
};

export const isFunction = function (v) {
	return typeof v === "function";
};

export const keysIn = function (obj) {
	if (!obj) {
		return [];
	}
	var keys = [];
	for (var key in obj) {
		keys.push(key);
	}
	return keys;
};

export const objValues = function (obj) {
	var keys = Object.keys(obj);
	var length = keys.length;
	var vals = new Array(length);
	for (var i = 0; i < length; i++) {
		vals[i] = obj[keys[i]];
	}
	return vals;
};

export const getIframeContent = function (frameId) {
	var frameObj = document.getElementById(frameId);
	var frameContent = frameObj.contentWindow.document.body.innerHTML;
	return frameContent;
};

export const abEnabled = function (callback) {
	var url = "https://" + config.static + "/js/ad_banner.js";
	var xhr = new XMLHttpRequest();
	xhr.open("HEAD", url, true);
	xhr.onload = function (e) {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			var status = xhr.status;
			if (status === 0 || (status >= 200 && status < 400)) {
				//console.log('xhr.status:', true);
				if (callback) callback(false);
			}
		}
	};
	xhr.onerror = function (e) {
		if (callback) callback(true);
		//console.log('xhr.status:', false);
	};
	xhr.send(null);
};

/* export const loadScript = function(src) {
    let script = document.createElement('script');
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
}
 */

export function loadScript(src, onLoad) {
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

export const detectPid = function () {
	const e = document.querySelector("[pub-defend-property]");
	if (e == null) return;

	const d = e.getAttribute("pub-defend-property");
	const o = e.getAttribute("pubdefend-opts") || "{}";

	return {
		id: d,
		options: o,
	};
};

export const canStringify = typeof JSON !== "undefined" && typeof JSON.stringify !== "undefined";

export const documentReady = function (callback) {
	if (document.readyState === "interactive" || document.readyState === "complete") {
		setTimeout(callback, 0);
	} else {
		document.addEventListener("DOMContentLoaded", callback);
	}
};

export const getDomain = function (url, subdomain) {
	subdomain = subdomain || false;
	url = url.replace(/(https?:\/\/)?(www.)?/i, "");
	if (!subdomain) {
		url = url.split(".");
		url = url.slice(url.length - 2).join(".");
	}
	if (url.indexOf("/") !== -1) {
		return url.split("/")[0];
	}
	return url;
};

function lsplit(e, t, n) {
	var o = e.split(t);
	return o.slice(0, n - 1).concat(o.length >= n ? o.slice(n - 1).join(t) : []);
}

export const getHostName = function (e) {
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

export function uniqueID() {
	return new Date().getTime().toString().concat(performance.now());
}
