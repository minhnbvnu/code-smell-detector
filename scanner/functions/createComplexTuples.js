function createComplexTuples(vals) {
	  var complexTuples = [];

	  for (var i = 0; i < vals.length; i += 2) {
	    complexTuples.push([vals[i], vals[i + 1]]);
	  }

	  return complexTuples;
	}