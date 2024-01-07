function slice4d_(x, begin, size) {
	  var $x = convertToTensor(x, 'x', 'slice4d');
	  assert($x.rank === 4, function () {
	    return "slice4d expects a rank-4 tensor, but got a rank-" + $x.rank + " tensor";
	  });
	  return slice$2($x, begin, size);
	}