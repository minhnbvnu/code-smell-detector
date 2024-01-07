function depthwiseConv2dNativeBackpropInput_(xShape, dy, filter, strides, pad, dilations, dimRoundingMode) {
	  if (dilations === void 0) {
	    dilations = [1, 1];
	  }

	  var dy4D = dy;
	  var reshapedTo4D = false;

	  if (dy.rank === 3) {
	    reshapedTo4D = true;
	    dy4D = reshape(dy, [1, dy.shape[0], dy.shape[1], dy.shape[2]]);
	  }

	  var inputs = {
	    dy: dy4D,
	    filter: filter
	  };
	  var attrs = {
	    strides: strides,
	    pad: pad,
	    dimRoundingMode: dimRoundingMode,
	    dilations: dilations,
	    inputShape: xShape
	  };
	  var res = // tslint:disable-next-line: no-unnecessary-type-assertion
	  ENGINE.runKernel(DepthwiseConv2dNativeBackpropInput, inputs, attrs);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}