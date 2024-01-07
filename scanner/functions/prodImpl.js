function prodImpl(xShape, xDtype, xVals, reductionAxes) {
	  var _backend_util$compute = computeOutAndReduceShapes(xShape, reductionAxes),
	      outShape = _backend_util$compute[0],
	      reduceShape = _backend_util$compute[1];

	  var outDtype = upcastType(xDtype, 'int32');
	  var outVals = makeZerosTypedArray(sizeFromShape(outShape), outDtype);
	  var reduceSize = sizeFromShape(reduceShape);

	  for (var i = 0; i < outVals.length; ++i) {
	    var offset = i * reduceSize;
	    var _prod = 1;

	    for (var j = 0; j < reduceSize; ++j) {
	      _prod *= xVals[offset + j];
	    }

	    outVals[i] = _prod;
	  }

	  return {
	    outVals: outVals,
	    outShape: outShape,
	    outDtype: outDtype
	  };
	}