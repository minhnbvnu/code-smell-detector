function cumsum$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis,
	      exclusive = attrs.exclusive,
	      reverse = attrs.reverse;
	  var xRank = x.shape.length;
	  var permutation = getAxesPermutation([axis], xRank);
	  var permutedX = x;

	  if (permutation != null) {
	    permutedX = transpose$2({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        perm: permutation
	      }
	    });
	  }

	  var permutedAxis = getInnerMostAxes(1, xRank)[0];

	  if (permutedAxis !== xRank - 1) {
	    throw new Error("WebGL cumsum shader expects an inner-most axis=" + (x.shape.length - 1) + " " + ("but got axis=" + axis));
	  }

	  var size = x.shape[permutedAxis];
	  var result = identity$2({
	    inputs: {
	      x: permutedX
	    },
	    backend: backend
	  }); // Use cumsum parallel algorithm, ref:
	  // https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-39-parallel-prefix-sum-scan-cuda

	  for (var i = 0; i <= Math.ceil(Math.log2(size)) - 1; i++) {
	    var program = new CumSumProgram(permutedX.shape, false, reverse);
	    var customSetup = program.getCustomSetupFunc(i);
	    var prevResult = result;
	    result = backend.runWebGLProgram(program, [result], result.dtype, customSetup);
	    backend.disposeIntermediateTensorInfo(prevResult);
	  } // For exclusive cumsum, shift the end result in the direction of sum
	  // and add 0 to the front index.


	  if (exclusive) {
	    var _program = new CumSumProgram(permutedX.shape, exclusive, reverse);

	    var _prevResult = result;
	    result = backend.runWebGLProgram(_program, [result], result.dtype);
	    backend.disposeIntermediateTensorInfo(_prevResult);
	  }

	  if (permutation != null) {
	    var reversePermutation = getUndoAxesPermutation(permutation);
	    var reverseTransposedResult = transpose$2({
	      inputs: {
	        x: result
	      },
	      backend: backend,
	      attrs: {
	        perm: reversePermutation
	      }
	    });
	    backend.disposeIntermediateTensorInfo(result);
	    backend.disposeIntermediateTensorInfo(permutedX);
	    return reverseTransposedResult;
	  }

	  return result;
	}