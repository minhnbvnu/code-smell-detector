function tabready(tabid) {
	if (nir_debug)
		console.log("Tab ready: ", tabid);

	tabs_ready[tabid] = true;

	if (tabid === currenttab)
		enable_contextmenu(true);

	if (tabid in override_download) {
		chrome.tabs.remove(tabid);
	}
}