import { config } from "./pubdefend.config";

export function bait(callback) {
	var endpoint = config.endpoints;
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
