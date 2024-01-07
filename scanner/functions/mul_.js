function mul_(a, b) {
	  var $a = convertToTensor(a, 'a', 'mul');
	  var $b = convertToTensor(b, 'b', 'mul');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(Multiply, inputs);
	}