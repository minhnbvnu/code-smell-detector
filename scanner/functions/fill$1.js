function fill$1(args) {
	  var backend = args.backend,
	      attrs = args.attrs;
	  var shape = attrs.shape,
	      value = attrs.value,
	      dtype = attrs.dtype;
	  var $dtype = dtype || inferDtype(value);
	  var values = getArrayFromDType($dtype, sizeFromShape(shape));
	  fillValues(values, value, $dtype);
	  return backend.makeTensorInfo(shape, $dtype, values);
	}