function avgPool$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  assertNotComplex(x, 'avgPool');
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode;
	  var dilations = 1;
	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in avgPool: Either strides or dilations must be 1. ' + ("Got strides " + strides + " and dilations '" + dilations + "'");
	  });
	  var convInfo = computePool2DInfo(x.shape, filterSize, strides, dilations, pad, dimRoundingMode);
	  var res;

	  if (convInfo.filterWidth === 1 && convInfo.filterHeight === 1 && arraysEqual(convInfo.inShape, convInfo.outShape)) {
	    res = identity$1({
	      inputs: {
	        x: x
	      },
	      backend: backend
	    });
	  } else {
	    var xValues = backend.data.get(x.dataId).values;

	    var _strides = computeStrides(x.shape);

	    var buffer = pool$1(xValues, x.shape, x.dtype, _strides, convInfo, 'avg');
	    res = backend.makeTensorInfo(convInfo.outShape, x.dtype, buffer.values);
	  }

	  return res;
	}