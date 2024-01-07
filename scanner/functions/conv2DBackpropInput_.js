function conv2DBackpropInput_(xShape, dy, filter, strides, pad, dataFormat, dimRoundingMode) {
	  if (dataFormat === void 0) {
	    dataFormat = 'NHWC';
	  }

	  assert(xShape.length === dy.rank, function () {
	    return "Length of inShape " + ("(" + xShape.length + ") and rank of dy (" + dy.rank + ") must match");
	  });
	  var xShape4D = xShape;
	  var dy4D = dy;
	  var reshapedTo4D = false;

	  if (dy.rank === 3) {
	    reshapedTo4D = true;
	    dy4D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2]]);
	    xShape4D = [1, xShape[0], xShape[1], xShape[2]];
	  }

	  assert(xShape4D.length === 4, function () {
	    return "Error in conv2dDerInput: inShape must be length 4, but got length " + (xShape4D.length + ".");
	  });
	  assert(dy4D.rank === 4, function () {
	    return "Error in conv2dDerInput: dy must be rank 4, but got " + ("rank " + dy4D.rank);
	  });
	  assert(filter.rank === 4, function () {
	    return "Error in conv2dDerInput: filter must be rank 4, but got " + ("rank " + filter.rank);
	  });
	  var inDepth = dataFormat === 'NHWC' ? xShape4D[3] : xShape4D[1];
	  var outDepth = dataFormat === 'NHWC' ? dy4D.shape[3] : dy4D.shape[1];
	  assert(inDepth === filter.shape[2], function () {
	    return "Error in conv2dDerInput: depth of input (" + inDepth + ") must " + ("match input depth for filter " + filter.shape[2] + ".");
	  });
	  assert(outDepth === filter.shape[3], function () {
	    return "Error in conv2dDerInput: depth of output (" + outDepth + ") must " + ("match output depth for filter " + filter.shape[3] + ".");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in conv2dDerInput: pad must be an integer when using, " + ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  var inputs = {
	    dy: dy4D,
	    filter: filter
	  };
	  var attrs = {
	    strides: strides,
	    pad: pad,
	    dataFormat: dataFormat,
	    dimRoundingMode: dimRoundingMode,
	    inputShape: xShape4D
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(Conv2DBackpropInput, inputs, attrs);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}