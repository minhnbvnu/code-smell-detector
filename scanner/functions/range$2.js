function range$2(args) {
	  var backend = args.backend,
	      attrs = args.attrs;
	  var start = attrs.start,
	      stop = attrs.stop,
	      dtype = attrs.dtype,
	      step = attrs.step;
	  var values = rangeImpl(start, stop, step, dtype);
	  return backend.makeTensorInfo([values.length], dtype, values);
	}