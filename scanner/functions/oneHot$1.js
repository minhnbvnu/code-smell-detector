function oneHot$1(indices, numClasses) {
	  return tidy(function () {
	    if (indices.rank !== 1) {
	      throw new Error('Only 1D one-hot tensors are supported in the ' + 'deeplearn backend, at present.');
	    }

	    indices = indices.toInt();
	    return oneHot(indices, numClasses).toFloat();
	  });
	}