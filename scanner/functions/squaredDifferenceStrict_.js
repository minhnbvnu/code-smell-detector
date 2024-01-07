function squaredDifferenceStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'squaredDifferenceStrict');
	  var $b = convertToTensor(b, 'b', 'squaredDifferenceStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in squaredDifferenceStrict: ');
	  return squaredDifference($a, $b);
	}