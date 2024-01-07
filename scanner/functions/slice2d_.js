function slice2d_(x, begin, size) {
	  var $x = convertToTensor(x, 'x', 'slice2d');
	  assert($x.rank === 2, function () {
	    return "slice2d expects a rank-2 tensor, but got a rank-" + $x.rank + " tensor";
	  });
	  return slice$2($x, begin, size);
	}