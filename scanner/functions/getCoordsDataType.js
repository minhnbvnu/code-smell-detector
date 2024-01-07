function getCoordsDataType(rank) {
	  if (rank <= 1) {
	    return 'int';
	  } else if (rank === 2) {
	    return 'ivec2';
	  } else if (rank === 3) {
	    return 'ivec3';
	  } else if (rank === 4) {
	    return 'ivec4';
	  } else if (rank === 5) {
	    return 'ivec5';
	  } else if (rank === 6) {
	    return 'ivec6';
	  } else {
	    throw Error("GPU for rank " + rank + " is not yet supported");
	  }
	}