export const runningOnBrowser = typeof window !== "undefined";

//export const isBot = runningOnBrowser || (typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

export const isBot = (runningOnBrowser && !("onscroll" in window)) || (typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

export const supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;

export const supportsClassList = runningOnBrowser && "classList" in document.createElement("p");

export const supportsCreateImageBitmap = runningOnBrowser && "createImageBitmap" in window;

export const supportsFetch = runningOnBrowser && "fetch" in window;

export const supportsPromise = typeof Promise === "function";

export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const detectBrowser = function() {
    if (runningOnBrowser) {
        var agent = window.navigator.userAgent.toLowerCase();

        switch (true) {
            case agent.indexOf("edge") > -1:
                return "Edge (EdgeHtml)";
            case agent.indexOf("edg") > -1:
                return "Edge Chromium";
            case agent.indexOf("opr") > -1 && !!window.opr:
                return "opera";
            case agent.indexOf("chrome") > -1 && !!window.chrome:
                return "chrome";
            case agent.indexOf("trident") > -1:
                return "IE";
            case agent.indexOf("firefox") > -1:
                return "Firefox";
            case agent.indexOf("safari") > -1:
                return "Safari";
            case agent.indexOf("Opera") || agent.indexOf("OPR") > -1:
                return "Opera";
            default:
                return "other";
        }
    }
}