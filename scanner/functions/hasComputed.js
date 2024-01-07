function hasComputed(mutatorMap) {
	  for (var key in mutatorMap) {
	    if (mutatorMap[key]._computed) {
	      return true;
	    }
	  }
	  return false;
	}