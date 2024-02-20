function tabclear(tabid) {
	if (nir_debug)
		console.log("Clearing tab: ", tabid);

	if (tabid in menucommands) {
		delete menucommands[tabid];
	}
}