function indexToLoc(index, rank, strides) {
	  if (rank === 0) {
	    return [];
	  } else if (rank === 1) {
	    return [index];
	  }

	  var locs = new Array(rank);

	  for (var i = 0; i < locs.length - 1; ++i) {
	    locs[i] = Math.floor(index / strides[i]);
	    index -= locs[i] * strides[i];
	  }

	  locs[locs.length - 1] = index;
	  return locs;
	}