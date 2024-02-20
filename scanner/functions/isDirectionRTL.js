function isDirectionRTL(str, strongFallback) {
	  return getDirection(str, strongFallback) === UnicodeBidiDirection.RTL;
	}