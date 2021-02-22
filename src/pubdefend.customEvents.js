/* 
not in use

https://github.com/shystruk/custom-event-js/blob/master/src/custom-event-js.js
import CustomEvent from 'custom-event-js'

// Listen event 'SHOW_NAME'
CustomEvent.on('SHOW_NAME', (data) => {
    console.log(data.detail) // { name: 'GitHub' }
})

// Dispatch event 'SHOW_NAME' with data
CustomEvent.dispatch('SHOW_NAME', { name: 'GitHub' })

// Remove event listener
CustomEvent.off('SHOW_NAME')
*/

_CustomEventPolyfill();

var TARGET = document;
var EVENTS = {};

/**
 * @param {String} eventName
 * @param {Object} detail
 */
function _dispatchEvent(eventName, detail) {
	var event = new CustomEvent(eventName, {
		detail: detail,
	});

	TARGET.dispatchEvent(event);
}

function _CustomEventPolyfill() {
	if (typeof window.CustomEvent === "function") {
		return;
	}

	function CustomEvent(event, params) {
		var evt = document.createEvent("CustomEvent");

		params = params || { bubbles: false, cancelable: false, detail: undefined };
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
}

module.exports = {
	/**
	 * @param {String} eventName
	 * @param {Function} callback
	 */
	on: function (eventName, callback) {
		EVENTS[eventName] = callback;
		TARGET.addEventListener(eventName, callback);
	},

	/**
	 * @param {String} eventName
	 */
	off: function (eventName) {
		TARGET.removeEventListener(eventName, EVENTS[eventName]);
		delete EVENTS[eventName];
	},

	/**
	 * @param {String} eventName
	 * @param {Object} detail
	 */
	dispatch: function (eventName, detail) {
		_dispatchEvent(eventName, detail || null);
	},
};

export var createInstance = function (classObj, options) {
	var event;
	let eventString = "LazyLoad::Initialized";
	let instance = new classObj(options);
	try {
		// Works in modern browsers
		event = new CustomEvent(eventString, { detail: { instance } });
	} catch (err) {
		// Works in Internet Explorer (all versions)
		event = document.createEvent("CustomEvent");
		event.initCustomEvent(eventString, false, false, { instance });
	}
	window.dispatchEvent(event);
};
