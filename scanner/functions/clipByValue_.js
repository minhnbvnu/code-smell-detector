function clipByValue_(x, clipValueMin, clipValueMax) {
	  var $x = convertToTensor(x, 'x', 'clipByValue');
	  assert(clipValueMin <= clipValueMax, function () {
	    return "Error in clip: min (" + clipValueMin + ") must be " + ("less than or equal to max (" + clipValueMax + ").");
	  });
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    clipValueMin: clipValueMin,
	    clipValueMax: clipValueMax
	  };
	  return ENGINE.runKernel(ClipByValue, inputs, attrs);
	}