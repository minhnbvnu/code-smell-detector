function getImageCenter(center, imageHeight, imageWidth) {
	  var centerX = imageWidth * (typeof center === 'number' ? center : center[0]);
	  var centerY = imageHeight * (typeof center === 'number' ? center : center[1]);
	  return [centerX, centerY];
	}