function unsortedSegmentSum$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      segmentIds = inputs.segmentIds;
	  var numSegments = attrs.numSegments;
	  var xRank = x.shape.length;
	  var toDispose = [];
	  var axis = 0;
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
	    toDispose.push(permutedX);
	    axis = getInnerMostAxes(1, xRank)[0];
	  }

	  var outShape = computeOutShape$2(permutedX.shape, axis, numSegments);
	  var inSize = sizeFromShape([permutedX.shape[axis]]);
	  var a2D = reshape$3({
	    inputs: {
	      x: permutedX
	    },
	    backend: backend,
	    attrs: {
	      shape: [-1, inSize]
	    }
	  });
	  toDispose.push(a2D);
	  var outputDType = sumOutType(x.dtype);

	  var segOpCompute = function segOpCompute(x, segOpType, segmentIds, dtype, numSegments) {
	    var batchSize = x.shape[0];
	    var inSize = x.shape[1];
	    var windowSize = segOpComputeOptimalWindowSize(inSize, numSegments);
	    var segOpInfo = {
	      windowSize: windowSize,
	      inSize: inSize,
	      batchSize: batchSize,
	      numSegments: numSegments
	    };
	    var program = new SegmentOpProgram(segOpInfo, segOpType);
	    var output = backend.compileAndRun(program, [x, segmentIds], dtype);
	    toDispose.push(output); // No need to run another GPGPU program.

	    if (output.shape[1] === numSegments) {
	      return output;
	    }

	    var rangeInfo = range$3({
	      backend: backend,
	      attrs: {
	        start: 0,
	        stop: numSegments,
	        step: 1,
	        dtype: 'float32'
	      }
	    });
	    var tileInfo = tile$3({
	      inputs: {
	        x: rangeInfo
	      },
	      backend: backend,
	      attrs: {
	        reps: [inSize / windowSize]
	      }
	    });
	    toDispose.push(rangeInfo);
	    toDispose.push(tileInfo);
	    var result = segOpCompute(output, segOpType, tileInfo, dtype, numSegments);
	    return result;
	  };

	  var segOpResult = segOpCompute(a2D, 'unsortedSegmentSum', segmentIds, outputDType, numSegments);
	  var reshaped = reshape$3({
	    inputs: {
	      x: segOpResult
	    },
	    backend: backend,
	    attrs: {
	      shape: outShape
	    }
	  });
	  var result = reshaped;

	  if (permutation != null) {
	    toDispose.push(reshaped);
	    var perm = getUndoAxesPermutation(permutation);
	    result = transpose$2({
	      inputs: {
	        x: result
	      },
	      backend: backend,
	      attrs: {
	        perm: perm
	      }
	    });
	  }

	  toDispose.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return result;
	}