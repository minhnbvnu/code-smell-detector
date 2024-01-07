function segOpComputeOptimalWindowSize(inSize, numSegments) {
	  var done = false;
	  var res;

	  if (inSize <= PARALLELIZE_THRESHOLD) {
	    res = inSize;
	    done = true;
	  } else {
	    res = nearestDivisor(inSize, Math.floor(Math.sqrt(inSize)));
	  }

	  while (!done) {
	    if (res > numSegments || res === inSize) {
	      done = true;
	    } else {
	      res = nearestDivisor(inSize, res + 1);
	    }
	  }

	  return res;
	}