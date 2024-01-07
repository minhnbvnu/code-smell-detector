function bincountReduceImpl(xBuf, weightsBuf, size, binaryOutput) {
	  if (binaryOutput === void 0) {
	    binaryOutput = false;
	  }

	  var numRows = xBuf.shape[0];
	  var numCols = xBuf.shape[1];
	  var outBuf = buffer([numRows, size], weightsBuf.dtype);

	  for (var i = 0; i < numRows; i++) {
	    for (var j = 0; j < numCols; j++) {
	      var value = xBuf.get(i, j);

	      if (value < 0) {
	        throw new Error('Input x must be non-negative!');
	      }

	      if (value >= size) {
	        continue;
	      }

	      if (binaryOutput) {
	        outBuf.set(1, i, value);
	      } else {
	        if (weightsBuf.size > 0) {
	          outBuf.set(outBuf.get(i, value) + weightsBuf.get(i, j), i, value);
	        } else {
	          outBuf.set(outBuf.get(i, value) + 1, i, value);
	        }
	      }
	    }
	  }

	  return outBuf;
	}