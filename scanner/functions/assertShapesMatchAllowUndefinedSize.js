function assertShapesMatchAllowUndefinedSize(shapeA, shapeB, errorMessagePrefix) {
	  if (errorMessagePrefix === void 0) {
	    errorMessagePrefix = '';
	  }

	  assert(shapesEqualAllowUndefinedSize(shapeA, shapeB), function () {
	    return errorMessagePrefix + (" Shapes " + shapeA + " and " + shapeB + " must match");
	  });
	}