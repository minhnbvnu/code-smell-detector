function _close() {
	chrome.extension.sendMessage({
		action: 'remove_credentials_from_tab_information'
	});

	chrome.extension.sendMessage({
		action: 'pop_stack'
	});

	close();
}