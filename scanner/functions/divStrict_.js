function divStrict_(a, b) {
	  deprecationWarn('strict variants of ops have been deprecated ' + 'and will be removed in future');
	  var $a = convertToTensor(a, 'a', 'div');
	  var $b = convertToTensor(b, 'b', 'div');
	  assertShapesMatch($a.shape, $b.shape, 'Error in divideStrict: ');
	  return div($a, $b);
	}