function maxImpl(aVals, reduceSize, outShape, dtype) {
	  var vals = getTypedArrayFromDType(dtype, sizeFromShape(outShape));

	  for (var i = 0; i < vals.length; ++i) {
	    var offset = i * reduceSize;
	    var max = aVals[offset];

	    for (var j = 0; j < reduceSize; ++j) {
	      var value = aVals[offset + j];

	      if (value > max) {
	        max = value;
	      }
	    }

	    vals[i] = max;
	  }

	  return vals;
	}