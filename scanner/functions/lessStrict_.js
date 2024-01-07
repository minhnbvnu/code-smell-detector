function lessStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'lessStrict');
	  var $b = convertToTensor(b, 'b', 'lessStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in lessStrict: ');
	  return less($a, $b);
	}