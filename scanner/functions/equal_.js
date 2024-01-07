function equal_(a, b) {
	  var $a = convertToTensor(a, 'a', 'equal');
	  var $b = convertToTensor(b, 'b', 'equal');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  assertAndGetBroadcastShape($a.shape, $b.shape);
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  return ENGINE.runKernel(Equal, inputs);
	}