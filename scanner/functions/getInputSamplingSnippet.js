function getInputSamplingSnippet(inInfo, outShapeInfo, usesPackedTextures) {
	  if (usesPackedTextures === void 0) {
	    usesPackedTextures = false;
	  }

	  var res = '';

	  if (usesPackedTextures) {
	    res += getPackedSamplerFromInInfo(inInfo);
	  } else {
	    res += getSamplerFromInInfo(inInfo);
	  }

	  var inShape = inInfo.shapeInfo.logicalShape;
	  var outShape = outShapeInfo.logicalShape;

	  if (inShape.length <= outShape.length) {
	    if (usesPackedTextures) {
	      res += getPackedSamplerAtOutputCoords(inInfo, outShapeInfo);
	    } else {
	      res += getSamplerAtOutputCoords(inInfo, outShapeInfo);
	    }
	  }

	  return res;
	}