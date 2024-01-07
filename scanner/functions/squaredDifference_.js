function squaredDifference_(a, b) {
	  var $a = convertToTensor(a, 'a', 'squaredDifference');
	  var $b = convertToTensor(b, 'b', 'squaredDifference');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  assertAndGetBroadcastShape($a.shape, $b.shape);
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  var attrs = {};
	  return ENGINE.runKernel(SquaredDifference, inputs, attrs);
	}