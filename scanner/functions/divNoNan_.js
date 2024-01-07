function divNoNan_(a, b) {
	  // TODO: Make this into its own kernel.
	  var $a = convertToTensor(a, 'a', 'div');
	  var $b = convertToTensor(b, 'b', 'div');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  var divResult = div($a, $b);
	  var zeros = zerosLike(divResult);
	  var bEqualsZero = equal($b, zeros);
	  return where(bEqualsZero, zeros, divResult);
	}