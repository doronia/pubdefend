import { isBot, runningOnBrowser } from "./lazyload.environment";

const defaultSettings = {
    elements_selector: ".lazy",
    container: isBot || runningOnBrowser ? document : null,
    threshold: 300,
    thresholds: null,

};

export const getExtendedSettings = (customSettings) => {
    return Object.assign({}, defaultSettings, customSettings);
};