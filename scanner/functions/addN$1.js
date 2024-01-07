function addN$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend;
	  var tensors = inputs;
	  assertNotComplex(inputs, 'addN');
	  var vals = tensors.map(function (t) {
	    return backend.data.get(t.dataId).values;
	  });
	  var outBuf = buffer(tensors[0].shape, tensors[0].dtype);
	  var outVals = outBuf.values;

	  for (var i = 0; i < tensors.length; i++) {
	    var currVals = vals[i];

	    for (var j = 0; j < outVals.length; j++) {
	      outVals[j] += currVals[j];
	    }
	  }

	  return backend.makeTensorInfo(outBuf.shape, outBuf.dtype, outBuf.values);
	}