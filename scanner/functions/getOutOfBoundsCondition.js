function getOutOfBoundsCondition(rank, shape, dims) {
	  if (rank === 1) {
	    return "rc > " + shape[0];
	  }

	  var cond = '';

	  for (var i = rank - 2; i < rank; i++) {
	    cond += dims[i] + " >= " + shape[i];

	    if (i < rank - 1) {
	      cond += '||';
	    }
	  }

	  return cond;
	}