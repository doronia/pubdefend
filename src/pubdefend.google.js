import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";

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

export function googletagHandler(callback) {
	var gtag = window["googletag"];

	/* googletag defined Slots */
	function Slots() {
		return window.googletag
			.pubads()
			.getSlots()
			.map(function (slot) {
				return {
					id: slot.getSlotElementId(),
				};
			});
	}
	solts_req = Slots();

	store(_store, "gs", solts_req.length);
	logger.log("pubdefend[g]:: slots count:", solts_req);

	Listener = gtag.pubads().addEventListener("slotRenderEnded", listenForSlots.bind(null, listenForSlotsCallback), false);

	if (callback) {
		callback("listen");
	}

	return;
}

function listenForSlots(callback, event) {
	var slot = event.slot;
	var slotId = slot.getSlotElementId();
	var slotElm = document.getElementById(slotId);
	var slotIsVisible = checkIfVisible(slotElm);
	solts_arr[slotId] = { 0: true, 1: slotIsVisible, 2: event.isEmpty, 3: event.size };

	logger.log("pubdefend[g]:: Slot", slot.getSlotElementId(), "finished rendering.");

	if (!rendered) {
		var FindElements = domQuery.find('div[id*="google_ad"]');
		store(_store, "gi", FindElements.length);
		customEvent(config.constants.gtag, FindElements.length);
		if (callback) {
			callback(FindElements);
		}
	}
	rendered = true;
}

var listenForSlotsCallback = function (arr) {
	if (isArray(arr)) {
		/* var slotObj = {};
		arr.forEach(function (val) {
			logger.log(val.parentElement.id);
			var pid = val.parentElement.id,
				firstc = val.firstElementChild.nodeName,
				firstcid = val.firstElementChild.id;
			if (firstc && firstcid) {
				slotObj[pid] = { type: firstc, id: firstcid };
			}
		});
		slotObj.slotsCount = Object.keys(slotObj).length; */
	}
};
