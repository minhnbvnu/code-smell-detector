function prelu$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var x = inputs.x,
	      alpha = inputs.alpha;
	  assertNotComplex([x, alpha], 'prelu');
	  var aVals = backend.data.get(x.dataId).values;
	  var bVals = backend.data.get(alpha.dataId).values;

	  var _preluImpl = preluImpl(x.shape, alpha.shape, aVals, bVals, x.dtype),
	      resultData = _preluImpl[0],
	      resultShape = _preluImpl[1];

	  return backend.makeTensorInfo(resultShape, x.dtype, resultData);
	}