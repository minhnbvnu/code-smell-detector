function linSpace(args) {
	  var backend = args.backend,
	      attrs = args.attrs;
	  var start = attrs.start,
	      stop = attrs.stop,
	      num = attrs.num;
	  var outVals = linSpaceImpl(start, stop, num);
	  return backend.makeTensorInfo([outVals.length], 'float32', outVals);
	}