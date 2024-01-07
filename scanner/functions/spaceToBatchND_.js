function spaceToBatchND_(x, blockShape, paddings) {
	  var $x = convertToTensor(x, 'x', 'spaceToBatchND');
	  assert($x.rank >= 1 + blockShape.length, function () {
	    return "input rank " + $x.rank + " should be > than [blockShape] " + blockShape.length;
	  });
	  assert(paddings.length === blockShape.length, function () {
	    return "paddings.shape[0] " + paddings.length + " must be equal to [blockShape] " + blockShape.length;
	  });
	  assert($x.shape.reduce(function (a, b, i) {
	    if (i > 0 && i <= blockShape.length) {
	      return a && (b + paddings[i - 1][0] + paddings[i - 1][1]) % blockShape[i - 1] === 0;
	    }

	    return a;
	  }, true), function () {
	    return "input spatial dimensions " + $x.shape.slice(1) + " with paddings " + paddings.toString() + " must be divisible by blockShapes " + blockShape.toString();
	  });
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    blockShape: blockShape,
	    paddings: paddings
	  };
	  return ENGINE.runKernel(SpaceToBatchND, inputs, attrs);
	}