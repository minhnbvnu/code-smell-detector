function getInnerMostAxes(numAxes, rank) {
	  var res = [];

	  for (var i = rank - numAxes; i < rank; ++i) {
	    res.push(i);
	  }

	  return res;
	}