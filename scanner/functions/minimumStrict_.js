function minimumStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'minimumStrict');
	  var $b = convertToTensor(b, 'b', 'minimumStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in minimumStrict: ');
	  return minimum($a, $b);
	}