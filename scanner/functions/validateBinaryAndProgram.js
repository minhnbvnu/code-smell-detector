function validateBinaryAndProgram(shapeInfos, inputs) {
	  if (shapeInfos.length !== inputs.length) {
	    throw Error("Binary was compiled with " + shapeInfos.length + " inputs, but " + ("was executed with " + inputs.length + " inputs"));
	  }

	  shapeInfos.forEach(function (s, i) {
	    var shapeA = s.logicalShape;
	    var input = inputs[i];
	    var shapeB = input.shape;

	    if (!arraysEqual(shapeA, shapeB)) {
	      throw Error("Binary was compiled with different shapes than " + ("the current args. Shapes " + shapeA + " and " + shapeB + " must match"));
	    } // The input is uploaded as uniform.


	    if (s.isUniform && input.isUniform) {
	      return;
	    }

	    var texShapeA = s.texShape;
	    var texShapeB = input.isUniform ? null : input.texData.texShape;

	    if (!arraysEqual(texShapeA, texShapeB)) {
	      throw Error("Binary was compiled with different texture shapes than the" + (" current args. Shape " + texShapeA + " and " + texShapeB + " must match"));
	    }
	  });
	}