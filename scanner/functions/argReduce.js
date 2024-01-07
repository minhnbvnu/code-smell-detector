function argReduce(backend, x, reduceType, bestIndicesA) {
	  if (bestIndicesA === void 0) {
	    bestIndicesA = null;
	  }

	  var batchSize = x.shape[0];
	  var inSize = x.shape[1];

	  if (bestIndicesA != null) {
	    batchSize = bestIndicesA.shape[0];
	    inSize = bestIndicesA.shape[1];
	  }

	  var windowSize = computeOptimalWindowSize(inSize);
	  var reduceInfo = {
	    windowSize: windowSize,
	    inSize: inSize,
	    batchSize: batchSize,
	    outSize: Math.ceil(inSize / windowSize)
	  };
	  var program = new ArgMinMaxProgram(reduceInfo, reduceType, bestIndicesA == null);
	  var inputs = [x];

	  if (bestIndicesA != null) {
	    inputs.push(bestIndicesA);
	  }

	  var output = backend.runWebGLProgram(program, inputs, 'int32'); // No need to run another GPGPU program.

	  if (output.shape[1] === 1) {
	    return output;
	  }

	  var result = argReduce(backend, x, reduceType, output);
	  backend.disposeIntermediateTensorInfo(output);
	  return result;
	}