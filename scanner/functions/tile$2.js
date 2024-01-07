function tile$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var reps = attrs.reps;
	  assertNotComplex(x, 'tile');
	  var outBuf = tileImpl(backend.bufferSync(x), reps);
	  return backend.makeTensorInfo(outBuf.shape, outBuf.dtype, outBuf.values);
	}