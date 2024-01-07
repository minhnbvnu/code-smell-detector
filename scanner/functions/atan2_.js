function atan2_(a, b) {
	  var $a = convertToTensor(a, 'a', 'atan2');
	  var $b = convertToTensor(b, 'b', 'atan2');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(Atan2, inputs);
	}