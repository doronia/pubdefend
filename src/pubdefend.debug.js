import { pd } from "./pubdefend.init";

export function log(isDebug) {
	if (isDebug && window.console && typeof console.log === "function") {
		window.logger = {
			log: window.console.log.bind(console.log),
			/* error: window.console.error.bind(console.error),
			info: window.console.info.bind(console.info),
			warn: window.console.warn.bind(console.warn),
			//table: window.console.table.bind(console.table),
			group: window.console.group.bind(console.group),
			groupEnd: window.console.groupEnd.bind(console.groupEnd),
			debug: window.console.debug.bind(console.debug), */
		};
	} else {
		var __no_op = function () {};
		window.logger = {
			log: __no_op,
			/* error: __no_op,
			warn: __no_op,
			info: __no_op,
			//table: __no_op,
			group: __no_op,
			groupEnd: __no_op,
			debug: __no_op, */
		};
	}
}
