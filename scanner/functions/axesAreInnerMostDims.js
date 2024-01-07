function axesAreInnerMostDims(axes, rank) {
	  for (var i = 0; i < axes.length; ++i) {
	    if (axes[axes.length - i - 1] !== rank - 1 - i) {
	      return false;
	    }
	  }

	  return true;
	}