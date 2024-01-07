function maximumStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'maximumStrict');
	  var $b = convertToTensor(b, 'b', 'maximumStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in maximumStrict: ');
	  return maximum($a, $b);
	}