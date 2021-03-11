import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";
import { store } from "./pubdefend.events";
import { domQuery, checkIfVisible } from "./pubdefend.dom";
import { customEvent } from "./pubdefend.events";

var _store = pd.store;
var solts_arr = {},
	solts_req = 0,
	rendered = false;

export function googletagHandler(callback) {
	/* googletag defined Slots */
	function Slots() {
		return window["googletag"]
			.pubads()
			.getSlots()
			.map(function (slot) {
				return {
					id: slot.getSlotElementId(),
				};
			});
	}
	solts_req = Slots();

	store(_store, "gds", solts_req.length);
	logger.log("[g] slots count:", solts_req);

	window["googletag"].pubads().addEventListener("slotRenderEnded", listenForSlots, false);

	if (callback) {
		callback("listen");
	}

	return;
}

function listenForSlots(event) {
	var slot = event.slot;
	var slotId = slot.getSlotElementId();
	var slotElm = document.getElementById(slotId);
	var slotIsVisible = checkIfVisible(slotElm);
	solts_arr[slotId] = { 0: true, 1: slotIsVisible, 2: event.isEmpty, 3: event.size };

	logger.log("[g] Slot", slot.getSlotElementId(), "finished rendering.");

	if (!rendered) {
		var FindElements = domQuery.find('div[id*="google_ad"]');
		store(_store, "grs", FindElements.length);
		customEvent(config.constants.gtag, FindElements.length);
	}
	rendered = true;
}
