function assertShapesMatch(shapeA, shapeB, errorMessagePrefix) {
	  if (errorMessagePrefix === void 0) {
	    errorMessagePrefix = '';
	  }

	  assert(arraysEqual(shapeA, shapeB), function () {
	    return errorMessagePrefix + (" Shapes " + shapeA + " and " + shapeB + " must match");
	  });
	}