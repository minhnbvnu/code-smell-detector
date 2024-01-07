function slice3d_(x, begin, size) {
	  var $x = convertToTensor(x, 'x', 'slice3d');
	  assert($x.rank === 3, function () {
	    return "slice3d expects a rank-3 tensor, but got a rank-" + $x.rank + " tensor";
	  });
	  return slice$2($x, begin, size);
	}