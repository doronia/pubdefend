import { pd } from "./pubdefend.init";
import { canStringify, isObject } from "./pubdefend.utils";
import { config } from "./pubdefend.config";
import Cookies from "./pubdefend.cookies";
import { entries } from "./pubdefend.polyfills";
import { appendLog } from "./pubdefend.logs";

export const setCookie = function (name, value, ttl) {
	Cookies.set(name, value, ttl, config.cookieDomain || config.domain);
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

export function addEventListener(element, eventType, eventHandler, useCapture) {
	if (element.addEventListener) {
		element.addEventListener(eventType, eventHandler, useCapture);
		return true;
	}
	if (element.attachEvent) {
		return element.attachEvent(eventType, eventHandler);
	}
	element["on" + eventType] = eventHandler;
}

export function store(obj, prop, val) {
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

export function getStore(encode) {
	var _obj = pd.store;
	var storeItems = JSON.stringify(_obj);
	if (encode) {
		return btoa(storeItems);
	}
	return _obj;
}

export function customEvent(name, details) {
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
