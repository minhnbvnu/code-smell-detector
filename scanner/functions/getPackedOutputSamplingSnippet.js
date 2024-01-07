function getPackedOutputSamplingSnippet(outShape, outTexShape) {
	  switch (outShape.length) {
	    case 0:
	      return getOutputScalarCoords();

	    case 1:
	      return getOutputPacked1DCoords(outShape, outTexShape);

	    case 2:
	      return getOutputPacked2DCoords(outShape, outTexShape);

	    case 3:
	      return getOutputPacked3DCoords(outShape, outTexShape);

	    default:
	      return getOutputPackedNDCoords(outShape, outTexShape);
	  }
	}