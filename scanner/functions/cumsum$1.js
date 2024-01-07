function cumsum$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis,
	      exclusive = attrs.exclusive,
	      reverse = attrs.reverse;
	  assertNotComplex(x, 'cumsum');
	  var permutation = getAxesPermutation([axis], x.shape.length);
	  var $x = x;

	  if (permutation != null) {
	    $x = transpose$1({
	      inputs: {
	        x: x
	      },
	      backend: backend,
	      attrs: {
	        perm: permutation
	      }
	    });
	  }

	  var permutedAxis = getInnerMostAxes(1, x.shape.length)[0];

	  if (permutedAxis !== $x.shape.length - 1) {
	    throw new Error("backend.cumsum in CPU expects an inner-most " + ("axis=" + ($x.shape.length - 1) + " but got axis=" + permutedAxis));
	  }

	  var resultDtype = upcastType($x.dtype, 'int32');
	  var vals = makeZerosTypedArray(sizeFromShape($x.shape), resultDtype);
	  var aVals = backend.data.get($x.dataId).values;
	  var finalDim = $x.shape[$x.shape.length - 1];
	  var indexAdjuster = reverse ? function (i, j) {
	    return i + finalDim - j - 1;
	  } : function (i, j) {
	    return i + j;
	  };

	  for (var i = 0; i < aVals.length; i += finalDim) {
	    for (var j = 0; j < finalDim; j++) {
	      var idx = indexAdjuster(i, j);

	      if (j === 0) {
	        vals[idx] = exclusive ? 0 : aVals[idx];
	      } else {
	        var prevIdx = indexAdjuster(i, j - 1);
	        vals[idx] = exclusive ? aVals[prevIdx] + vals[prevIdx] : aVals[idx] + vals[prevIdx];
	      }
	    }
	  }

	  var result = backend.makeTensorInfo($x.shape, resultDtype, vals);

	  if (permutation != null) {
	    var reversePermutation = getUndoAxesPermutation(permutation);
	    var reverseTransposedResult = transpose$1({
	      inputs: {
	        x: result
	      },
	      backend: backend,
	      attrs: {
	        perm: reversePermutation
	      }
	    });
	    backend.disposeIntermediateTensorInfo(result);
	    backend.disposeIntermediateTensorInfo($x);
	    return reverseTransposedResult;
	  }

	  return result;
	}