function getPackedSamplerFromInInfo(inInfo) {
	  var shape = inInfo.shapeInfo.logicalShape;

	  switch (shape.length) {
	    case 0:
	      return getPackedSamplerScalar(inInfo);

	    case 1:
	      return getPackedSampler1D(inInfo);

	    case 2:
	      return getPackedSampler2D(inInfo);

	    case 3:
	      return getPackedSampler3D(inInfo);

	    default:
	      return getPackedSamplerND(inInfo);
	  }
	}