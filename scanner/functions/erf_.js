function erf_(x) {
	  var $x = convertToTensor(x, 'x', 'erf');
	  assert($x.dtype === 'int32' || $x.dtype === 'float32', function () {
	    return 'Input dtype must be `int32` or `float32`.';
	  });

	  if ($x.dtype === 'int32') {
	    $x = cast($x, 'float32');
	  }

	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(Erf, inputs);
	}