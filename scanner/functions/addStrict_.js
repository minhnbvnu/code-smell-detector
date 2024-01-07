function addStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'addStrict');
	  var $b = convertToTensor(b, 'b', 'addStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in addStrict: ');
	  return add$1($a, $b);
	}