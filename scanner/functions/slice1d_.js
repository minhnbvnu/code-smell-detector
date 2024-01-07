function slice1d_(x, begin, size) {
	  var $x = convertToTensor(x, 'x', 'slice1d');
	  assert($x.rank === 1, function () {
	    return "slice1d expects a rank-1 tensor, but got a rank-" + $x.rank + " tensor";
	  });
	  return slice$2($x, [begin], [size]);
	}