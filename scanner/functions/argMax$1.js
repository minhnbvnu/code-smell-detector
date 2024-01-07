function argMax$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis;
	  assertNotComplex(x, 'argMax');
	  var axes = parseAxisParam(axis, x.shape);
	  var permutedAxes = getAxesPermutation(axes, x.shape.length);
	  var $x = x;
	  var intermediateTensorInfos = [];

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
	    intermediateTensorInfos.push($x);
	    axes = getInnerMostAxes(axes.length, $x.shape.length);
	  }

	  axes = [axes[0]];
	  assertAxesAreInnerMostDims('argMax', axes, $x.shape.length);

	  var _backend_util$compute = computeOutAndReduceShapes($x.shape, axes),
	      outShape = _backend_util$compute[0],
	      reduceShape = _backend_util$compute[1];

	  var outSize = sizeFromShape(outShape);
	  var vals = makeZerosTypedArray(outSize, 'int32');
	  var reduceSize = sizeFromShape(reduceShape);
	  var aVals = backend.data.get($x.dataId).values;

	  for (var i = 0; i < vals.length; ++i) {
	    var offset = i * reduceSize;
	    var max = aVals[offset];
	    var maxIndex = 0;

	    for (var j = 0; j < reduceSize; ++j) {
	      var value = aVals[offset + j];

	      if (value > max) {
	        max = value;
	        maxIndex = j;
	      }
	    }

	    vals[i] = maxIndex;
	  }

	  intermediateTensorInfos.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return backend.makeTensorInfo(outShape, 'int32', vals);
	}