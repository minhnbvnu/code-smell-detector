function createDissolveFile (event) {
		var dissolveCanvas = document.createElement('canvas');
		if (gHasSelection) {
			dissolveCanvas.width = parseFloat(gPreviewInfo.selection.rect.width);
			dissolveCanvas.height = parseFloat(gPreviewInfo.selection.rect.height);
		} else {
			dissolveCanvas.width = parseFloat(gPreviewInfo.width);
			dissolveCanvas.height = parseFloat(gPreviewInfo.height);
		}
		var context = dissolveCanvas.getContext('2d');
		var imageData = context.createImageData(dissolveCanvas.width, dissolveCanvas.height);
		var dataIdx = 0;
		while (dataIdx < imageData.data.length) {
			if (doDissolvePixel()) {
				switch(gPreviewInfo.disposition) {
					case "0":
						imageData.data[dataIdx] =  255;
						imageData.data[dataIdx + 1] =  255;
						imageData.data[dataIdx + 2] =  255;
						break;
					case "1":
						imageData.data[dataIdx] =  (gPreviewInfo.isMask == '1' ? 69 : 0);
						imageData.data[dataIdx + 1] =  (gPreviewInfo.isMask == '1' ? 69 : 0);
						imageData.data[dataIdx + 2] =  (gPreviewInfo.isMask == '1' ? 69 : 255);
						break;
					case "2":
						imageData.data[dataIdx] =  (gPreviewInfo.isMask == '1' ? 129 : 255);
						imageData.data[dataIdx + 1] =  (gPreviewInfo.isMask == '1' ? 129 : 0);
						imageData.data[dataIdx + 2] =  (gPreviewInfo.isMask == '1' ? 129 : 0);
						break;
					case "3":
						imageData.data[dataIdx] =  (gPreviewInfo.isMask == '1' ? 200 : 0);
						imageData.data[dataIdx + 1] =  (gPreviewInfo.isMask == '1' ? 200 : 255);
						imageData.data[dataIdx + 2] =  (gPreviewInfo.isMask == '1' ? 200 : 0);
						break;
				}
				imageData.data[dataIdx + 3] =  255;
			}
			dataIdx = dataIdx + 4;
		}
		context.putImageData(imageData, 0, 0);
		var decodedStr = window.atob(dissolveCanvas.toDataURL("image/png",1).replace(/^.+\,/g,""));
		csInterface.evalScript("storeDissolveImage(\""+escape(decodedStr)+"\")", storeDissolveImageCallback);
	}