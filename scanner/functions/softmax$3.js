function softmax$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var logits = inputs.logits;
	  var dim = attrs.dim;
	  var axes = parseAxisParam([dim], logits.shape);
	  var maxLogit = max$7({
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
	  var maxLogitsReshaped = reshape$3({
	    inputs: {
	      x: maxLogit
	    },
	    backend: backend,
	    attrs: {
	      shape: expandedShape
	    }
	  });
	  var a = sub$2({
	    inputs: {
	      a: logits,
	      b: maxLogitsReshaped
	    },
	    backend: backend
	  });
	  var b = exp$5({
	    inputs: {
	      x: a
	    },
	    backend: backend
	  });
	  var sumExp = sum$4({
	    inputs: {
	      x: b
	    },
	    backend: backend,
	    attrs: {
	      axis: axes,
	      keepDims: false
	    }
	  });
	  var sumExpReshaped = reshape$3({
	    inputs: {
	      x: sumExp
	    },
	    backend: backend,
	    attrs: {
	      shape: expandedShape
	    }
	  });
	  var res = realDiv({
	    inputs: {
	      a: b,
	      b: sumExpReshaped
	    },
	    backend: backend
	  });
	  backend.disposeIntermediateTensorInfo(maxLogit);
	  backend.disposeIntermediateTensorInfo(maxLogitsReshaped);
	  backend.disposeIntermediateTensorInfo(a);
	  backend.disposeIntermediateTensorInfo(b);
	  backend.disposeIntermediateTensorInfo(sumExp);
	  backend.disposeIntermediateTensorInfo(sumExpReshaped);
	  return res;
	}