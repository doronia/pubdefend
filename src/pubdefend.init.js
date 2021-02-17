export var pd = window.pubDefend || window.pubdefend || {};

//pd.debug = true;
pd.state = {};
pd.store = {};
pd.eventQueue = [];
pd.slotsQueue = [];
pd.domain = ENV ? ENV : undefined;
