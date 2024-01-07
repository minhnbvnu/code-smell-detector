function pad_(x, paddings, constantValue) {
	  if (constantValue === void 0) {
	    constantValue = 0;
	  }

	  var $x = convertToTensor(x, 'x', 'pad');

	  if ($x.rank === 0) {
	    throw new Error('pad(scalar) is not defined. Pass non-scalar to pad');
	  }

	  var attrs = {
	    paddings: paddings,
	    constantValue: constantValue
	  };
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(PadV2, inputs, attrs);
	}