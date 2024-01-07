function reverse2d_(x, axis) {
	  var $x = convertToTensor(x, 'x', 'reverse');
	  assert($x.rank === 2, function () {
	    return "Error in reverse2D: x must be rank 2 but got rank " + $x.rank + ".";
	  });
	  return reverse($x, axis);
	}