function maxPool3D(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var x = inputs.x;
	  var filterSize = attrs.filterSize,
	      strides = attrs.strides,
	      pad = attrs.pad,
	      dimRoundingMode = attrs.dimRoundingMode,
	      dataFormat = attrs.dataFormat,
	      dilations = attrs.dilations;
	  assertNotComplex(x, 'maxPool3d');
	  var $dilations = dilations;

	  if ($dilations == null) {
	    $dilations = [1, 1, 1];
	  }

	  var convInfo = computePool3DInfo(x.shape, filterSize, strides, $dilations, pad, dimRoundingMode, dataFormat);
	  var xValues = backend.data.get(x.dataId).values;
	  var outBuf = pool3d$1(xValues, x.shape, x.dtype, computeStrides(x.shape), convInfo, 'max');
	  return backend.makeTensorInfo(outBuf.shape, 'float32', outBuf.values);
	}