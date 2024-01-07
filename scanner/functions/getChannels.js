function getChannels(name, rank) {
	  if (rank === 1) {
	    return [name];
	  }

	  return getVecChannels(name, rank);
	}