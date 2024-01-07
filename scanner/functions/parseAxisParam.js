function parseAxisParam(axis, shape) {
	  var rank = shape.length; // Normalize input

	  axis = axis == null ? shape.map(function (s, i) {
	    return i;
	  }) : [].concat(axis); // Check for valid range

	  assert(axis.every(function (ax) {
	    return ax >= -rank && ax < rank;
	  }), function () {
	    return "All values in axis param must be in range [-" + rank + ", " + rank + ") but " + ("got axis " + axis);
	  }); // Check for only integers

	  assert(axis.every(function (ax) {
	    return isInt(ax);
	  }), function () {
	    return "All values in axis param must be integers but " + ("got axis " + axis);
	  }); // Handle negative axis.

	  return axis.map(function (a) {
	    return a < 0 ? rank + a : a;
	  });
	}