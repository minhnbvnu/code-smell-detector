function getOutputSamplingSnippet(outShape, outTexShape) {
	  switch (outShape.length) {
	    case 0:
	      return getOutputScalarCoords();

	    case 1:
	      return getOutput1DCoords(outShape, outTexShape);

	    case 2:
	      return getOutput2DCoords(outShape, outTexShape);

	    case 3:
	      return getOutput3DCoords(outShape, outTexShape);

	    case 4:
	      return getOutput4DCoords(outShape, outTexShape);

	    case 5:
	      return getOutput5DCoords(outShape, outTexShape);

	    case 6:
	      return getOutput6DCoords(outShape, outTexShape);

	    default:
	      throw new Error(outShape.length + "-D output sampling is not yet supported");
	  }
	}