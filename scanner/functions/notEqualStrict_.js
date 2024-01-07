function notEqualStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'notEqualStrict');
	  var $b = convertToTensor(b, 'b', 'notEqualStrict');
	  assertShapesMatch($a.shape, $b.shape, 'Error in notEqualStrict: ');
	  return notEqual($a, $b);
	}