function arrayConcat(arrays) {
	  var result = [];

	  for (var i = 0; i < arrays.length; ++i) {
	    for (var j = 0; j < arrays[i].length; ++j) {
	      result.push(arrays[i][j]);
	    }
	  }

	  return result;
	}