function add_(a, b) {
	  var $a = convertToTensor(a, 'a', 'add');
	  var $b = convertToTensor(b, 'b', 'add');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(Add, inputs);
	}