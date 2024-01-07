function maskToAxes(mask) {
	  var axes = [];
	  var axis = 0;

	  while (mask > 0) {
	    if (mask & 1) {
	      axes.push(axis);
	    }

	    mask /= 2;
	    axis++;
	  }

	  return axes;
	}