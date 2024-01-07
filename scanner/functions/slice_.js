function slice_(x, begin, size) {
	  var $x = convertToTensor(x, 'x', 'slice', 'string_or_numeric');

	  if ($x.rank === 0) {
	    throw new Error('Slicing scalar is not possible');
	  }

	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    begin: begin,
	    size: size
	  };
	  return ENGINE.runKernel(Slice, inputs, attrs);
	}