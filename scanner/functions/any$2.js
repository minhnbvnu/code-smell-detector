function any$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis,
	      keepDims = attrs.keepDims;
	  var xRank = x.shape.length;
	  var origAxes = parseAxisParam(axis, x.shape);
	  var axes = origAxes;
	  var permutedAxes = getAxesPermutation(axes, xRank);
	  var permutedX = x;

	  if (permutedAxes != null) {
	    permutedX = transpose$2({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        perm: permutedAxes
	      }
	    });
	    axes = getInnerMostAxes(axes.length, xRank);
	  }

	  assertAxesAreInnerMostDims('any', axes, xRank);

	  var _backend_util$compute = computeOutAndReduceShapes(permutedX.shape, axes),
	      outShape = _backend_util$compute[0],
	      reduceShape = _backend_util$compute[1];

	  var inSize = sizeFromShape(reduceShape);
	  var a2D = reshape$3({
	    inputs: {
	      x: permutedX
	    },
	    backend: backend,
	    attrs: {
	      shape: [-1, inSize]
	    }
	  });
	  var reduced = reduce(a2D, a2D.dtype, 'any', backend);
	  var res;

	  if (keepDims) {
	    var newShape = expandShapeToKeepDim(outShape, origAxes);
	    res = reshape$3({
	      inputs: {
	        x: reduced
	      },
	      backend: backend,
	      attrs: {
	        shape: newShape
	      }
	    });
	  } else {
	    res = reshape$3({
	      inputs: {
	        x: reduced
	      },
	      backend: backend,
	      attrs: {
	        shape: outShape
	      }
	    });
	  }

	  backend.disposeIntermediateTensorInfo(a2D);
	  backend.disposeIntermediateTensorInfo(reduced);

	  if (permutedAxes != null) {
	    backend.disposeIntermediateTensorInfo(permutedX);
	  }

	  return res;
	}