function drawPreviewCallback(in_resultStr) {
		if (in_resultStr !== 'false') {
			eval("gPreviewInfo = " + in_resultStr)
			gHasSelection = (gPreviewInfo.selection.url.length > 0);
			loadPreview();
			if (gHasSelection) {
				loadSelection();
			}
		}
		document.onkeydown = onKeyDownCallbak;
	}