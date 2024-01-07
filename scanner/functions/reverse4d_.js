function reverse4d_(x, axis) {
	  var $x = convertToTensor(x, 'x', 'reverse');
	  assert($x.rank === 4, function () {
	    return "Error in reverse4D: x must be rank 4 but got rank " + $x.rank + ".";
	  });
	  return reverse($x, axis);
	}