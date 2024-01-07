function mulStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'mul');
	  var $b = convertToTensor(b, 'b', 'mul');
	  assertShapesMatch($a.shape, $b.shape, 'Error in multiplyStrict: ');
	  return mul($a, $b);
	}