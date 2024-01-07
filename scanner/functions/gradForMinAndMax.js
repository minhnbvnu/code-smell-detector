function gradForMinAndMax(dy, y, xOrig, origAxes) {
	  if (y.rank < xOrig.rank) {
	    y = reshape(y, expandShapeToKeepDim(y.shape, origAxes));
	  }

	  if (dy.rank < xOrig.rank) {
	    dy = reshape(dy, expandShapeToKeepDim(dy.shape, origAxes));
	  }

	  return {
	    x: function x() {
	      var dx = mul(dy, cast(equal(xOrig, y), dy.dtype));
	      return dx;
	    }
	  };
	}