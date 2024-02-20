function loadSelection() {
		var offscreenCanvas = document.createElement('canvas');
		offscreenCanvas.id = "cnvsSelection";
		gFittedSelectionRect.width = Math.floor(gPreviewInfo.selection.rect.width * gWidthRatio);
		gFittedSelectionRect.height = Math.floor(gPreviewInfo.selection.rect.height * gWidthRatio);
		gFittedSelectionRect.x = Math.floor(gPreviewInfo.selection.rect.x * gWidthRatio) + gFittedPreviewRect.x;
		gFittedSelectionRect.y = Math.floor(gPreviewInfo.selection.rect.y * gWidthRatio) + gFittedPreviewRect.y;
		offscreenCanvas.width = gFittedSelectionRect.width;
		offscreenCanvas.height = gFittedSelectionRect.height;
		gSelectionContext = offscreenCanvas.getContext('2d');
		gImageSelectionData = new Image();
		gImageSelectionData.onload = function () {
			gSelectionContext.drawImage(gImageSelectionData, 0, 0, gFittedSelectionRect.width, gFittedSelectionRect.height);
			updatePreview();
		};
		gImageSelectionData.src = gPreviewInfo.selection.url;
	}