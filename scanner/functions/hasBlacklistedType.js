function hasBlacklistedType(path, state) {
	  if (path.node.type === state.type) {
	    state.has = true;
	    path.stop();
	  }
	}