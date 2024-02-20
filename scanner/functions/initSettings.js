function initSettings() {
	$("#settings #btn-options").click(function() {
		close();
		chrome.tabs.create({
			url: "../options/options.html"
		})
	});

	$("#settings #btn-choose-credential-fields").click(function() {
		var global = chrome.extension.getBackgroundPage();
		chrome.tabs.sendMessage(global.page.currentTabId, {
			action: "choose_credential_fields"
		});
		close();
	});
}