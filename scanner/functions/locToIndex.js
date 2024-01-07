function locToIndex(locs, rank, strides) {
	  if (rank === 0) {
	    return 0;
	  } else if (rank === 1) {
	    return locs[0];
	  }

	  var index = locs[locs.length - 1];

	  for (var i = 0; i < locs.length - 1; ++i) {
	    index += strides[i] * locs[i];
	  }

	  return index;
	}