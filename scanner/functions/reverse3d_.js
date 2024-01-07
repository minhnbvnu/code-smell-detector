function reverse3d_(x, axis) {
	  var $x = convertToTensor(x, 'x', 'reverse');
	  assert($x.rank === 3, function () {
	    return "Error in reverse3D: x must be rank 3 but got rank " + $x.rank + ".";
	  });
	  return reverse($x, axis);
	}