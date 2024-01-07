function unstack_(x, axis) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  var $x = convertToTensor(x, 'x', 'unstack', 'string_or_numeric');
	  assert(axis >= -$x.shape.length && axis < $x.shape.length, function () {
	    return "Axis = " + axis + " is not in [-" + $x.shape.length + ", " + $x.shape.length + ")";
	  });
	  var inputs = {
	    value: $x
	  };
	  var attrs = {
	    axis: axis
	  };
	  return ENGINE.runKernel(Unpack, inputs, attrs);
	}