function getCoords$1(rank, name) {
	  if (rank === 1) {
	    return "" + name;
	  } else if (rank === 2) {
	    return name + ".x, " + name + ".y";
	  } else if (rank === 3) {
	    return name + ".x, " + name + ".y, " + name + ".z";
	  } else if (rank === 4) {
	    return name + ".x, " + name + ".y, " + name + ".z, " + name + ".w";
	  } else {
	    throw Error("Cumulative sum for rank " + rank + " is not yet supported");
	  }
	}