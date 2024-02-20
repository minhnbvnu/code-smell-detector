function contextmenu_imu(data, tab) {
	debug("contextMenu", data);
	chrome.tabs.sendMessage(tab.id, {
		"type": "context_imu"
	});
}