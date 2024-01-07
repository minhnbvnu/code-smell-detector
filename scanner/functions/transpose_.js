function transpose_(x, perm) {
	  var $x = convertToTensor(x, 'x', 'transpose');

	  if (perm == null) {
	    perm = $x.shape.map(function (s, i) {
	      return i;
	    }).reverse();
	  }

	  assert($x.rank === perm.length, function () {
	    return "Error in transpose: rank of input " + $x.rank + " " + ("must match length of perm " + perm + ".");
	  });
	  perm.forEach(function (axis) {
	    assert(axis >= 0 && axis < $x.rank, function () {
	      return "All entries in 'perm' must be between 0 and " + ($x.rank - 1) + (" but got " + perm);
	    });
	  });

	  if ($x.rank <= 1) {
	    return $x.clone();
	  }

	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    perm: perm
	  };
	  return ENGINE.runKernel(Transpose, inputs, attrs);
	}