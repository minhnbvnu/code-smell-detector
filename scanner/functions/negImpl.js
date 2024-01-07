function negImpl(xVals, xShape, xDtype) {
	  var minusOne = createScalarValue(-1, xDtype);
	  return multiplyImpl([], xShape, minusOne, xVals, xDtype);
	}