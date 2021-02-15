import { config } from "./pubdefend.config";
import { customEvent } from "./pubdefend.events";

var endpoint = config.endpoints;

export function bait(callback) {
	var url = "https://" + endpoint.cdn + "." + endpoint.domain + "/js/" + endpoint.bait;
	var xhr = new XMLHttpRequest();
	xhr.open("HEAD", url, true);
	xhr.onload = function (e) {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			var status = xhr.status;
			if (status === 0 || (status >= 200 && status < 400)) {
				if (callback) callback(false);
				return;
			}
		}
	};
	xhr.onerror = function (e) {
		if (callback) callback(true);
	};
	xhr.send(null);
}
