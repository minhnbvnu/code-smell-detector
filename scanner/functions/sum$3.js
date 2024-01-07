function sum$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis,
	      keepDims = attrs.keepDims;
	  assertNotComplex(x, 'sum');
	  var $x;

	  if (x.dtype === 'bool') {
	    $x = cast$2({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        dtype: 'int32'
	      }
	    });
	  } else {
	    $x = identity$1({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });
	  }

	  var xRank = $x.shape.length;
	  var axes = parseAxisParam(axis, $x.shape);
	  var permutation = getAxesPermutation(axes, xRank);
	  var reductionAxes = axes;
	  var permutedX = $x;

	  if (permutation != null) {
	    permutedX = transpose$1({
	      inputs: {
	        x: $x
	      },
	      backend: backend,
	      attrs: {
	        perm: permutation
	      }
	    });
	    reductionAxes = getInnerMostAxes(reductionAxes.length, xRank);
	  }

	  assertAxesAreInnerMostDims('sum', reductionAxes, permutedX.shape.length);

	  var _backend_util$compute = computeOutAndReduceShapes(permutedX.shape, reductionAxes),
	      outShape = _backend_util$compute[0],
	      reduceShape = _backend_util$compute[1];

	  var resultDtype = upcastType(permutedX.dtype, 'int32');
	  var result = zeros$2(backend, outShape, resultDtype);
	  var reduceSize = sizeFromShape(reduceShape);
	  var vals = backend.data.get(result.dataId).values;
	  var aVals = backend.data.get(permutedX.dataId).values;

	  for (var i = 0; i < vals.length; ++i) {
	    var offset = i * reduceSize;
	    var _sum = 0;

	    for (var j = 0; j < reduceSize; ++j) {
	      _sum += aVals[offset + j];
	    }

	    vals[i] = _sum;
	  }

	  if (keepDims) {
	    var newShape = expandShapeToKeepDim(result.shape, axes);
	    var oldResult = result;
	    result = reshape$2({
	      inputs: {
	        x: result
	      },
	      backend: backend,
	      attrs: {
	        shape: newShape
	      }
	    });
	    backend.disposeIntermediateTensorInfo(oldResult);
	  }

	  backend.disposeIntermediateTensorInfo($x);

	  if (permutation != null) {
	    backend.disposeIntermediateTensorInfo(permutedX);
	  }

	  return result;
	}