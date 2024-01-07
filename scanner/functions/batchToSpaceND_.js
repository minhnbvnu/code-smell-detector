function batchToSpaceND_(x, blockShape, crops) {
	  var $x = convertToTensor(x, 'x', 'batchToSpaceND');
	  var prod = blockShape.reduce(function (a, b) {
	    return a * b;
	  });
	  assert($x.rank >= 1 + blockShape.length, function () {
	    return "input rank is " + $x.rank + " but should be > than blockShape.length " + blockShape.length;
	  });
	  assert(crops.length === blockShape.length, function () {
	    return "crops.length is " + crops.length + " but should be equal to blockShape.length  " + blockShape.length;
	  });
	  assert($x.shape[0] % prod === 0, function () {
	    return "input tensor batch is " + $x.shape[0] + " but is not divisible by the product of " + ("the elements of blockShape " + blockShape.join(' * ') + " === " + prod);
	  });
	  var inputs = {
	    x: $x
	  };
	  var attrs = {
	    blockShape: blockShape,
	    crops: crops
	  };
	  return ENGINE.runKernel(BatchToSpaceND, inputs, attrs);
	}