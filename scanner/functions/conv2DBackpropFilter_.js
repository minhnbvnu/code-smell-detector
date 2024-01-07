function conv2DBackpropFilter_(x, dy, filterShape, strides, pad, dataFormat, dimRoundingMode) {
	  if (dataFormat === void 0) {
	    dataFormat = 'NHWC';
	  }

	  var x4D = x;

	  if (x.rank === 3) {
	    x4D = reshape(x, [1, x.shape[0], x.shape[1], x.shape[2]]);
	  }

	  var dy4D = dy;

	  if (dy4D.rank === 3) {
	    dy4D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2]]);
	  }

	  assert(x4D.rank === 4, function () {
	    return "Error in conv2dDerFilter: input must be rank 4, but got shape " + (x4D.shape + ".");
	  });
	  assert(dy4D.rank === 4, function () {
	    return "Error in conv2dDerFilter: dy must be rank 4, but got shape " + (dy4D.shape + ".");
	  });
	  assert(filterShape.length === 4, function () {
	    return "Error in conv2dDerFilter: filterShape must be length 4, but got " + (filterShape + ".");
	  });
	  var inDepth = dataFormat === 'NHWC' ? x4D.shape[3] : x4D.shape[1];
	  var outDepth = dataFormat === 'NHWC' ? dy4D.shape[3] : dy4D.shape[1];
	  assert(inDepth === filterShape[2], function () {
	    return "Error in conv2dDerFilter: depth of input " + inDepth + ") must " + ("match input depth in filter (" + filterShape[2] + ".");
	  });
	  assert(outDepth === filterShape[3], function () {
	    return "Error in conv2dDerFilter: depth of dy (" + outDepth + ") must " + ("match output depth for filter (" + filterShape[3] + ").");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in conv2dDerFilter: pad must be an integer when using, " + ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  var inputs = {
	    x: x4D,
	    dy: dy4D
	  };
	  var attrs = {
	    strides: strides,
	    pad: pad,
	    dataFormat: dataFormat,
	    dimRoundingMode: dimRoundingMode,
	    filterShape: filterShape
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  return ENGINE.runKernel(Conv2DBackpropFilter, inputs, attrs);
	}