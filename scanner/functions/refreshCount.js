function refreshCount() {
	txt = tab_listeners[selectedId] ? tab_listeners[selectedId].length : 0;
	chrome.tabs.get(selectedId, function() {
		if (!chrome.runtime.lastError) {
			chrome.browserAction.setBadgeText({"text": ''+txt, tabId: selectedId});
			if(txt > 0) {
				chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255]});
			} else {
				chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 0] });
			}
		}
	});
}