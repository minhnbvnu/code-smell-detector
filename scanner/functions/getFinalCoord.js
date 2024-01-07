function getFinalCoord(rank, name) {
	  if (rank === 1) {
	    return "" + name;
	  } else if (rank === 2) {
	    return name + ".y";
	  } else if (rank === 3) {
	    return name + ".z";
	  } else if (rank === 4) {
	    return name + ".w";
	  } else {
	    throw Error("Cumulative sum for rank " + rank + " is not yet supported");
	  }
	}