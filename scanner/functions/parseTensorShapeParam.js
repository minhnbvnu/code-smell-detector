function parseTensorShapeParam(shape) {
	  if (shape.unknownRank) {
	    return undefined;
	  }

	  if (shape.dim != null) {
	    return shape.dim.map(function (dim) {
	      return typeof dim.size === 'number' ? dim.size : parseInt(dim.size, 10);
	    });
	  }

	  return [];
	}