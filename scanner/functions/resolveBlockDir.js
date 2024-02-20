function resolveBlockDir(str, fallback) {
	  fallback = fallback || UnicodeBidiDirection.NEUTRAL;
	  if (!str.length) {
	    return fallback;
	  }
	  var blockDir = firstStrongCharDir(str);
	  return blockDir === UnicodeBidiDirection.NEUTRAL ? fallback : blockDir;
	}