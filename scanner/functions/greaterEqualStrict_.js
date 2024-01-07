function greaterEqualStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'greaterEqualStrict');
	  var $b = convertToTensor(b, 'b', 'greaterEqualStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in greaterEqualStrict: ');
	  return greaterEqual($a, $b);
	}