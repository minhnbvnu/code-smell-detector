function reverse1d_(x) {
	  var $x = convertToTensor(x, 'x', 'reverse');
	  assert($x.rank === 1, function () {
	    return "Error in reverse1D: x must be rank 1 but got rank " + $x.rank + ".";
	  });
	  return reverse($x, 0);
	}