function mirrorPad_(x, paddings, mode) {
	  assert(mode === 'reflect' || mode === 'symmetric', function () {
	    return "Invalid mode. Mode must be either reflect or symmetric. " + ("Got " + mode + ".");
	  });
	  var $x = convertToTensor(x, 'x', 'mirrorPad');

	  if ($x.rank === 0) {
	    throw new Error('mirrorPad(scalar) is not defined. ' + 'Pass non-scalar to mirrorPad');
	  }

	  assert(paddings.length === $x.rank, function () {
	    return "Padding doesn't match input. Must be " + $x.rank + ". " + ("Got " + paddings.length + ".");
	  });
	  var shapeOffset = mode === 'reflect' ? 1 : 0;

	  var _loop = function _loop(i) {
	    assert(paddings[i].length === 2, function () {
	      return "Invalid number of paddings. Must be length of 2 each.";
	    });
	    assert(paddings[i][0] >= 0 && paddings[i][0] <= $x.shape[i] - shapeOffset && paddings[i][1] >= 0 && paddings[i][1] <= $x.shape[i] - shapeOffset, function () {
	      return "Padding in dimension " + i + " cannot be greater than or equal " + ("to " + ($x.shape[i] - shapeOffset) + " or less than 0 for input of ") + ("shape " + $x.shape);
	    });
	  };

	  for (var i = 0; i < $x.rank; i++) {
	    _loop(i);
	  }

	  var attrs = {
	    paddings: paddings,
	    mode: mode
	  };
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(MirrorPad, inputs, attrs);
	}