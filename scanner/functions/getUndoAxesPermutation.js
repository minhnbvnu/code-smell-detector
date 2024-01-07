function getUndoAxesPermutation(axes) {
	  return axes.map(function (axis, i) {
	    return [i, axis];
	  }).sort(function (a, b) {
	    return a[1] - b[1];
	  }).map(function (x) {
	    return x[0];
	  });
	}