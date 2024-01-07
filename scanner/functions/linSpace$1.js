function linSpace$1(args) {
	  var backend = args.backend,
	      attrs = args.attrs;
	  var start = attrs.start,
	      stop = attrs.stop,
	      num = attrs.num; // TODO: Use CPU implementation due to the precision problem in Safari.

	  var outVals = linSpaceImplCPU(start, stop, num);
	  return backend.makeTensorInfo([outVals.length], 'float32', outVals);
	}