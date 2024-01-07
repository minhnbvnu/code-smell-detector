function eluGrad(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var dy = inputs.dy,
	      y = inputs.y;
	  assertNotComplex([dy, y], 'eluGrad');
	  var resultValues = new Float32Array(sizeFromShape(y.shape));
	  var values = backend.data.get(y.dataId).values;
	  var dyValues = backend.data.get(dy.dataId).values;

	  for (var i = 0; i < values.length; ++i) {
	    var v = values[i];

	    if (v >= 1) {
	      resultValues[i] = dyValues[i];
	    } else {
	      resultValues[i] = dyValues[i] * (v + 1);
	    }
	  }

	  return backend.makeTensorInfo(y.shape, 'float32', resultValues);
	}