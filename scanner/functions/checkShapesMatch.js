function checkShapesMatch(x, y) {
	  if (x.shape.toString() !== y.shape.toString()) {
	    throw new Error('Shape mismatch: ' + JSON.stringify(x.shape) + ' vs. ' + JSON.stringify(y.shape));
	  }
	}