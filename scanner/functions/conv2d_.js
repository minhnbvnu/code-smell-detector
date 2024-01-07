function conv2d_(x, filter, strides, pad, dataFormat, dilations, dimRoundingMode) {
	  if (dataFormat === void 0) {
	    dataFormat = 'NHWC';
	  }

	  if (dilations === void 0) {
	    dilations = [1, 1];
	  }

	  var $x = convertToTensor(x, 'x', 'conv2d');
	  var $filter = convertToTensor(filter, 'filter', 'conv2d');
	  var x4D = $x;
	  var reshapedTo4D = false;

	  if ($x.rank === 3) {
	    reshapedTo4D = true;
	    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
	  }

	  assert(x4D.rank === 4, function () {
	    return "Error in conv2d: input must be rank 4, but got rank " + x4D.rank + ".";
	  });
	  assert($filter.rank === 4, function () {
	    return "Error in conv2d: filter must be rank 4, but got rank " + ($filter.rank + ".");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in conv2d: pad must be an integer when using, " + ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  var inDepth = dataFormat === 'NHWC' ? x4D.shape[3] : x4D.shape[1];
	  assert(inDepth === $filter.shape[2], function () {
	    return "Error in conv2d: depth of input (" + inDepth + ") must match " + ("input depth for filter " + $filter.shape[2] + ".");
	  });
	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in conv2D: Either strides or dilations must be 1. ' + ("Got strides " + strides + " and dilations '" + dilations + "'");
	  });
	  var inputs = {
	    x: x4D,
	    filter: $filter
	  };
	  var attrs = {
	    strides: strides,
	    pad: pad,
	    dataFormat: dataFormat,
	    dilations: dilations,
	    dimRoundingMode: dimRoundingMode
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(Conv2D, inputs, attrs);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}