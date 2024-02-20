function applyDissolveCallback (in_msg) {
	if (in_msg  == "false") {
		csInterface.evalScript("alert('Could not apply the dissolve!)");
	}
	csInterface.closeExtension();
}