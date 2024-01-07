function expandDims$3(args) {
	  var inputs = args.inputs,
	      attrs = args.attrs,
	      backend = args.backend;
	  var dim = attrs.dim;
	  var input = inputs.input;
	  var inputRank = input.shape.length;
	  var newShape = input.shape.slice();
	  var $dim = dim;

	  if (dim < 0) {
	    // Negative value is counted from the tail of rank.
	    assert(-(inputRank + 1) <= dim, function () {
	      return "Axis must be in the interval [" + -(inputRank + 1) + ", " + inputRank + "]";
	    });
	    $dim = inputRank + dim + 1;
	  }

	  newShape.splice($dim, 0, 1);
	  return reshape$3({
	    inputs: {
	      x: input
	    },
	    backend: backend,
	    attrs: {
	      shape: newShape
	    }
	  });
	}