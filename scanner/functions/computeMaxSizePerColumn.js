function computeMaxSizePerColumn(vals, shape, dtype, strides) {
	  var n = sizeFromShape(shape);
	  var numCols = strides[strides.length - 1];
	  var padPerCol = new Array(numCols).fill(0);
	  var rank = shape.length;
	  var valuesOrTuples = dtype === 'complex64' ? createComplexTuples(vals) : vals;

	  if (rank > 1) {
	    for (var row = 0; row < n / numCols; row++) {
	      var offset = row * numCols;

	      for (var j = 0; j < numCols; j++) {
	        padPerCol[j] = Math.max(padPerCol[j], valToString(valuesOrTuples[offset + j], 0, dtype).length);
	      }
	    }
	  }

	  return padPerCol;
	}