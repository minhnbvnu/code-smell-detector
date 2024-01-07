function div_(a, b) {
	  var $a = convertToTensor(a, 'a', 'div');
	  var $b = convertToTensor(b, 'b', 'div');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];

	  if ($a.dtype === 'int32' && $b.dtype === 'int32') {
	    return floorDiv($a, $b);
	  }

	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  var attrs = {}; // tslint:disable-next-line: no-unnecessary-type-assertion

	  return ENGINE.runKernel(RealDiv, inputs, attrs);
	}