import { pd } from "./pubdefend.init";
import { store } from "./pubdefend.events";
import { domQuery, checkIfVisible } from "./pubdefend.dom";
import { isArray } from "./pubdefend.polyfills";
import { customEvent } from "./pubdefend.events";

var _store = pd.store;
var solts_arr = {},
	gtag_impr = [],
	solts_req = 0,
	solts_rec = 0,
	Listener,
	rendered = false;

export function Slots() {
	return window.googletag
		.pubads()
		.getSlots()
		.map(function (slot) {
			return {
				adUnitPath: slot.getAdUnitPath(),
				responseInformation: slot.getResponseInformation(),
			};
		});
}

export function gtagHandler(callback) {
	var gtag = window["googletag"];

	/* googletag defined Slots */
	solts_req = googletag.pubads().getSlots().length;
	store(_store, "gtag_slots", solts_req);
	logger.log("googaltag slots:", solts_req);

	Listener = gtag.pubads().addEventListener("slotRenderEnded", listenForSlots.bind(null, listenForSlotsCallback), false);

	if (callback) {
		callback("blocked");
	}

	return;
}

var listenForSlots = function (callback, event) {
	//var listenForSlots = function (event) {
	var slot = event.slot;
	//logger.log(slot);

	var id = slot.getSlotElementId();
	var elm = document.getElementById(id);
	var isItVisible = checkIfVisible(elm);
	//solts_arr[id] = true;
	solts_arr[id] = { 0: true, 1: isItVisible, 2: event.isEmpty, 3: event.size };

	logger.group("Slot", slot.getSlotElementId(), "finished rendering.");
	logger.log("Is empty?:", event.isEmpty);
	logger.log("Size:", event.size);
	logger.groupEnd();
	//logger.log('Slot', slot.getSlotElementId(), 'visibility:', isItVisible);
	//logger.log("solts_arr", solts_arr);

	if (!rendered) {
		var gtagFindElements = domQuery.find('div[id*="google_ad"]');
		store(_store, "gtag_impr", gtagFindElements.length);
		customEvent("impr", gtagFindElements.length);
		if (callback) {
			callback(gtagFindElements);
		}
	}
	rendered = true;
};

var listenForSlotsCallback = function (arr) {
	if (isArray(arr)) {
		var slotElementId = {};
		arr.forEach(function (val) {
			var type = val.firstElementChild.nodeName ? val.firstElementChild.nodeName : false;
			if (type) {
				slotElementId[val.parentElement.id] = { type: val.firstElementChild.nodeName, id: val.firstElementChild.id };
			}
		});
		slotElementId.slots = Object.keys(slotElementId).length;
		logger.debug(slotElementId);
		logger.debug("solts_arr", solts_arr);
	}
};
