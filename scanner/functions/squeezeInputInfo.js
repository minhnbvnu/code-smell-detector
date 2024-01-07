function squeezeInputInfo(inInfo, squeezedShape) {
	  // Deep copy.
	  var newInputInfo = JSON.parse(JSON.stringify(inInfo));
	  newInputInfo.shapeInfo.logicalShape = squeezedShape;
	  return newInputInfo;
	}