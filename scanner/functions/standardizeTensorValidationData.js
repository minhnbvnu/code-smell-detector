function standardizeTensorValidationData(data) {
	  if (data.length === 3) {
	    throw new NotImplementedError('Validation with sample weights is not implemented yet.');
	  }

	  return {
	    xs: data[0],
	    ys: data[1]
	  };
	}