function concatAlongFirstAxis(a, b) {
	  switch (a.rank) {
	    case 1:
	      return concat1d([a, b]);

	    case 2:
	      return concat2d([a, b], 0);

	    case 3:
	      return concat3d([a, b], 0);

	    case 4:
	      return concat4d([a, b], 0);

	    default:
	      throw new ValueError("concatAlongFirstAxis() received an unsupported " + ("tensor rank: " + a.rank));
	  }
	}