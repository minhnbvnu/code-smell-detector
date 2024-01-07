function getCoords(rank) {
	  if (rank === 1) {
	    return 'sourceLoc';
	  } else if (rank <= 6) {
	    return coords.slice(0, rank).map(function (x) {
	      return 'sourceLoc.' + x;
	    }).join(',');
	  } else {
	    throw Error("Slicing for rank " + rank + " is not yet supported");
	  }
	}