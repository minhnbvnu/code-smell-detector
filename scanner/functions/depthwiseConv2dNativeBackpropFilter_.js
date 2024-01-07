function depthwiseConv2dNativeBackpropFilter_(x, dy, filterShape, strides, pad, dilations, dimRoundingMode) {
	  if (dilations === void 0) {
	    dilations = [1, 1];
	  }

	  var x4D = x;

	  if (x.rank === 3) {
	    x4D = reshape(x, [1, x.shape[0], x.shape[1], x.shape[2]]);
	  }

	  var dy4D = dy;

	  if (dy4D.rank === 3) {
	    dy4D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2]]);
	  }

	  var inputs = {
	    x: x4D,
	    dy: dy4D
	  };
	  var attrs = {
	    strides: strides,
	    pad: pad,
	    dimRoundingMode: dimRoundingMode,
	    dilations: dilations,
	    filterShape: filterShape
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  return ENGINE.runKernel(DepthwiseConv2dNativeBackpropFilter, inputs, attrs);
	}