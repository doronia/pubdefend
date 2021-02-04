/**
 * Object.entries
 */
function entriesPolyFill(obj) {
	return Object.keys(obj).reduce(function (arr, key) {
		arr.push([key, obj[key]]);
		return arr;
	}, []);
}
export var entries = Object.entries ? Object.entries : entriesPolyFill;

export var isArray = function (obj) {
	if (!Array.isArray) {
		Array.isArray = function (arg) {
			return Object.prototype.toString.call(arg) === "[object Array]";
		};
	} else {
		return Array.isArray;
	}
};
