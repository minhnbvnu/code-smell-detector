function tileImpl(xBuf, reps) {
	  var newShape = new Array(xBuf.rank);

	  for (var i = 0; i < newShape.length; i++) {
	    newShape[i] = xBuf.shape[i] * reps[i];
	  }

	  var result = buffer(newShape, xBuf.dtype);

	  for (var _i = 0; _i < result.values.length; ++_i) {
	    var newLoc = result.indexToLoc(_i);
	    var originalLoc = new Array(xBuf.rank);

	    for (var j = 0; j < originalLoc.length; j++) {
	      originalLoc[j] = newLoc[j] % xBuf.shape[j];
	    }

	    var originalIndex = xBuf.locToIndex(originalLoc);
	    result.values[_i] = xBuf.values[originalIndex];
	  }

	  return result;
	}