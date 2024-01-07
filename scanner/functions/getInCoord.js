function getInCoord(i, channels1) {
	    if (axis.indexOf(i) !== -1 && xShape[i] !== 1) {
	      return xShape[i] + " - " + channels1[i] + " - 1";
	    } else {
	      return "" + channels1[i];
	    }
	  }