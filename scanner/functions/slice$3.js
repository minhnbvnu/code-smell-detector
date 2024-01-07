function slice$3(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var begin = attrs.begin,
	      size = attrs.size;
	  assertNotComplex(x, 'slice');

	  var _slice_util$parseSlic = parseSliceParams(x, begin, size),
	      $begin = _slice_util$parseSlic[0],
	      $size = _slice_util$parseSlic[1];

	  assertParamsValid(x, $begin, $size);
	  var vals = backend.data.get(x.dataId).values;
	  var outVals = sliceImpl(vals, $begin, $size, x.shape, x.dtype);
	  return backend.makeTensorInfo($size, x.dtype, outVals);
	}