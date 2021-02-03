import { entries } from "./pubdefend.polyfills";

export function murmurhash3_32_gc(key) {
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

export var fpHardware = getFingerprint(true);
export var fpExtend = getFingerprint(false);
