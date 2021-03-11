/**
 * Console.log wrapper on/off
 * @param {boolean} isDebug
 */
export function log(isDebug) {
	if (isDebug && window.console && typeof console.log === "function") {
		window.logger = {
			log: window.console.log.bind(window.console, "pubdefend:: %s"),
		};
	} else {
		var __no_op = function () {};
		window.logger = {
			log: __no_op,
		};
	}
}
