function batchToSpaceND$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var blockShape = attrs.blockShape,
	      crops = attrs.crops;
	  assertNotComplex([x], 'batchToSpaceND');
	  var prod = blockShape.reduce(function (a, b) {
	    return a * b;
	  });
	  var reshaped = getReshaped(x.shape, blockShape, prod);
	  var permuted = getPermuted(reshaped.length, blockShape.length);
	  var reshapedPermuted = getReshapedPermuted(x.shape, blockShape, prod);
	  var sliceBeginCoords = getSliceBeginCoords(crops, blockShape.length);
	  var sliceSize = getSliceSize(reshapedPermuted, crops, blockShape.length);
	  var xReshaped = reshape$2({
	    inputs: {
	      x: x
	    },
	    backend: backend,
	    attrs: {
	      shape: reshaped
	    }
	  });
	  var xTransposed = transpose$1({
	    inputs: {
	      x: xReshaped
	    },
	    backend: backend,
	    attrs: {
	      perm: permuted
	    }
	  });
	  var xTransposedReshaped = reshape$2({
	    inputs: {
	      x: xTransposed
	    },
	    backend: backend,
	    attrs: {
	      shape: reshapedPermuted
	    }
	  });
	  var result = slice$3({
	    inputs: {
	      x: xTransposedReshaped
	    },
	    backend: backend,
	    attrs: {
	      begin: sliceBeginCoords,
	      size: sliceSize
	    }
	  });
	  backend.disposeIntermediateTensorInfo(xReshaped);
	  backend.disposeIntermediateTensorInfo(xTransposed);
	  backend.disposeIntermediateTensorInfo(xTransposedReshaped);
	  return result;
	}