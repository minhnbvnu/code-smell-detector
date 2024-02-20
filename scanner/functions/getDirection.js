function getDirection(str, strongFallback) {
	  if (!strongFallback) {
	    strongFallback = UnicodeBidiDirection.getGlobalDir();
	  }
	  !UnicodeBidiDirection.isStrong(strongFallback) ?  true ? invariant(false, 'Fallback direction must be a strong direction') : invariant(false) : void 0;
	  return resolveBlockDir(str, strongFallback);
	}