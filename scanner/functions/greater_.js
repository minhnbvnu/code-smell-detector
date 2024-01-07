function greater_(a, b) {
	  var $a = convertToTensor(a, 'a', 'greater');
	  var $b = convertToTensor(b, 'b', 'greater');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  assertAndGetBroadcastShape($a.shape, $b.shape);
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(Greater, inputs);
	}