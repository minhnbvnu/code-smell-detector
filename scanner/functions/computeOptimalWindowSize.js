function computeOptimalWindowSize(inSize) {
	  if (inSize <= PARALLELIZE_THRESHOLD) {
	    return inSize;
	  }

	  return nearestDivisor(inSize, Math.floor(Math.sqrt(inSize)));
	}