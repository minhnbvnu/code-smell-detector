function greaterStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'greaterStrict');
	  var $b = convertToTensor(b, 'b', 'greaterStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in greaterStrict: ');
	  return greater($a, $b);
	}