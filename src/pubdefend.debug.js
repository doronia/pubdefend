import { pd } from "./pubdefend.init";

export function log(isDebug) {
	if (isDebug && window.console && typeof console.log === "function") {
		window.logger = { log: window.console.log.bind(console.log) };
	} else {
		window.logger = function () {};
	}
}
