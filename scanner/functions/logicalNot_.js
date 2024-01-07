function logicalNot_(x) {
	  var $x = convertToTensor(x, 'x', 'logicalNot', 'bool');
	  var inputs = {
	    x: $x
	  };
	  return ENGINE.runKernel(LogicalNot, inputs);
	}