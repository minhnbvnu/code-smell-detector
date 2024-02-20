function update_browseraction_enabled(enabled) {
	var disabled_text = "";
	if (!enabled)
		disabled_text = " (disabled)";

	chrome.browserAction.setTitle({
		title: "Image Max URL" + disabled_text
	});

	if (enabled) {
		chrome.browserAction.setIcon({
			path: {
				"40": "../resources/logo_40.png",
				"48": "../resources/logo_48.png",
				"96": "../resources/logo_96.png"
			}
		});
	} else {
		chrome.browserAction.setIcon({
			path: {
				"40": "../resources/disabled_40.png",
				"48": "../resources/disabled_48.png",
				"96": "../resources/disabled_96.png"
			}
		});
	}
}