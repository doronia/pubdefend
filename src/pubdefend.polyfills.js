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
