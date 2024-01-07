function leakyRelu$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var alpha = attrs.alpha;
	  assertNotComplex([x], 'leakyRelu');
	  var xSize = sizeFromShape(x.shape);
	  var xVals = backend.data.get(x.dataId).values;
	  var outVals = getTypedArrayFromDType('float32', xSize);

	  for (var i = 0; i < xVals.length; i++) {
	    outVals[i] = xVals[i] < 0 ? alpha * xVals[i] : xVals[i];
	  }

	  return backend.makeTensorInfo(x.shape, 'float32', outVals);
	}