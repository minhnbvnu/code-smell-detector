function isReshapeFree(shape1, shape2) {
	  shape1 = shape1.slice(-2);
	  shape2 = shape2.slice(-2);

	  if (arraysEqual(shape1, shape2)) {
	    return true;
	  }

	  if (!shape1.length || !shape2.length) {
	    // One of the shapes is a scalar.
	    return true;
	  }

	  if (shape1[0] === 0 || shape1[1] === 0 || shape2[0] === 0 || shape2[1] === 0) {
	    return true;
	  }

	  if (shape1.length !== shape2.length) {
	    // One of the shapes is a vector.
	    var shape1Cols = shape1.slice(-1)[0];
	    var shape2Cols = shape2.slice(-1)[0];

	    if (shape1Cols === shape2Cols) {
	      return true;
	    }

	    if (isEven(shape1Cols) && isEven(shape2Cols) && (shape1[0] === 1 || shape2[0] === 1)) {
	      return true;
	    }
	  }

	  return shape1[1] === shape2[1] && isEven(shape1[0]) && isEven(shape2[0]);
	}