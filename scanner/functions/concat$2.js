function concat$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var axis = attrs.axis;
	  var $axis = parseAxisParam(axis, inputs[0].shape)[0];
	  var outShape = computeOutShape$1(inputs.map(function (t) {
	    return t.shape;
	  }), $axis);

	  if (sizeFromShape(outShape) === 0) {
	    return backend.makeTensorInfo(outShape, inputs[0].dtype, []);
	  } // Keep only non-empty tensors (ignore tensors with 0 in their shape).


	  var $inputs = inputs.filter(function (t) {
	    return sizeFromShape(t.shape) > 0;
	  });

	  if ($inputs.length === 1) {
	    return identity$2({
	      inputs: {
	        x: $inputs[0]
	      },
	      backend: backend
	    });
	  }

	  var shapes = $inputs.map(function (t) {
	    return t.shape;
	  });
	  assertParamsConsistent(shapes, $axis);
	  return concatImpl$1($inputs, $axis, backend);
	}