function initResampleCanvas(cropWidth, cropHeight) {
			resampleCanvas = document.createElement('canvas');
			resampleCanvas.width = cropWidth;
			resampleCanvas.height = cropHeight;
			resampleContext = resampleCanvas.getContext('2d');
		}