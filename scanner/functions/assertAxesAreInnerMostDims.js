function assertAxesAreInnerMostDims(msg, axes, rank) {
	  assert(axesAreInnerMostDims(axes, rank), function () {
	    return msg + " supports only inner-most axes for now. " + ("Got axes " + axes + " and rank-" + rank + " input.");
	  });
	}