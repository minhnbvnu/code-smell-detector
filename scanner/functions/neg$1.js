function neg$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x;
	  assertNotComplex(x, 'neg');
	  var xVals = backend.data.get(x.dataId).values;

	  var _negImpl = negImpl(xVals, x.shape, x.dtype),
	      res = _negImpl[0],
	      newShape = _negImpl[1];

	  return backend.makeTensorInfo(newShape, x.dtype, res);
	}