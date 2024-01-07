function pow_(base, exp) {
	  var $base = convertToTensor(base, 'base', 'pow');
	  var $exp = convertToTensor(exp, 'exp', 'pow');

	  var _makeTypesMatch = makeTypesMatch($base, $exp);

	  $base = _makeTypesMatch[0];
	  $exp = _makeTypesMatch[1];
	  var inputs = {
	    a: $base,
	    b: $exp
	  };
	  return ENGINE.runKernel(Pow, inputs);
	}