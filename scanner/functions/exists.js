function exists(filename) {
	  var cached = existsCache[filename];
	  if (cached == null) {
	    return existsCache[filename] = _fs2.default.existsSync(filename);
	  } else {
	    return cached;
	  }
	}