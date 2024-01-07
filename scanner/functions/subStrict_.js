function subStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'subStrict');
	  var $b = convertToTensor(b, 'b', 'subStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in subStrict: ');
	  return sub($a, $b);
	}