import { pd } from "./pubdefend.init";
import { saveEventQueue, store, getStore } from "./pubdefend.events";
import { domQuery, checkIfVisible } from "./pubdefend.dom";
import { isArray } from "./pubdefend.polyfills";

var _store = pd.store;
var solts_arr = {},
	gtag_impr = [],
	solts_req = 0,
	solts_rec = 0,
	Listener,
	rendered = false;

export function gtagHandler(callback) {
	var g = googletag.pubads();
	solts_req = g.getSlots().length;
	store(_store, "gtag_slots", solts_req);

	/* listenForSlots */
	if (!_store.ab) {
		console.debug("pubdefend:: No adblocker detected. listen to gtag");
		Listener = g.addEventListener("slotRenderEnded", listenForSlots.bind(null, listenForSlotsCallback), false);
	} else {
		if (callback) {
			callback("blocked");
		}
	}
	console.log("googaltag slots:", solts_req);
	return;
}

var listenForSlots = function (callback, event) {
	var slot = event.slot;
	var id = slot.getSlotElementId();
	var elm = document.getElementById(id);
	var isItVisible = checkIfVisible(elm);
	solts_arr[id] = true;
	//solts_arr[id] = { render: true, visible: isItVisible };

	console.log("googaltag Slot", slot.getSlotElementId(), "finished rendering.");
	//console.log('Slot', slot.getSlotElementId(), 'visibility:', isItVisible);
	//console.log("solts_arr", solts_arr);

	if (!rendered) {
		var gtagFindElements = domQuery.find('div[id*="google_ad"]');
		store(_store, "gtag_impr", gtagFindElements.length);
		if (callback) {
			callback(gtagFindElements);
		}
	}
	rendered = true;
};

var listenForSlotsCallback = function (arr) {
	/* if (!isArray(arr)) return;
	arr.forEach(function (val) {
		console.log(val.parentElement.id);
	}); */

	console.log(getStore());
};
