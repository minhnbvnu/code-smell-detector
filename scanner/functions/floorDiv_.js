function floorDiv_(a, b) {
	  var $a = convertToTensor(a, 'a', 'floorDiv');
	  var $b = convertToTensor(b, 'b', 'floorDiv');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(FloorDiv, inputs);
	}