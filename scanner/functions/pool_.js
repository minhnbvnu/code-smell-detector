function pool_(input, windowShape, poolingType, pad, dilations, strides) {
	  if (dilations == null) {
	    dilations = [1, 1];
	  }

	  if (strides == null) {
	    strides = 1;
	  }

	  if (pad === 0) {
	    pad = 'valid';
	  }

	  var $x = convertToTensor(input, 'x', 'maxPool');
	  var x4D = $x;
	  var reshapedTo4D = false;

	  if ($x.rank === 3) {
	    reshapedTo4D = true;
	    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
	  }

	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in pool: Either strides or dilations must be 1. ' + ("Got strides " + strides + " and dilations '" + dilations + "'");
	  });
	  var convInfo = computePool2DInfo(x4D.shape, windowShape, strides, dilations, pad);
	  var dilation = [convInfo.dilationHeight, convInfo.dilationWidth]; // The following implementation does batchToSpace(pool(spaceToBatch(x)))
	  // whenever dilation > 1 since the TF kernels do not support dilation > 1.
	  // tslint:disable-next-line:max-line-length
	  // https://github.com/tensorflow/tensorflow/blob/50f6bb67dc98c9b74630b6047aae7a4f8a40fd02/tensorflow/python/ops/nn_ops.py#L1037

	  var basePadding;

	  if (pad === 'same') {
	    basePadding = withSpaceToBatchBasePaddings([convInfo.filterHeight, convInfo.filterWidth], dilation);
	  } else {
	    basePadding = [[0, 0], [0, 0]];
	  }

	  var isDilationOne = dilation[0] === 1 && dilation[1] === 1;

	  var _requiredSpaceToBatch = requiredSpaceToBatchPaddings([convInfo.inHeight, convInfo.inWidth], dilation, basePadding),
	      adjustedPadding = _requiredSpaceToBatch[0],
	      adjustedCrops = _requiredSpaceToBatch[1];

	  var convertedPad = isDilationOne ? pad : 'valid';
	  var convertedX = isDilationOne ? x4D : spaceToBatchND(x4D, dilation, adjustedPadding);
	  var forwardOp = poolingType === 'avg' ? function () {
	    return avgPool(convertedX, windowShape, strides, convertedPad);
	  } : function () {
	    return maxPool(convertedX, windowShape, strides, convertedPad);
	  };
	  var y = forwardOp();
	  var res = isDilationOne ? y : batchToSpaceND(y, dilation, adjustedCrops);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}