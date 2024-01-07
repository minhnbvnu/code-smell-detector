function equalStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'equalStrict');
	  var $b = convertToTensor(b, 'b', 'equalStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in equalStrict: ');
	  return equal($a, $b);
	}