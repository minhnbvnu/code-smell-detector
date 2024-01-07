function softmax$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var logits = inputs.logits;
	  var dim = attrs.dim;
	  var logitsRank = logits.shape.length;
	  var $dim = dim;

	  if ($dim === -1) {
	    $dim = logitsRank - 1;
	  }

	  if ($dim !== logitsRank - 1) {
	    throw Error('Softmax along a non-last dimension is not yet supported. ' + ("Logits was rank " + logitsRank + " and dim was " + $dim));
	  }

	  var axes = parseAxisParam([$dim], logits.shape);
	  var maxLogit = max$6({
	    inputs: {
	      x: logits
	    },
	    backend: backend,
	    attrs: {
	      reductionIndices: axes,
	      keepDims: false
	    }
	  });
	  var expandedShape = expandShapeToKeepDim(maxLogit.shape, axes);
	  var maxLogitReshaped = reshape$2({
	    inputs: {
	      x: maxLogit
	    },
	    backend: backend,
	    attrs: {
	      shape: expandedShape
	    }
	  });
	  var a = sub$1({
	    inputs: {
	      a: logits,
	      b: maxLogitReshaped
	    },
	    backend: backend
	  });
	  var b = exp$4({
	    inputs: {
	      x: a
	    },
	    backend: backend
	  });
	  var sumExp = sum$3({
	    inputs: {
	      x: b
	    },
	    backend: backend,
	    attrs: {
	      axis: axes,
	      keepDims: false
	    }
	  });
	  var sumReshaped = reshape$2({
	    inputs: {
	      x: sumExp
	    },
	    backend: backend,
	    attrs: {
	      shape: expandedShape
	    }
	  });
	  var result = div$1({
	    inputs: {
	      a: b,
	      b: sumReshaped
	    },
	    backend: backend
	  });
	  backend.disposeIntermediateTensorInfo(maxLogit);
	  backend.disposeIntermediateTensorInfo(maxLogitReshaped);
	  backend.disposeIntermediateTensorInfo(a);
	  backend.disposeIntermediateTensorInfo(b);
	  backend.disposeIntermediateTensorInfo(sumExp);
	  backend.disposeIntermediateTensorInfo(sumReshaped);
	  return result;
	}