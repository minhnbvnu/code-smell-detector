function cumsum_(x, axis, exclusive, reverse) {
	  if (axis === void 0) {
	    axis = 0;
	  }

	  if (exclusive === void 0) {
	    exclusive = false;
	  }

	  if (reverse === void 0) {
	    reverse = false;
	  }

	  var $x = convertToTensor(x, 'x', 'cumsum');
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    axis: axis,
	    exclusive: exclusive,
	    reverse: reverse
	  };
	  return ENGINE.runKernel(Cumsum, inputs, attrs);
	}