function mean$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var axis = attrs.axis,
	      keepDims = attrs.keepDims;
	  var axes = parseAxisParam(axis, x.shape);
	  var shapes = computeOutAndReduceShapes(x.shape, axes);
	  var reduceShape = shapes[1];
	  var reduceSize = sizeFromShape(reduceShape);
	  var toDispose = [];
	  var reduceSizeScalar = backend.makeTensorInfo([], 'float32', new Float32Array([reduceSize]));
	  toDispose.push(reduceSizeScalar);
	  var $x = cast$2({
	    inputs: {
	      x: x
	    },
	    backend: backend,
	    attrs: {
	      dtype: 'float32'
	    }
	  });
	  toDispose.push($x);
	  var res = div$1({
	    inputs: {
	      a: $x,
	      b: reduceSizeScalar
	    },
	    backend: backend
	  });
	  toDispose.push(res);
	  var result = sum$3({
	    inputs: {
	      x: res
	    },
	    backend: backend,
	    attrs: {
	      axis: axis,
	      keepDims: keepDims
	    }
	  });
	  toDispose.forEach(function (t) {
	    return backend.disposeIntermediateTensorInfo(t);
	  });
	  return result;
	}