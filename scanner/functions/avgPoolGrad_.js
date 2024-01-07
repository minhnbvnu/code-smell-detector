function avgPoolGrad_(dy, input, filterSize, strides, pad) {
	  var $dy = convertToTensor(dy, 'dy', 'avgPoolGrad');
	  var $input = convertToTensor(input, 'input', 'avgPoolGrad');
	  assert($input.rank === $dy.rank, function () {
	    return "Rank of input (" + $input.rank + ") does not match rank of dy (" + $dy.rank + ")";
	  });
	  var input4D = $input;
	  var dy4D = $dy;
	  var reshapedTo4D = false;

	  if ($input.rank === 3) {
	    reshapedTo4D = true;
	    input4D = reshape($input, [1, $input.shape[0], $input.shape[1], $input.shape[2]]);
	    dy4D = reshape($dy, [1, $dy.shape[0], $dy.shape[1], $dy.shape[2]]);
	  }

	  assert(dy4D.rank === 4, function () {
	    return "Error in avgPoolGrad: dy must be rank 4 but got rank " + (dy4D.rank + ".");
	  });
	  assert(input4D.rank === 4, function () {
	    return "Error in avgPoolGrad: input must be rank 4 but got rank " + (input4D.rank + ".");
	  });
	  var inputs = {
	    dy: dy4D,
	    input: input4D
	  };
	  var attrs = {
	    filterSize: filterSize,
	    strides: strides,
	    pad: pad
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(AvgPoolGrad, inputs, attrs);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}