function sliceArrays(arrays, start, stop) {
	  if (arrays == null) {
	    return [null];
	  } else if (Array.isArray(arrays)) {
	    return arrays.map(function (array) {
	      return sliceAlongFirstAxis(array, start, stop - start);
	    });
	  } else {
	    // Tensor.
	    return sliceAlongFirstAxis(arrays, start, stop - start);
	  }
	}