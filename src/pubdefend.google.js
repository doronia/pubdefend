import { pd } from "./pubdefend.init";
import { store } from "./pubdefend.events";
import { domQuery, checkIfVisible } from "./pubdefend.dom";

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
	var getslots = Slots();
	var getAllEvents = window.googletag.getEventLog().getAllEvents();

	listenForSlotsCallback(getAllEvents);
	console.debug("getAllEvents", getAllEvents);
	solts_req = g.pubads().getSlots().length;
	console.log("googaltag slots:", solts_req);
	store(_store, "gtag_slots", solts_req);

	/* listenForSlots */
	//if (!_store.ab) {
	//console.debug("pubdefend:: No adblocker detected. listen to gtag");
	//g.addEventListener("slotRenderEnded", listenForSlots, false);

	/* googletag.pubads().addEventListener("slotRenderEnded", function (event) {
		var slot = event.slot;
		console.group("Slot", slot.getSlotElementId(), "finished rendering.");

		// Log details of the rendered ad.
		console.log("Advertiser ID:", event.advertiserId);
		console.log("Campaign ID: ", event.campaignId);
		console.log("Creative ID: ", event.creativeId);
		console.log("Is empty?:", event.isEmpty);
		console.log("Line Item ID:", event.lineItemId);
		console.log("Size:", event.size);
		console.log("Source Agnostic Creative ID:", event.sourceAgnosticCreativeId);
		console.log("Source Agnostic Line Item ID:", event.sourceAgnosticLineItemId);
		console.groupEnd();
	}); */

	//Listener = g.addEventListener("slotRenderEnded", listenForSlots.bind(null, listenForSlotsCallback), false);
	//} else {
	if (callback) {
		callback("blocked");
	}
	//}

	return;
}

//var listenForSlots = function (callback, event) {
var listenForSlots = function (event) {
	var slot = event.slot;
	console.log(slot);

	var id = slot.getSlotElementId();
	var elm = document.getElementById(id);
	var isItVisible = checkIfVisible(elm);
	solts_arr[id] = true;
	//solts_arr[id] = { render: true, visible: isItVisible };

	console.log("googaltag Slot", slot.getSlotElementId(), "finished rendering.");
	//console.log('Slot', slot.getSlotElementId(), 'visibility:', isItVisible);
	//console.log("solts_arr", solts_arr);

	//if (!rendered) {
	var gtagFindElements = domQuery.find('div[id*="google_ad"]');
	console.log(gtagFindElements);
	store(_store, "gtag_impr", gtagFindElements.length);
	if (callback) {
		callback(gtagFindElements);
	}
	//}
	//rendered = true;
};

var listenForSlotsCallback = function (arr) {
	var slotElementId = {};
	arr.forEach(function (val) {
		if (val.m) {
			var id = val.m.getSlotElementId();
			if (!slotElementId.hasOwnProperty(id)) {
				slotElementId[id] = id;
			}
		}
	});
	console.debug(slotElementId);
	var gtagFindElements = domQuery.find('iframe[id*="google_ad"]');
	console.log(gtagFindElements);
	//console.log(getStore());
};
