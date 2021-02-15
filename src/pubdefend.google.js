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

export function gtagHandler(g, callback) {
	var gtag = window["googletag"];

	/* googletag defined Slots */
	solts_req = googletag.pubads().getSlots().length;
	store(_store, "gtag_slots", solts_req);
	console.log("googaltag slots:", solts_req);

	Listener = gtag.pubads().addEventListener("slotRenderEnded", listenForSlots.bind(null, listenForSlotsCallback), false);

	if (callback) {
		callback("blocked");
	}

	return;
}

var listenForSlots = function (callback, event) {
	//var listenForSlots = function (event) {
	var slot = event.slot;
	//console.log(slot);

	var id = slot.getSlotElementId();
	var elm = document.getElementById(id);
	//var isItVisible = checkIfVisible(elm);
	//solts_arr[id] = true;
	//solts_arr[id] = { render: true, visible: isItVisible };

	console.group("Slot", slot.getSlotElementId(), "finished rendering.");
	console.log("Is empty?:", event.isEmpty);
	console.log("Size:", event.size);
	console.groupEnd();
	//console.log('Slot', slot.getSlotElementId(), 'visibility:', isItVisible);
	//console.log("solts_arr", solts_arr);

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
		console.table(slotElementId);
	}
};
