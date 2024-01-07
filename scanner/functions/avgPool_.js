function avgPool_(x, filterSize, strides, pad, dimRoundingMode) {
	  var $x = convertToTensor(x, 'x', 'avgPool', 'float32');
	  var dilations = 1;
	  assert(eitherStridesOrDilationsAreOne(strides, dilations), function () {
	    return 'Error in avgPool: Either strides or dilations must be 1. ' + ("Got strides " + strides + " and dilations '" + dilations + "'");
	  });
	  var x4D = $x;
	  var reshapedTo4D = false;

	  if ($x.rank === 3) {
	    reshapedTo4D = true;
	    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
	  }

	  assert(x4D.rank === 4, function () {
	    return "Error in avgPool: x must be rank 4 but got rank " + x4D.rank + ".";
	  });

	  if (dimRoundingMode != null) {
	    assert(isInt(pad), function () {
	      return "Error in avgPool: pad must be an integer when using, " + ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + ".");
	    });
	  }

	  var inputs = {
	    x: x4D
	  };
	  var attrs = {
	    filterSize: filterSize,
	    strides: strides,
	    pad: pad,
	    dimRoundingMode: dimRoundingMode
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(AvgPool, inputs, attrs);
	  res = cast(res, $x.dtype);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  }

	  return res;
	}