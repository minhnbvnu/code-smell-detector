function all$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis,
	      keepDims = attrs.keepDims;
	  assertNotComplex(x, 'all');
	  var origAxes = parseAxisParam(axis, x.shape);
	  var axes = origAxes;
	  var permutedAxes = getAxesPermutation(axes, x.shape.length);
	  var $x = x;

	  if (permutedAxes != null) {
	    $x = transpose$1({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        perm: permutedAxes
	      }
	    });
	    axes = getInnerMostAxes(axes.length, x.shape.length);
	  }

	  assertAxesAreInnerMostDims('all', axes, $x.shape.length);

	  var _backend_util$compute = computeOutAndReduceShapes($x.shape, axes),
	      outShape = _backend_util$compute[0],
	      reduceShape = _backend_util$compute[1];

	  var reduceSize = sizeFromShape(reduceShape);
	  var vals = makeZerosTypedArray(sizeFromShape(outShape), $x.dtype);
	  var aVals = backend.data.get($x.dataId).values;

	  for (var i = 0; i < vals.length; ++i) {
	    var offset = i * reduceSize;
	    var _all = aVals[offset];

	    for (var j = 0; j < reduceSize; ++j) {
	      var value = aVals[offset + j];
	      _all = _all && value;
	    }

	    vals[i] = _all;
	  }

	  if (permutedAxes != null) {
	    backend.disposeIntermediateTensorInfo($x);
	  }

	  var result = backend.makeTensorInfo(outShape, $x.dtype, vals);

	  if (keepDims) {
	    var expandedShape = expandShapeToKeepDim(outShape, origAxes);
	    var reshapedResult = reshape$2({
	      inputs: {
	        x: result
	      },
	      backend: backend,
	      attrs: {
	        shape: expandedShape
	      }
	    });
	    backend.disposeIntermediateTensorInfo(result);
	    return reshapedResult;
	  }

	  return result;
	}