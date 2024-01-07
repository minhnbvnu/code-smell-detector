function batchGetValue(xs) {
	  return xs.map(function (x) {
	    return x.read();
	  });
	}