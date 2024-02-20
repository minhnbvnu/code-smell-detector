function enable_contextmenu(enabled) {
	if (!contextmenu)
		return;

	if (nir_debug)
		console.log("Setting contextmenu: " + enabled);

	chrome.contextMenus.update(contextmenu, {
		enabled: enabled
	});
}