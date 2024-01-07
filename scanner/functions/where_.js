function where_(condition, a, b) {
	  var $a = convertToTensor(a, 'a', 'where');
	  var $b = convertToTensor(b, 'b', 'where');
	  var $condition = convertToTensor(condition, 'condition', 'where', 'bool'); // TODO: move this logic to forward function when the broadcastTo op is
	  // implemented in WASM.
	  // Find the broadcastable shape for $a and $b.

	  var broadcastShape = assertAndGetBroadcastShape($a.shape, $b.shape);
	  var $broadcastedA = broadcastTo($a, broadcastShape);
	  var $broadcastedB = broadcastTo($b, broadcastShape);

	  if ($condition.rank === 1) {
	    // If condition rank is 1, then the first dimension must match the size of
	    // condition.
	    assert($condition.shape[0] === $a.shape[0], function () {
	      return 'The first dimension of `a` must match the size of `condition`.';
	    });
	  }

	  if ($condition.rank !== 1) {
	    // A must have the same shape as condition.
	    assertShapesMatch($condition.shape, $broadcastedB.shape, 'Error in where: ');
	  }

	  var inputs = {
	    condition: $condition,
	    t: $broadcastedA,
	    e: $broadcastedB
	  };
	  return ENGINE.runKernel(Select, inputs);
	}