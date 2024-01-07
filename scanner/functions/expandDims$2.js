function expandDims$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var input = inputs.input;
	  var dim = attrs.dim;
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
	  return reshape$2({
	    inputs: {
	      x: input
	    },
	    backend: backend,
	    attrs: {
	      shape: newShape
	    }
	  });
	}