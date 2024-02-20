function isDirectionLTR(str, strongFallback) {
	  return getDirection(str, strongFallback) === UnicodeBidiDirection.LTR;
	}