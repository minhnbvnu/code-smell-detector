function conv1d_(x, filter, stride, pad, dataFormat, dilation, dimRoundingMode) {
	  if (dataFormat === void 0) {
	    dataFormat = 'NWC';
	  }

	  if (dilation === void 0) {
	    dilation = 1;
	  }

	  var $x = convertToTensor(x, 'x', 'conv1d');
	  var $filter = convertToTensor(filter, 'filter', 'conv1d');
	  var x3D = $x;
	  var reshapedTo3D = false;

	  if ($x.rank === 2) {
	    reshapedTo3D = true;
	    x3D = reshape($x, [1, $x.shape[0], $x.shape[1]]);
	  }

	  assert(x3D.rank === 3, function () {
	    return "Error in conv1d: input must be rank 3, but got rank " + x3D.rank + ".";
	  });
	  assert($filter.rank === 3, function () {
	    return "Error in conv1d: filter must be rank 3, but got rank " + ($filter.rank + ".");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in conv1d: pad must be an integer when using, " + ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  assert(x3D.shape[2] === $filter.shape[1], function () {
	    return "Error in conv1d: depth of input (" + x3D.shape[2] + ") must match " + ("input depth for filter " + $filter.shape[1] + ".");
	  });
	  assert(eitherStridesOrDilationsAreOne(stride, dilation), function () {
	    return 'Error in conv1D: Either stride or dilation must be 1. ' + ("Got stride " + stride + " and dilation '" + dilation + "'");
	  });
	  assert(dataFormat === 'NWC', function () {
	    return "Error in conv1d: got dataFormat of " + dataFormat + " but only NWC is currently supported.";
	  });
	  var filter4D = reshape($filter, [1, $filter.shape[0], $filter.shape[1], $filter.shape[2]]);
	  var input4D = reshape(x3D, [x3D.shape[0], 1, x3D.shape[1], x3D.shape[2]]);
	  var strides = [1, stride];
	  var dilations = [1, dilation];
	  var conv2dDataFormat = 'NHWC';
	  var res = conv2d(input4D, filter4D, strides, pad, conv2dDataFormat, dilations, dimRoundingMode);

	  if (reshapedTo3D) {
	    return reshape(res, [res.shape[2], res.shape[3]]);
	  }

	  return reshape(res, [res.shape[0], res.shape[2], res.shape[3]]);
	}