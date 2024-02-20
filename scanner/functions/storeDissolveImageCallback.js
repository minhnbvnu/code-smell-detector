function storeDissolveImageCallback (in_msg) {
	if (in_msg  == "true") {
		csInterface.evalScript("applyDissolve("+(gPreviewInfo.isMask == '1')+")",applyDissolveCallback);
	} else {
		csInterface.evalScript("alert('Could not create the dissolve file!)");
		csInterface.closeExtension();
	}
}