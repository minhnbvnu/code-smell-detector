function numBytesForInternalFormat(gl, internalFormat) {
	  // tslint:disable-next-line:no-any
	  var glany = gl;

	  if (internalFormat === glany.R32F) {
	    return 4;
	  } else if (internalFormat === glany.R16F) {
	    return 2;
	  } else if (internalFormat === glany.RGBA32F) {
	    return 16;
	  } else if (internalFormat === gl.RGBA) {
	    return 16;
	  } else if (internalFormat === glany.RGBA16F) {
	    return 8;
	  }

	  throw new Error("Unknown internal format " + internalFormat);
	}