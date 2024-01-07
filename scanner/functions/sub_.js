function sub_(a, b) {
	  var $a = convertToTensor(a, 'a', 'sub');
	  var $b = convertToTensor(b, 'b', 'sub');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(Sub, inputs);
	}