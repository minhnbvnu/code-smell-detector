function mod_(a, b) {
	  var $a = convertToTensor(a, 'a', 'mod');
	  var $b = convertToTensor(b, 'b', 'mod');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(Mod, inputs);
	}