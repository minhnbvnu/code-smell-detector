function getPreviewInfoCallback (event) {
		if (event) {
			gPreviewInfo = event.data;
			gHasSelection = (gPreviewInfo.selection.url.length > 0);
			dispatchEvent("com.adobe.event.unloadDissolveExtension");
			createDissolveFile();
		} else {
			csInterface.closeExtension();
		}
	}