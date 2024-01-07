function avgPool3dGrad_(dy, input, filterSize, strides, dilations, pad, dimRoundingMode) {
	  if (dilations === void 0) {
	    dilations = [1, 1, 1];
	  }

	  var $dy = convertToTensor(dy, 'dy', 'avgPool3dGrad');
	  var $input = convertToTensor(input, 'input', 'avgPool3dGrad');
	  var dy5D = $dy;
	  var input5D = $input;
	  var reshapedTo5D = false;

	  if ($input.rank === 4) {
	    reshapedTo5D = true;
	    dy5D = reshape($dy, [1, $dy.shape[0], $dy.shape[1], $dy.shape[2], $dy.shape[3]]);
	    input5D = reshape($input, [1, $input.shape[0], $input.shape[1], $input.shape[2], $input.shape[3]]);
	  }

	  assert(dy5D.rank === 5, function () {
	    return "Error in avgPool3dGrad: dy must be rank 5 but got rank " + (dy5D.rank + ".");
	  });
	  assert(input5D.rank === 5, function () {
	    return "Error in avgPool3dGrad: input must be rank 5 but got rank " + (input5D.rank + ".");
	  });
	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in avgPool3dGrad: Either strides or dilations ' + ("must be 1. Got strides " + strides + " and dilations '" + dilations + "'");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in avgPool3dGrad: pad must be an integer when " + ("using, dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  var inputs = {
	    dy: dy5D,
	    input: input5D
	  };
	  var attrs = {
	    filterSize: filterSize,
	    strides: strides,
	    dilations: dilations,
	    pad: pad,
	    dimRoundingMode: dimRoundingMode
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(AvgPool3DGrad, inputs, attrs);

	  if (reshapedTo5D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3], res.shape[4]]);
	  }

	  return res;
	}