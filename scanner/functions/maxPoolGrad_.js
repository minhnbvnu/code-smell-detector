function maxPoolGrad_(dy, input, output, filterSize, strides, pad, dimRoundingMode) {
	  var $dy = convertToTensor(dy, 'dy', 'maxPoolGrad');
	  var $input = convertToTensor(input, 'input', 'maxPoolGrad');
	  var $output = convertToTensor(output, 'output', 'maxPoolGrad');
	  assert($input.rank === $dy.rank, function () {
	    return "Rank of input (" + $input.rank + ") does not match rank of dy " + ("(" + $dy.rank + ")");
	  });
	  assert($dy.rank === 4, function () {
	    return "Error in maxPoolGrad: dy must be rank 4 but got rank " + ($dy.rank + ".");
	  });
	  assert($input.rank === 4, function () {
	    return "Error in maxPoolGrad: input must be rank 4 but got rank " + ($input.rank + ".");
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in maxPoolGrad: pad must be an integer when using, " + ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  var inputs = {
	    dy: $dy,
	    input: $input,
	    output: $output
	  };
	  var attrs = {
	    filterSize: filterSize,
	    strides: strides,
	    pad: pad,
	    dimRoundingMode: dimRoundingMode
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  return ENGINE.runKernel(MaxPoolGrad, inputs, attrs);
	}