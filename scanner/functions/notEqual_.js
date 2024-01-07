function notEqual_(a, b) {
	  var $a = convertToTensor(a, 'a', 'notEqual');
	  var $b = convertToTensor(b, 'b', 'notEqual');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  assertAndGetBroadcastShape($a.shape, $b.shape);
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(NotEqual, inputs);
	}