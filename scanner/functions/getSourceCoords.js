function getSourceCoords(rank, dims) {
	  if (rank === 1) {
	    return 'rc';
	  }

	  var coords = '';

	  for (var i = 0; i < rank; i++) {
	    coords += dims[i];

	    if (i < rank - 1) {
	      coords += ',';
	    }
	  }

	  return coords;
	}