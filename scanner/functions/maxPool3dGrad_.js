function maxPool3dGrad_(dy, input, output, filterSize, strides, dilations, pad, dimRoundingMode) {
	  if (dilations === void 0) {
	    dilations = [1, 1, 1];
	  }

	  var $dy = convertToTensor(dy, 'dy', 'maxPool3dGrad');
	  var $input = convertToTensor(input, 'input', 'maxPool3dGrad');
	  var $output = convertToTensor(output, 'output', 'maxPool3dGrad');
	  var dy5D = $dy;
	  var input5D = $input;
	  var output5D = $output;
	  var reshapedTo5D = false;

	  if ($input.rank === 4) {
	    reshapedTo5D = true;
	    dy5D = reshape($dy, [1, $dy.shape[0], $dy.shape[1], $dy.shape[2], $dy.shape[3]]);
	    input5D = reshape($input, [1, $input.shape[0], $input.shape[1], $input.shape[2], $input.shape[3]]);
	    output5D = reshape($output, [1, $output.shape[0], $output.shape[1], $output.shape[2], $output.shape[3]]);
	  }

	  assert(dy5D.rank === 5, function () {
	    return "Error in maxPool3dGrad: dy must be rank 5 but got rank " + (dy5D.rank + ".");
	  });
	  assert(input5D.rank === 5, function () {
	    return "Error in maxPool3dGrad: input must be rank 5 but got rank " + (input5D.rank + ".");
	  });
	  assert(output5D.rank === 5, function () {
	    return "Error in maxPool3dGrad: output must be rank 5 but got rank " + (output5D.rank + ".");
	  });
	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in maxPool3dGrad: Either strides or dilations ' + ("must be 1. Got strides " + strides + " and dilations '" + dilations + "'");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in maxPool3dGrad: pad must be an integer when " + ("using, dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  var inputs = {
	    dy: dy5D,
	    input: input5D,
	    output: output5D
	  };
	  var attrs = {
	    filterSize: filterSize,
	    strides: strides,
	    dilations: dilations,
	    pad: pad,
	    dimRoundingMode: dimRoundingMode
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(MaxPool3DGrad, inputs, attrs);

	  if (reshapedTo5D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3], res.shape[4]]);
	  }

	  return res;
	}