function eye_(numRows, numColumns, batchShape, dtype) {
	  if (dtype === void 0) {
	    dtype = 'float32';
	  }

	  if (numColumns == null) {
	    numColumns = numRows;
	  }

	  var buff = buffer([numRows, numColumns], dtype);
	  var n = numRows <= numColumns ? numRows : numColumns;

	  for (var i = 0; i < n; ++i) {
	    buff.set(1, i, i);
	  }

	  var out = reshape(buff.toTensor(), [numRows, numColumns]);

	  if (batchShape == null) {
	    return out;
	  } else {
	    if (batchShape.length === 1) {
	      return tile(expandDims(out, 0), [batchShape[0], 1, 1]);
	    } else if (batchShape.length === 2) {
	      // tslint:disable-next-line:no-unnecessary-type-assertion
	      return tile(expandDims(expandDims(out, 0), 0), [batchShape[0], batchShape[1], 1, 1]);
	    } else if (batchShape.length === 3) {
	      // tslint:disable-next-line:no-unnecessary-type-assertion
	      return tile(expandDims(expandDims(expandDims(out, 0), 0), 0), [batchShape[0], batchShape[1], batchShape[2], 1, 1]);
	    } else {
	      throw new Error("eye() currently supports only 1D and 2D " + ( // tslint:disable-next-line:no-any
	      "batchShapes, but received " + batchShape.length + "D."));
	    }
	  }
	}