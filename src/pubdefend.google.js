import { pd } from './pubdefend.init'
import { saveEventQueue, store } from './pubdefend.events';
import { domQuery, checkIfVisible } from "./pubdefend.dom";
import { isArray } from "./pubdefend.utils";

var _store = pd.store;
var solts_arr = [],
    gtag_impr = [],
    solts_req = 0,
    solts_rec = 0,
    Listener,
    x = 0;


export function gtagHandler() {
    console.log('pubdefend:: ready')
    var g = googletag.pubads()
    solts_req = g.getSlots().length;
    store(_store, 'gtag_slots', solts_req);



    /* listenForSlots */
    if (!_store.ab) {
        console.debug('No adblocker detected');
        Listener = g.addEventListener("slotRenderEnded", listenForSlots.bind(null, forEachElemnt), false);
    }

    console.log('slots:', solts_req);
}

var listenForSlots = function(callback, event) {
    x++;
    var slot = event.slot;
    var id = slot.getSlotElementId();
    var elm = document.getElementById(id);
    var isItVisible = checkIfVisible(elm);
    solts_arr[id] = { 'render': true, "visible": isItVisible };

    console.log('Slot', slot.getSlotElementId(), 'finished rendering.');
    //console.log('Slot', slot.getSlotElementId(), 'visibility:', isItVisible);
    //console.log('solts_arr', solts_arr)

    if (solts_rec < solts_req) {
        var gtag_elements = domQuery.find('div[id*="google_ad"]');
        solts_rec = gtag_elements.length;

        store(_store, 'gtag_impr', solts_rec);
        if (callback) callback(gtag_elements);
    }

    store(_store, 'slots_arr', solts_arr)
}

var forEachElemnt = function(arr) {
    if (!isArray(arr)) return;
    arr.forEach(function(val) {
        console.log(val.parentElement.id);
    });
}