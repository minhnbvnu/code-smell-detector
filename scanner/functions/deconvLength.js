function deconvLength(dimSize, strideSize, kernelSize, padding) {
	  if (dimSize == null) {
	    return null;
	  }

	  if (padding === 'valid') {
	    dimSize = dimSize * strideSize + max$5([kernelSize - strideSize, 0]);
	  } else if (padding === 'same') {
	    dimSize = dimSize * strideSize;
	  } else {
	    throw new ValueError("Unsupport padding mode: " + padding + ".");
	  }

	  return dimSize;
	}