import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";
import { isObject } from "./pubdefend.utils";
import { entries } from "./pubdefend.polyfills";
import { appendLog } from "./pubdefend.logs";
var _eventQueue = pd.eventQueue;

export function saveEventQueue(eventName, data) {
	if (!eventName || !data) return;

	_eventQueue[eventName] = data;

	/* if (_eventQueue.indexOf(name) !== -1) {
		_eventQueue[name].push(data);
	} else {
		logger.warn("eventQueue duplicate key:", _eventQueue, name, data);
	} */
}

export function store(obj, prop, val) {
	if (!isObject(obj) || !prop || 0 === prop.length || !val || 0 === val.length) return;

	obj[prop] = val;

	/* <Dev Only> */
	if (isObject(val)) {
		for (const [key, value] of entries(val)) {
			appendLog(prop + "::" + key + ": " + value);
		}
	} else {
		appendLog(prop + ": " + val);
	}
	/* </Dev Only> */
}

export function getStore(encode) {
	var _obj = pd.store;
	var storeItems = JSON.stringify(_obj);
	if (encode) {
		return btoa(storeItems);
	}
	return _obj;
}

export function customEvent(eventName, payload) {
	if (!eventName) return;
	var payload = payload ? payload : "none";
	var event;
	let eventString = eventName;
	try {
		event = new CustomEvent(eventString, { detail: { payload } });
	} catch (err) {
		event = document.createEvent("CustomEvent");
		event.initCustomEvent(eventString, false, false, { payload });
	}
	window.dispatchEvent(event);
}

export function stateListeners(event) {
	/**
	 TODO: handle ws publish if not connected.
	 */
	if (!event.type) return;
	logger.log("pubdefend [" + event.type + " Listener]:: ws", pd.state[config.constants.ws]);

	pd.state[event.type] = true;

	/**
	 * Send data if WS was ready before the event was fire
	 */
	if (pd.state[config.constants.ws]) {
		/**
		 * Dev only
		 */
		saveEventQueue(event.type, event.detail.payload);

		/**
		 * publish message to server
		 */
		logger.log("pubdefend [EventQueue]::", event.type, event.detail.payload);
		logger.log("pubdefend [publish]::", event.type, event.detail.payload);
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

	/**
	 * Remove listener after dispatchEvent
	 */
	window.removeEventListener(event.type, stateListeners);
}
