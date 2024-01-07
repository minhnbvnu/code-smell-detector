function depthwiseConv2d_(x, filter, strides, pad, dataFormat, dilations, dimRoundingMode) {
	  if (dataFormat === void 0) {
	    dataFormat = 'NHWC';
	  }

	  if (dilations === void 0) {
	    dilations = [1, 1];
	  }

	  var $x = convertToTensor(x, 'x', 'depthwiseConv2d');
	  var $filter = convertToTensor(filter, 'filter', 'depthwiseConv2d');
	  var x4D = $x;
	  var reshapedTo4D = false;

	  if ($x.rank === 3) {
	    reshapedTo4D = true;
	    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
	  }

	  assert(x4D.rank === 4, function () {
	    return "Error in depthwiseConv2d: input must be rank 4, but got " + ("rank " + x4D.rank + ".");
	  });
	  assert($filter.rank === 4, function () {
	    return "Error in depthwiseConv2d: filter must be rank 4, but got rank " + ($filter.rank + ".");
	  });
	  assert(x4D.shape[3] === $filter.shape[2], function () {
	    return "Error in depthwiseConv2d: number of input channels " + ("(" + x4D.shape[3] + ") must match the inChannels dimension in ") + ("filter " + $filter.shape[2] + ".");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in depthwiseConv2d: pad must be an integer when using, " + ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

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

	  var res = ENGINE.runKernel(DepthwiseConv2dNative, inputs, attrs);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}