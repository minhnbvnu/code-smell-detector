function unsortedSegmentSum$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x,
	      segmentIds = inputs.segmentIds;
	  var numSegments = attrs.numSegments;
	  assertNotComplex(x, 'unsortedSegmentSum');
	  var xRank = x.shape.length;
	  var segmentIdsRank = segmentIds.shape.length;
	  var res = [];
	  var intermediates = []; // Reshape the segment id's so that they can be broadcast with
	  // x. The new shape should be [segmentIds.shape, 1, ..., 1]

	  var numIters = xRank - segmentIdsRank;
	  var $segmentIds = segmentIds;

	  for (var i = 0; i < numIters; ++i) {
	    var expanded = expandDims$2({
	      inputs: {
	        input: $segmentIds
	      },
	      backend: backend,
	      attrs: {
	        dim: i + 1
	      }
	    });
	    $segmentIds = expanded;
	    intermediates.push(expanded);
	  }

	  for (var _i = 0; _i < numSegments; ++_i) {
	    var scalarValue = createScalarValue(_i, 'int32');
	    var segmentId = backend.makeTensorInfo([], 'int32', scalarValue);
	    var mask = equal$1({
	      inputs: {
	        a: segmentId,
	        b: $segmentIds
	      },
	      backend: backend
	    });
	    var maskCasted = cast$2({
	      inputs: {
	        x: mask
	      },
	      backend: backend,
	      attrs: {
	        dtype: 'float32'
	      }
	    });
	    var mul = multiply$2({
	      inputs: {
	        a: maskCasted,
	        b: x
	      },
	      backend: backend
	    });
	    var sumTensorInfo = sum$3({
	      inputs: {
	        x: mul
	      },
	      backend: backend,
	      attrs: {
	        axis: 0,
	        keepDims: false
	      }
	    });
	    res.push(sumTensorInfo);
	    intermediates.push(segmentId);
	    intermediates.push(mask);
	    intermediates.push(maskCasted);
	    intermediates.push(mul);
	    intermediates.push(sumTensorInfo);
	  }

	  var result = pack$1({
	    inputs: res,
	    backend: backend,
	    attrs: {
	      axis: 0
	    }
	  });
	  intermediates.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return result;
	}