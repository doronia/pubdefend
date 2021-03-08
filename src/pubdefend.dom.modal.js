/* https://github.com/Eschon/bokkusu */

export default function bokkusu(elem, options = {}) {
	return new Bokkusu(elem, options);
}

function Bokkusu(elem, options) {
	const mode = options.mode || "image";
	const overlay = document.createElement("div");
	const content = document.createElement("div");
	const closeButton = document.createElement("span");

	overlay.classList.add("bokkusu-overlay");
	content.classList.add("bokkusu-content");
	closeButton.classList.add("bokkusu-close-button");

	closeButton.textContent = "x";

	closeButton.addEventListener("click", this.close.bind(this));
	overlay.addEventListener("click", this.close.bind(this));

	overlay.appendChild(content);
	content.appendChild(closeButton);

	if (mode === "image") {
		const image = document.createElement("img");
		image.setAttribute("src", elem);
		content.appendChild(image);
	}
	if (mode === "iframe") {
		const iframe = document.createElement("iframe");
		iframe.src = elem;
		iframe.width = options.width;
		iframe.height = options.height;
		iframe.setAttribute("frameBorder", options.frameBorder || "0");
		content.appendChild(iframe);
	}
	if (mode === "dom") {
		content.appendChild(elem);
	}

	if (options.width && mode !== "iframe") {
		content.style.width = `${options.width}px`;
	}

	if (options.next) {
		const nextButton = document.createElement("span");
		nextButton.textContent = "❯";
		nextButton.classList.add("bokkusu-next-button");
		nextButton.addEventListener("click", () => {
			bokkusu(options.next.url, options.next.options);
		});
		content.appendChild(nextButton);
	}

	if (options.prev) {
		const prevButton = document.createElement("span");
		prevButton.textContent = "❮";
		prevButton.classList.add("bokkusu-prev-button");
		prevButton.addEventListener("click", () => {
			bokkusu(options.prev.url, options.prev.options);
		});
		content.appendChild(prevButton);
	}

	const body = document.getElementsByTagName("body")[0];
	body.appendChild(overlay);

	this.overlay = overlay;
}

Bokkusu.prototype.close = function close(e) {
	e.stopPropagation();
	this.overlay.parentNode.removeChild(this.overlay);
};

function Gallery(array, loop) {
	for (let i = 0; i < array.length; i++) {
		if (!array[i].options) array[i].options = {};

		if (i > 0) array[i].options.prev = array[i - 1];
		else if (loop) array[i].options.prev = array[array.length - 1];

		if (i < array.length - 1) array[i].options.next = array[i + 1];
		else if (loop) array[i].options.next = array[0];
	}

	return array.map((item) => {
		return () => bokkusu(item.url, item.options);
	});
}

export { Gallery };
