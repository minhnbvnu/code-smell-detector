function matMul_(a, b, transposeA, transposeB) {
	  if (transposeA === void 0) {
	    transposeA = false;
	  }

	  if (transposeB === void 0) {
	    transposeB = false;
	  }

	  var $a = convertToTensor(a, 'a', 'matMul');
	  var $b = convertToTensor(b, 'b', 'matMul');

	  var _makeTypesMatch = makeTypesMatch($a, $b);

	  $a = _makeTypesMatch[0];
	  $b = _makeTypesMatch[1];
	  var inputs = {
	    a: $a,
	    b: $b
	  };
	  var attrs = {
	    transposeA: transposeA,
	    transposeB: transposeB
	  };
	  return ENGINE.runKernel(BatchMatMul, inputs, attrs);
	}