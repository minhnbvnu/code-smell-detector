function logicalXor_(a, b) {
	  var $a = convertToTensor(a, 'a', 'logicalXor', 'bool');
	  var $b = convertToTensor(b, 'b', 'logicalXor', 'bool');
	  assertAndGetBroadcastShape($a.shape, $b.shape); // x ^ y = (x | y) & ~(x & y)

	  return logicalAnd(logicalOr(a, b), logicalNot(logicalAnd(a, b)));
	}