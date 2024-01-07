function argReducePacked(backend, x, reduceType, bestIndicesA) {
	  if (bestIndicesA === void 0) {
	    bestIndicesA = null;
	  }

	  var inShape = bestIndicesA != null ? bestIndicesA.shape : x.shape;
	  var inSize = inShape[inShape.length - 1];
	  var windowSize = computeOptimalWindowSize(inSize);
	  var program = new ArgMinMaxPackedProgram(inShape, windowSize, reduceType, bestIndicesA == null);
	  var inputs = bestIndicesA == null ? [x] : [x, bestIndicesA];
	  var output = backend.runWebGLProgram(program, inputs, 'int32');

	  if (output.shape.length === x.shape.length) {
	    var result = argReducePacked(backend, x, reduceType, output);
	    backend.disposeIntermediateTensorInfo(output);
	    return result;
	  }

	  return output;
	}