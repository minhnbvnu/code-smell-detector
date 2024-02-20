function loadPreview() {
		var cnvsHeight = $('#cnvsPreview').height();
		var cnvsWidth = $('#cnvsPreview').width();
		var previewSize = rescale({
			width: cnvsWidth,
			height: cnvsHeight
		}, {
			width: gPreviewInfo.width,
			height: gPreviewInfo.height
		});
		gFittedPreviewRect.width = previewSize.width;
		gFittedPreviewRect.height = previewSize.height;
		gWidthRatio = gFittedPreviewRect.width / gPreviewInfo.width;
		gFittedPreviewRect.x = Math.round(($('#cnvsPreview').width() - gFittedPreviewRect.width) / 2);
		gFittedPreviewRect.y = Math.round(($('#cnvsPreview').height() - gFittedPreviewRect.height) / 2);
		gImagePreviewData = new Image();
		var context = $('#cnvsPreview')[0].getContext("2d");
		gImagePreviewData.onload = function () {
			context.drawImage(gImagePreviewData, gFittedPreviewRect.x, gFittedPreviewRect.y, gFittedPreviewRect.width, gFittedPreviewRect.height);
			updatePreview();
		};
		gImagePreviewData.src = gPreviewInfo.url;
	}