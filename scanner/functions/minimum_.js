function minimum_(a, b) {
	  var $a = convertToTensor(a, 'a', 'minimum');
	  var $b = convertToTensor(b, 'b', 'minimum');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];

	  if ($a.dtype === 'bool') {
	    $a = cast($a, 'int32');
	    $b = cast($b, 'int32');
	  }

	  assertAndGetBroadcastShape($a.shape, $b.shape);
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(Minimum, inputs);
	}