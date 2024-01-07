function concatImpl(inputs, outShape, dtype, simplyConcat) {
	  var outVals = getArrayFromDType(dtype, sizeFromShape(outShape));

	  if (simplyConcat && dtype !== 'string') {
	    // Use built-in TypedArray.set() method for speed.
	    var offset = 0;
	    inputs.forEach(function (input) {
	      var size = sizeFromShape(input.shape);
	      outVals.set(input.vals, offset);
	      offset += size;
	    });
	  } else {
	    var colOffset = 0;
	    inputs.forEach(function (input) {
	      var decodedData = dtype === 'string' ? fromUint8ToStringArray(input.vals) : input.vals;
	      var tIdx = 0;

	      for (var row = 0; row < input.shape[0]; ++row) {
	        var resIdx = row * outShape[1] + colOffset;

	        for (var col = 0; col < input.shape[1]; ++col) {
	          outVals[resIdx + col] = decodedData[tIdx++];
	        }
	      }

	      colOffset += input.shape[1];
	    });
	  }

	  return outVals;
	}