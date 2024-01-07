function lessEqualStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'lessEqualStrict');
	  var $b = convertToTensor(b, 'b', 'lessEqualStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in lessEqualStrict: ');
	  return lessEqual($a, $b);
	}