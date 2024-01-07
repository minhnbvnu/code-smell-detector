function modStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'modStrict');
	  var $b = convertToTensor(b, 'b', 'modStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in modStrict: ');
	  return mod($a, $b);
	}