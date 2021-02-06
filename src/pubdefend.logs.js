var LOG_ELEMENT = "log";

export function appendLog(text) {
	if (!text) {
		return;
	}

	var node = document.createElement("li");
	node.className = "text-small font-normal";
	node.style.cssText = "color: #99b8fd";
	var textnode = document.createTextNode(text);
	node.appendChild(textnode);
	document.getElementById(LOG_ELEMENT).appendChild(node);
}
