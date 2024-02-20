function tabremoved(tabid) {
	if (nir_debug)
		console.log("Removed tab: ", tabid);

	delete tabs_ready[tabid];

	if (tabid === currenttab)
		enable_contextmenu(false);

	if (tabid in loading_urls) {
		delete loading_urls[tabid];
	}

	if (tabid in loading_redirects) {
		delete loading_redirects[tabid];
	}

	if (tabid in override_headers) {
		delete override_headers[tabid];
	}

	if (tabid in override_download) {
		delete override_download[tabid];
	}

	if (tabid in redirects) {
		delete redirects[tabid];
	}

	tabclear(tabid);
}