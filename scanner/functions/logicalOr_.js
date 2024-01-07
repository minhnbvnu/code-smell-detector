function logicalOr_(a, b) {
	  var $a = convertToTensor(a, 'a', 'logicalOr', 'bool');
	  var $b = convertToTensor(b, 'b', 'logicalOr', 'bool');
	  assertAndGetBroadcastShape($a.shape, $b.shape);
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(LogicalOr, inputs);
	}