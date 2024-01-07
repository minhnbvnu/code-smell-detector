function outerProduct_(v1, v2) {
	  var $v1 = convertToTensor(v1, 'v1', 'outerProduct');
	  var $v2 = convertToTensor(v2, 'v2', 'outerProduct');
	  assert($v1.rank === 1 && $v2.rank === 1, function () {
	    return "Error in outerProduct: inputs must be rank 1, but got ranks " + ($v1.rank + " and " + $v2.rank + ".");
	  });
	  var v12D = reshape($v1, [-1, 1]);
	  var v22D = reshape($v2, [1, -1]);
	  return matMul(v12D, v22D);
	}