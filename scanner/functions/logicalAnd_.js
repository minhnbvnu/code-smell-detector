function logicalAnd_(a, b) {
	  var $a = convertToTensor(a, 'a', 'logicalAnd', 'bool');
	  var $b = convertToTensor(b, 'b', 'logicalAnd', 'bool');
	  assertAndGetBroadcastShape($a.shape, $b.shape);
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(LogicalAnd, inputs);
	}