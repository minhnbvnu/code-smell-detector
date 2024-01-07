function getSamplerFromInInfo(inInfo) {
	  var shape = inInfo.shapeInfo.logicalShape;

	  switch (shape.length) {
	    case 0:
	      return getSamplerScalar(inInfo);

	    case 1:
	      return getSampler1D(inInfo);

	    case 2:
	      return getSampler2D(inInfo);

	    case 3:
	      return getSampler3D(inInfo);

	    case 4:
	      return getSampler4D(inInfo);

	    case 5:
	      return getSampler5D(inInfo);

	    case 6:
	      return getSampler6D(inInfo);

	    default:
	      throw new Error(shape.length + "-D input sampling" + " is not yet supported");
	  }
	}