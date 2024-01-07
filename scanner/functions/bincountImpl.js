function bincountImpl(xVals, weightsVals, weightsDtype, weightsShape, size) {
	  var weightsSize = sizeFromShape(weightsShape);
	  var outVals = makeZerosTypedArray(size, weightsDtype);

	  for (var i = 0; i < xVals.length; i++) {
	    var value = xVals[i];

	    if (value < 0) {
	      throw new Error('Input x must be non-negative!');
	    }

	    if (value >= size) {
	      continue;
	    }

	    if (weightsSize > 0) {
	      outVals[value] += weightsVals[i];
	    } else {
	      outVals[value] += 1;
	    }
	  }

	  return outVals;
	}